import requests
from bs4 import BeautifulSoup
import pdfplumber

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
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            for i in range(3, len(table)):
                raw_data.append(table[i]) 


        
