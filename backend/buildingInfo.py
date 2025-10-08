from google_apis import create_service

client_secret_file = 'client-secret.json'
API_NAME = 'places'
API_VERSION = 'v1'
SCOPES = ['https://www.googleapis.com/auth/cloud-platform']

service = create_service(client_secret_file, API_NAME, API_VERSION, SCOPES)

query = 'ramen'

request_body = {
    'textQuery':query,
    'regionCode': 'US',
    'locationRestriction':{
        'rectangle':{
            'high':{
                'latitude': 47.67161,
                'longitude': -122.30787
            },
            'low':{
                'latitude': 47.64916,
                'longitude': -122.34662
            }
        }
    },
    'priceLevels': ['PRICE_LEVEL_MODERATE']
}

response = service.places().searchText(
    body=request_body,
    fields='*'
).execute()

# formats all of the building info we want to obtain into our database
# our key desires:
# - name
# - ID
# - displayName
# - types
# - nationalPhoneNumber
# - formatted address
# - location
# - rating
# - reviewSummary
# - googleMapsLinks
# - regularOpeningHours

# building hours will be a 7 element array -> mon tues wed thur fri sat sun

def format_building_data(api_response):
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
        if 'reviews' in place and place['reviews']:
            building_data['review_summary'] = place['reviews'][0].get('text', '')
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
formatted_data = format_building_data(response)
print("Formatted building data:")
for building in formatted_data:
    print(f"Name: {building['name']}")
    print(f"Address: {building['address']}")
    print(f"Phone: {building['phone']}")
    print(f"Rating: {building['rating']}")
    print(f"Types: {building['types']}")
    print(f"Opening Hours: {building['opening_hours']}")
    print("-" * 50)

