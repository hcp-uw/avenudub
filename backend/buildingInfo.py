from google_apis import create_service

client_secret_file = 'client-secret.json'
API_NAME = 'places'
API_VERSION = 'v1'
SCOPES = ['https://www.googleapis.com/auth/cloud-platform']

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

