import requests
from bs4 import BeautifulSoup
import pdfplumber
from datetime import datetime
from PIL import Image, ImageOps, ImageEnhance
import pytesseract
import cv2
import numpy as np
import re
import mysqlcommands as sql

# number of days to keep a crime log event in the log until deleting it
daysToLog = 60

def scrapePDF():
    url = "https://police.uw.edu/60-day-log/attachment/04162025/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        pdf_links = soup.find_all('a', href=True)  # Find all anchor tags with hrefs
        pdf_link = ""
        for link in pdf_links:
            href = link.get('href')
            if "https://police.uw.edu/wp-content/uploads/" in href and href.endswith(".pdf"):
                pdf_link = href
                print(f"Found PDF link: {pdf_link}")
                break

        if pdf_link:
            pdf_response = requests.get(pdf_link, headers=headers)
            if pdf_response.status_code == 200:
                with open("latest_log.pdf", "wb") as file:
                    file.write(pdf_response.content)
                print("PDF downloaded successfully!")
            else:
                print(f"Failed to download the PDF. HTTP Status Code: {pdf_response.status_code}")
        else:
            print("No PDF link found on the page.")
    else:
        print(f"Failed to load the main page. HTTP Status Code: {response.status_code}")

    raw_data = []
    page_num = 1
    with pdfplumber.open("latest_log.pdf") as pdf:
        #Goes through each page in the PDF and extracts the tables
        for page in pdf.pages:
            # print('page number ' + str(page_num))
            page_num+=1
            tables = page.extract_tables()
            if not tables:
                pageOCR(page) 
            else:
                for table in tables:
                    for i in range(3, len(table)):
                        #Switches index of the date, sometimes it can appear in the 0th spot, other times in the first spot
                        dateIndex = 0
                        if table[i][0]==None:
                            dateIndex = 1
                        if table[i] and table[i][dateIndex] is not None: 
                            month_part = table[i][dateIndex].strip()[:2]
                            #Appends crimes that happened this month
                            if month_part.isdigit() and int(datetime.now().strftime("%m")) == int(month_part):
                                raw_data.append(table[i])
                            #Appends crimes that happened last month but within the month range
                            elif month_part.isdigit():
                                day_part = table[i][dateIndex][3:5]
                                if day_part.isdigit():
                                    day = int(day_part)
                                    current_month = int(datetime.now().strftime("%m"))
                                    current_day = int(datetime.now().strftime("%d"))
                                    last_month = (current_month - 1) % 12 or 12
                                    if last_month == int(month_part):
                                        if current_day <= day:
                                            raw_data.append(table[i])
                                    else:
                                        break
    return raw_data

def pageOCR(page):
    # does this work rn? i have no way to test because current crime log has no pages
    print('this page is an image')
    image = page.to_image(resolution=720).original

    # Convert to OpenCV format
    open_cv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    # Convert to grayscale
    gray_image = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)

    # Apply adaptive thresholding
    adaptive_thresh = cv2.adaptiveThreshold(gray_image, 255, 
                                            cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
                                            cv2.THRESH_BINARY, 11, 2)

    # Sharpen the image
    kernel = np.array([[0, -1, 0], [-1, 5,-1], [0, -1, 0]])
    sharpened_image = cv2.filter2D(adaptive_thresh, -1, kernel)

    # Denoising (optional)
    denoised_image = cv2.fastNlMeansDenoising(sharpened_image, None, 30, 7, 21)

    # Convert back to PIL format
    processed_image = Image.fromarray(denoised_image)

    # Correct orientation
    osd = pytesseract.image_to_osd(processed_image)
    # print("OSD Output:", osd)  # Debugging line to check OSD output

    # Enhance contrast
    enhancer = ImageEnhance.Contrast(processed_image)
    processed_image = enhancer.enhance(1.5)  # Increase contrast

    # Convert to grayscale and apply adaptive thresholding
    gray_image = processed_image.convert("L")
    adaptive_thresh = cv2.adaptiveThreshold(np.array(gray_image), 255, 
                                            cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
                                            cv2.THRESH_BINARY, 11, 2)

    # Convert back to PIL format
    processed_image = Image.fromarray(adaptive_thresh)

    # OCR processing with specified language and enhanced settings
    custom_config = r'--oem 3 --psm 6 -l eng'  # Specify English language

    # Define your desired dimensions for the bounding boxes
    desired_width = 100  # Example width
    min_height = 20      # Minimum height for the boxes
    max_height = 180      # Maximum height for the boxes

    # Use image_to_data to get detailed information about detected text
    data = pytesseract.image_to_data(processed_image, config=custom_config, output_type=pytesseract.Output.DICT)

    # Extract text box by box based on dimensions
    for i in range(len(data['text'])):
        if int(data['conf'][i]) > 40:  # Confidence threshold
            (x, y, w, h) = (data['left'][i], data['top'][i], data['width'][i], data['height'][i])
            text = data['text'][i]

            # Check if the detected bounding box matches the desired dimensions
            if w >= desired_width and min_height <= h <= max_height:
                # print(f"Detected text: '{text}' at position: ({x}, {y}, {w}, {h})")
                pass

# formats date obtained from crime log into datetime MySql format
def formatDate(date):
    if(len(date) <= 10):
        return(datetime.strftime(datetime.strptime(date,"%m/%d/%Y"),"%Y-%m-%d %H:%M:%S"))
    return(datetime.strftime(datetime.strptime(date,"%m/%d/%Y\n%H:%M:%S"),"%Y-%m-%d %H:%M:%S"))

# Deletes all crime log older than the specified # of days
def trimLog(days = 60):
    sql.entryDelete("crime_log", ("created_at < date_sub(now(), interval " + str(days) + " day)"))

# parses crime data from PDF and inserts into crime_log
def updateLog(data):
    for i in data:
        if(i == None):
            return
        if(i[0] == None):
            i.pop(0)
        crimeData = []

        crimeData.append(formatDate(i[0]))
        crimeData.append((i[1][:i[1].index("\n")] + i[1][i[1].index("\n")+1:]))
        crimeData.append(i[2])
        crimeData.append((i[3][:i[3].index("\n")]+ " " + i[3][i[3].index("\n")+1:]))
        crimeData.append(formatDate(i[5]))
        crimeData.append(formatDate(i[6]))

        sql.tblInsert("crime_log", crimeData)
    trimLog(daysToLog)
    



sql.connect("avenudub", input("Admin Password: "))
updateLog(data=scrapePDF())
            
