from flask import Flask, jsonify
from flask import request
import accountManager
import passmanage
import mysqlcommands as sql
import buildingInfo
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
@app.route("/home_screens/<user>/<password>", methods=['GET'])
def logIn(user, passwd):
    if user and passwd:    
        return jsonify(passmanage.passcheck(user, passwd))
    return jsonify({'success':False, 'userID':None})

# SETTINGS:
# retrieves the user's info and favorites
# params: userID
# returns: {'success' : boolean, 'resp': {user': string, 'email':string, 'favorites':tuple of dictionaries}} (resp is None if failure occurred)
@app.route("/home_screens/settings/<userID>", methods=['GET'])
def settings(userID):
    userdata = sql.tblGet('gen_user', columns=['username', 'email'], values={'user_id':userID})
    userfavs = sql.tblGet('user_favorites', values={'user_id':userID}) #returns a tuple of dictionaries {user_id, place_id}
    if userdata.get('success') and userdata.get('success'):
        userdata = userdata.get('resp')
        userfavs = userfavs.get('resp')
        return jsonify({'success' : True, 'resp' : {'user':userdata.get('username'), 'email':userdata.get("email"), 'favorites': userfavs}})
    return jsonify({'success' : True, 'resp' : None})

# ADD REPORTS: 
# adds an incident to the database of crime
# params: location, crime type,
# returns: {'success' : boolean} depending on query success 
@app.route("/home_screens/report/<location>/<type>/<description>", methods=['POST'])
def addReport(location, type, description): 
    return jsonify({'success':sql.tblInsert("crime_log", values={'created_at': datetime.strftime(datetime.now, '%Y-%m-%d %H:%M:%S'), 'crime_type':type, 'address':location, 'description':description}).get('success')})

# SAFETY INFO: (UNTESTED) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# retrieves all criminal incidents within a specified timeframe
# params: time range in days before current day
# returns: {'success' : bool, 'resp' : list of dicts} - each element contains: {created_at, case_num, crime_type, address, case_open, case_close}
@app.route("/reports_screens/safetyhome/<range>", methods=['GET'])
def getSafety(range):
    # not super sure if this notation works with my implementation :D
    return jsonify(sql.tblGet("crime_log", values={'created_at <= date_sub(now(), interval ' + str(range) + ' day)':''}))

# ADD/REMOVE FAVORITE:
# adds/deletes a specified location the user's favorites catalogue
# params: userID, businessID, add (boolean)
# returns: {'success' : boolean} depending on query success 
@app.route("/business_screens/businessinfo/<userID>/<businessID>/<add>", methods=['POST'])
def addFavorite(user, businessID, add):
    if(add):
        return jsonify({'success':sql.tblInsert("user_favorites", values={'user_id':user, 'place_id':businessID}).get('success')})
    else:
        return jsonify({'success':sql.entryDelete("user_favorites", values={'user_id':user, 'place_id':businessID}).get('success')})
 
# GET BUILDINGS: (UNTESTED) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# retrives all buildings that meet a certain criteria (without filter, the criteria is geographic (see buildingInfo.py))
# params: filter (None by default)
# returns: {'success' : boolean, 'resp' : 2D list of dicts} (see below for format) (resp is None if failure occurred, string if filter NOT None)
# 
# {name, place_id, types, phone, address, rating, google_maps_link, latitude, longitude, review_summary, opening_hours} 
@app.route("/business_screens/businesshome/", methods=['GET'])
def getBuildings(filter = None):
    if filter:
        return jsonify({'success': False, 'resp':"feature not yet implemented!"})

    try:
        resp = buildingInfo.format_building_data()
        return jsonify({'success': True, 'resp':resp}) 
    except Exception as e:
        return jsonify({'success': False, 'resp':None}) 
        
        
# TODO: THIS LMFAO

# AUTH API ROUTES ###########################################################################################################

# User registration/signup
@app.route("/api/auth/register", methods=['POST'])
def register():
    user_data = request.get_json(silent=True) or {}
    body, status = account_api.register_user_route(user_data)
    return jsonify(body), status

# Request password reset (forgot password)
@app.route("/api/auth/forgot-password", methods=['POST'])
def forgot_password():
    request_data = request.get_json(silent=True) or {}
    body, status = account_api.forgot_password_route(request_data)
    return jsonify(body), status

# Verify reset token
@app.route("/api/auth/verify-reset-token", methods=['POST'])
def verify_reset_token():
    request_data = request.get_json(silent=True) or {}
    body, status = account_api.verify_reset_token_route(request_data)
    return jsonify(body), status

# Reset password with token
@app.route("/api/auth/reset-password", methods=['POST'])
def reset_password():
    request_data = request.get_json(silent=True) or {}
    body, status = account_api.reset_password_route(request_data)
    return jsonify(body), status

# Get user profile
@app.route("/api/auth/profile/<user_id>", methods=['GET'])
def get_profile(user_id):
    body, status = account_api.get_user_profile_route(user_id)
    return jsonify(body), status

# Update user profile
@app.route("/api/auth/profile/<user_id>", methods=['PUT'])
def update_profile(user_id):
    update_data = request.get_json(silent=True) or {}
    body, status = account_api.update_user_profile_route(user_id, update_data)
    return jsonify(body), status

# RATINGS API ROUTES ##########################################################################################################

# Create a new rating
# params: ['place_id, 'user_id', 'rating_val' (1-5)]
# returns: {'message': 'Rating created successfully', 'rating_id': 'generated_id'} on success
#           {'error': dbResp.get('err')}
@app.route("/api/ratings/<place_id>/<user_id>/<rating_val>", methods=['POST'])
def create_rating(place_id, user_id, rating_val):
    rating_data = {'place_id':place_id, 'user_id':user_id, 'rating_val':rating_val}
    body, status = rating_api.create_rating_route(rating_data)
    return jsonify(body), status

# Get all ratings for a place
@app.route("/api/ratings/<place_id>", methods=['GET'])
def get_ratings(place_id):
    body, status = rating_api.get_ratings_route(place_id)
    return jsonify(body), status

# Get rating summary for a place
@app.route("/api/ratings/<place_id>/summary", methods=['GET'])
def get_rating_summary(place_id):
    body, status = rating_api.get_rating_summary_route(place_id)
    return jsonify(body), status

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)