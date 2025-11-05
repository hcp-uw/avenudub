from flask import Flask
from flask import request
import accountManager
import passmanage
import mysqlcommands as sql
from datetime import datetime
import rating_api
import account_api

#https://code.visualstudio.com/docs/python/tutorial-flask
#https://flask.palletsprojects.com/en/stable/quickstart/

app = Flask(__name__)

# @app.route("/")
# def home():
#     return "Hello, Flask!"
    
# LOGIN: (nearly identical to the one in accountManager.py -> accountManager.py and passmanage.py should get refactored into one file once frontend and backend are connected)
# verifies that a provided login/user exists
# params: username/email, password
# returns: {'success' : boolean, 'userID' : int} (userID is None if login failed)
@app.route("/home_screens", methods=['GET'])
def logIn(user, passwd):
    if user and passwd:    
        return Flask.jsonify(passmanage.passcheck(user, passwd))
    return Flask.jsonify({'success':False, 'userID':None})

# SETTINGS:
# retrieves the user's info and favorites
# params: userID
# returns: {'success' : boolean, 'resp': {user': string, 'email':string, 'favorites':tuple of dictionaries}} ( resp is None if failure occurred)
@app.route("/home_screens/settings/<userID>", methods=['GET'])
def settings(userID):
    userdata = sql.tblGet('gen_user', columns=['username', 'email'], values={'user_id':userID})
    userfavs = sql.tblGet('user_favorites', values={'user_id':userID}) #returns a tuple of dictionaries {user_id, place_id}
    if userdata.get('success') and userdata.get('success'):
        userdata = userdata.get('resp')
        userfavs = userfavs.get('resp')
        return Flask.jsonify({'success' : True, 'resp' : {'user':userdata.get('username'), 'email':userdata.get("email"), 'favorites': userfavs}})
    return Flask.jsonify({'success' : True, 'resp' : None})

# ADD REPORTS: 
# adds an incident to the database of crime
# params: location, crime type,
# returns: {'success' : boolean} depending on query success 
@app.route("/home_screens/report/<location>/<type>/<description>", methods=['POST'])
def addReport(location, type): 
    return Flask.jsonify({'success':sql.tblInsert("crime_log", values={'created_at': datetime.strftime(datetime.now, '%Y-%m-%d %H:%M:%S'), 'crime_type':type, 'address':location}).get('success')})

# SAFETY INFO: (UNFINISHED) #################################################################################################
# retrieves all criminal incidents within a specified timeframe
# params: time range in days before current day
# returns: {'success' : bool, 'resp' : 2D list} - each element contains: [created_at, case_num, crime_type, address, case_open, case_close]
@app.route("/reports_screens/safetyhome/<range>", methods=['GET'])
def getSafety(range):
    # not super sure if this notation works with my implementation :D
    return Flask.jsonify(sql.tblGet("crime_log", values={'created_at <= date_sub(now(), interval ' + str(range) + ' day)':''}))

# ADD FAVORITE:
# adds a specified location the user's favorites catalogue
# params: userID, the business to favorite
# returns: {'success' : boolean} depending on query success 
@app.route("/business_screens/businessinfo/<userID>/<businessID>", methods=['POST'])
def addFavorite(user, businessID):
    return Flask.jsonify({'success':sql.tblInsert("user_favorites", values={'user_id':user, 'place_id':businessID}).get('success')})

# REMOVE FAVORITE:
# deletes a specified location the user's favorites catalogue
# params: userID, the business to favorite
# returns: {'success' : boolean} depending on query success 
@app.route("/business_screens/businessinfo/<userID>/<businessID>/", methods=['POST'])
def removeFavorite(user, businessID):
    return Flask.jsonify({'success':sql.entryDelete("user_favorites", values={'user_id':user, 'place_id':businessID}).get('success')})
 
# GET BUILDINGS: (UNFINISHED) #################################################################################################
# retrives all buildings that meet a certain criteria
# params: filter??
# returns: list of buildings
@app.route("/business_screens/businesshome/<filter>", methods=['GET'])
def getBuildings(filter):
    # honestly, it might be easier to just do the google api call instead of using the database
    # reviews WILL be obtained via database tho
    return
# TODO: THIS LMFAO

# AUTH API ROUTES ###########################################################################################################

# User registration/signup
@app.route("/api/auth/register", methods=['POST'])
def register():
    user_data = request.get_json(silent=True) or {}
    body, status = account_api.register_user_route(user_data)
    return Flask.jsonify(body), status

# Request password reset (forgot password)
@app.route("/api/auth/forgot-password", methods=['POST'])
def forgot_password():
    request_data = request.get_json(silent=True) or {}
    body, status = account_api.forgot_password_route(request_data)
    return Flask.jsonify(body), status

# Verify reset token
@app.route("/api/auth/verify-reset-token", methods=['POST'])
def verify_reset_token():
    request_data = request.get_json(silent=True) or {}
    body, status = account_api.verify_reset_token_route(request_data)
    return Flask.jsonify(body), status

# Reset password with token
@app.route("/api/auth/reset-password", methods=['POST'])
def reset_password():
    request_data = request.get_json(silent=True) or {}
    body, status = account_api.reset_password_route(request_data)
    return Flask.jsonify(body), status

# Get user profile
@app.route("/api/auth/profile/<user_id>", methods=['GET'])
def get_profile(user_id):
    body, status = account_api.get_user_profile_route(user_id)
    return Flask.jsonify(body), status

# Update user profile
@app.route("/api/auth/profile/<user_id>", methods=['PUT'])
def update_profile(user_id):
    update_data = request.get_json(silent=True) or {}
    body, status = account_api.update_user_profile_route(user_id, update_data)
    return Flask.jsonify(body), status

# RATINGS API ROUTES ##########################################################################################################

# Create a new rating
@app.route("/api/ratings", methods=['POST'])
def create_rating():
    rating_data = request.get_json(silent=True) or {}
    body, status = rating_api.create_rating_route(rating_data)
    return Flask.jsonify(body), status

# Get all ratings for a place
@app.route("/api/ratings/<place_id>", methods=['GET'])
def get_ratings(place_id):
    body, status = rating_api.get_ratings_route(place_id)
    return Flask.jsonify(body), status

# Get rating summary for a place
@app.route("/api/ratings/<place_id>/summary", methods=['GET'])
def get_rating_summary(place_id):
    body, status = rating_api.get_rating_summary_route(place_id)
    return Flask.jsonify(body), status