import requests
from bs4 import BeautifulSoup
import pdfplumber
from datetime import datetime
from PIL import Image
import pytesseract

url = "https://police.uw.edu/60-day-log/attachment/01172025/"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
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
with pdfplumber.open("latest_log.pdf") as pdf:
    #Goes through each page in the PDF and extracts the tables
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            for i in range(3, len(table)):
                #Printing for debugging
                print(table[i])
                #Switches index of the date, sometimes it can appear in the 0th spot, other times in the first spot
                dateIndex = 0
                if table[i][0]==None:
                    dateIndex = 1
                if table[i] and table[i][dateIndex]!=None: 
                    month_part = table[i][dateIndex].strip()[:2]
                    #Appends crimes that happened this month
                    if month_part.isdigit() and int(datetime.now().strftime("%m")) == int(month_part):
                        print('month matches')
                        raw_data.append(table[i])
                    #Appends crimes that happened last month but within the month range
                    elif month_part.isdigit():
                        day_part = table[i][dateIndex][3:5]
                        if day_part.isdigit():
                            day = int(day_part)
                            if int(datetime.now().strftime("%d")) <= day and int(datetime.now().strftime("%m"))>=int(month_part):
                                print('less than a month ago')
                                raw_data.append(table[i])
                            else:
                                break




        
