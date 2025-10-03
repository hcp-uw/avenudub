from google_apis import create_service
import json

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
                # large ver (U Village + Wallingford): (47.648632, -122.332) (!!! TOO LARGE)
                # small ver (Just U-Dist + Campus): (47.6699, -122.301)
                'latitude': 47.6699,
                'longitude': -122.301
            },
            'low':{ #southwest corner
                # large ver (U Village + Wallingford): (47.655, -122.296)
                # small ver (Just U-Dist + Campus): (47.64912, -122.321748)
                'latitude': 47.64912,
                'longitude': -122.321748
            }
        }
    },
    'priceLevels': ['PRICE_LEVEL_MODERATE']
}

response = service.places().searchText(
    body=request_body,
    fields='*'
).execute()
# returns a dict w/ keys "places" (a list of dicts), "contextualContents", "nextPageToken", "searchUri"

"""
name -> NOT a readable/human name
id
    types -> list of strings with underscores instead of spaces :skull:
    nationalPhoneNumber -> string, potential NoneType if no number given
internationalPhoneNumber
    formattedAddress -> string, formatted consistently as #### Street, City, State ZIP
addressComponents
plusCode
    location -> dict, {'latitude':___, 'longitude':___}
viewport
rating
    googleMapsUri -> string, just a link to the location
    websiteUri -> string or NoneType, link to website
    regularOpeningHours -> dict, {'openNow': T/F, 'periods':, 'weekdayDescriptions':, 'nextCloseTime':} OR 'nextOpenTime' depending on whether open or closed
utcOffsetMinutes
adrFormatAddress
businessStatus
priceLevel
userRatingCount
iconMaskBaseUri
iconBackgroundColor
    displayName -> dict, the readable name, the one we want!! {'text': (name), 'languageCode': (language)}
    primaryTypeDisplayName -> dict, the readable PRIMARY type {'text': (type), 'languageCode': (language)}
takeout
dineIn
curbsidePickup
reservable
servesLunch
servesDinner
servesBeer
servesWine
    currentOpeningHours -> dict, {'openNow': T/F, 'periods':, 'weekdayDescriptions':, 'nextCloseTime':} OR 'nextOpenTime' depending on whether open or closed
primaryType 
shortFormattedAddress
reviews
photos
outdoorSeating
liveMusic
menuForChildren
servesCocktails
servesCoffee
goodForChildren
restroom
goodForWatchingSports
paymentOptions
parkingOptions
accessibilityOptions
    generativeSummary -> dict: {'overview':{'text': (generated summary), 'languageCode: __}, 'overviewFlagContentUri': (uri to flag), 'disclosureText':{'text': 'Summarized with Gemini', 'languageCode': 'en-US'}}
containingPlaces
addressDescriptor
googleMapsLinks
priceRange
    reviewSummary -> dict: {'text: {'text':___, 'languageCode':____}, 'flagContentUri': (Uri to flag a review), 'disclosureText': {'text': 'Summarized with Gemini', 'languageCode': 'en-US'}, 'reviewsUri': (Uri to google maps reviews tab for this location)}
timeZone
postalAddress
"""

# building hours will be a 7 element array -> mon tues wed thur fri sat sun
testVar = response.get("places")
for i in testVar:
    print((i.get("liveMusic")))

testVar2 = testVar[0]
# for i in testVar2.get("reviewSummary"):
# print(testVar2.get("primaryTypeDisplayName"))
