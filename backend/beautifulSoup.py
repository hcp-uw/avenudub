import requests
from bs4 import BeautifulSoup

url = "https://police.uw.edu/60-day-log/attachment/01172025/"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    with open("output.pdf", "wb") as file: 
        file.write(response.content)
    print("PDF downloaded successfully!")
else:
    print(f"Failed to download PDF. HTTP Status Code: {response.status_code}")

soup = BeautifulSoup(response.text, 'html.parser')
pdf_link = soup.find('a', href=True, span='Download PDF')
print(pdf_link)
