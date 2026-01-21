from google_apis import create_service

client_secret_file = 'client-secret.json'
API_NAME = 'places'
API_VERSION = 'v1'
SCOPES = ['https://www.googleapis.com/auth/cloud-platform']

locHigh = (47.6699, -122.301) #(Just U-Dist + Campus)
locLow = (47.64912, -122.321748) #(Just U-Dist + Campus)
service = create_service(client_secret_file, API_NAME, API_VERSION, SCOPES)

#example query
# query = 'ramen'
query = 'food'


# MODIFY TO ADJUST SEARCH PARAMETERS
request_body = {
    'textQuery':query,
    'regionCode': 'US',
    'locationRestriction':{
        'rectangle':{
            'high':{
                'latitude': locHigh[0],
                'longitude': locHigh[1]
            },
            'low':{
                'latitude': locLow[0],
                'longitude': locLow[1]
            }
        }
    }
}

response = service.places().searchText(
    body=request_body,
    fields='*'
).execute()
# returns a dict w/ keys "places" (a list of dicts), "contextualContents", "nextPageToken", "searchUri"

# formats all of the building info we want to obtain into our database
# our key desires:
# - displayName
# - primaryTypeDisplayName
# - types
# - nationalPhoneNumber
# - formattedAddress
# - rating
# - googleMapsUri
# - regularOpeningHours
# - priceLevel (not sure the differences)
# - priceRange (not sure the differences)
# - photos?
# - generativeSummary



# formats building data into the following:
    # name - string
    # place_id - string (unique ID, not useful for users)
    # types - list of strings (not formatted, underscores instead of whitespace)
    # phone - string (formatted phone number)
    # address - string (formatted address)
    # rating - float w/ 1 decimal place
    # google_maps_link - string (url)
    # latitude - float
    # longitude - float
    # review_summary - string
    # opening_hours - list of strings '(day): (open) - (close)'
def format_building_data(api_response = response):
    formatted_buildings = []
    
    if 'places' not in api_response:
        return formatted_buildings
    
    for place in api_response['places']:
        # Extract basic info
        building_data = {
            'name': place.get('displayName', {}).get('text', ''),
            'place_id': place.get('id', ''),
            'types': place.get('types', []),
            'phone': place.get('nationalPhoneNumber', ''),
            'address': place.get('formattedAddress', ''),
            'rating': place.get('rating', 0),
            'google_maps_link': place.get('googleMapsUri', ''),
        }
        
        # Extract location coordinates
        if 'location' in place:
            building_data['latitude'] = place['location'].get('latitude', 0)
            building_data['longitude'] = place['location'].get('longitude', 0)
        else:
            building_data['latitude'] = 0
            building_data['longitude'] = 0
        
        # Extract review summary
        # if 'reviews' in place and place['reviews']:
        #     building_data['review_summary'] = place['reviews'][0].get('text', '')
        # else:
        #     building_data['review_summary'] = ''
# note: above obtains the first review available

# note: below obtains AI generated review summary provided by Google
        # Extract review summary
        if 'generativeSummary' in place and place['generativeSummary']:
            building_data['review_summary'] = place['generativeSummary'].get('overview').get('text')
        else:
            building_data['review_summary'] = ''
        
        # Extract opening hours - format as 7 element array (Mon-Sun)
        if 'regularOpeningHours' in place:
            weekday_descriptions = place['regularOpeningHours'].get('weekdayDescriptions', [])
            # Create a 7-element array for Mon-Sun
            hours_array = [''] * 7  # Initialize with empty strings
            days_of_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            
            for description in weekday_descriptions:
                for i, day in enumerate(days_of_week):
                    if day in description:
                        hours_array[i] = description
                        break
            
            building_data['opening_hours'] = hours_array
        else:
            building_data['opening_hours'] = [''] * 7  # Empty array for all 7 days
        
        formatted_buildings.append(building_data)
    
    return formatted_buildings

# Test the formatting function
# formatted_data = format_building_data(response)
# print("Formatted building data:")
# for building in formatted_data:
#     print(f"place_id: {building['place_id']}")
#     print(f"Name: {building['name']}")
#     print(f"Address: {building['address']}")
#     print(f"Phone: {building['phone']}")
#     print(f"Rating: {building['rating']}")
#     print(f"Types: {building['types']}")
#     print(f"Opening Hours: {building['opening_hours']}")
#     print(f"Map URL: {building['google_maps_link']}")
#     print(f"Review Summary: {building['review_summary']}")
#     print("-" * 50)

