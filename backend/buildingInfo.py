from google_apis import create_service

client_secret_file = 'client-secret.json'
API_NAME = 'places'
API_VERSION = 'v1'
SCOPES = ['https://www.googleapis.com/auth/cloud-platform']

service = create_service(client_secret_file, API_NAME, API_VERSION, SCOPES)

query = 'ramen'

# the client-secret.json needs to go in the main (avenuDub) directory, NOT the backend directory

request_body = {
    'textQuery':query,
    'regionCode': 'US',
    'locationRestriction':{
        'rectangle':{
            'high':{ #northeast corner
                'latitude': 47.67161,
                'longitude': -122.30787
            },
            'low':{ #southwest corner
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
# - name!!
# - ID
# - displayName
# - types !!
# - nationalPhoneNumber !!
# - formatted address !!
# - location
# - rating
# - reviewSummary !!
# - googleMapsLinks
# - regularOpeningHours !!

# building hours will be a 7 element array -> mon tues wed thur fri sat sun

# print (response)