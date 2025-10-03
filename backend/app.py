from flask import Flask
from flask import request
import accountManager
import mysqlcommands as sql
from datetime import datetime

#https://code.visualstudio.com/docs/python/tutorial-flask
#https://flask.palletsprojects.com/en/stable/quickstart/

app = Flask(__name__)

# @app.route("/")
# def home():
#     return "Hello, Flask!"
    
# LOGIN:
# verifies that a provided login/user exists
# params: username/email, password
# returns: {'logInSuccess': boolean} depending on login success
@app.route("/home_screens", methods=['GET'])
def logIn(user, passwd):
    return Flask.jsonify({'logInSuccess':accountManager.logIn(user, passwd)})

# SETTINGS: (UNFINISHED) #################################################################################################
# retrieves the user's info and favorites
# params: userID
# returns: {'user': string, 'email':string, 'favorites':list}
@app.route("/home_screens/settings/<userID>", methods=['GET'])
def settings(userID):
    userdata = sql.tblGet('gen_user', columns=['username', 'email'], values={'userID':userID})
    userfavs = sql.tblGet('user_favorites', values={'userID':userID}) # may return a list
    return Flask.jsonify({'user':userdata[0], 'email':userdata[1], 'favorites': userfavs})

# ADD REPORTS: 
# adds an incident to the database of crime
# params: location, crime type,
# returns: {'success': boolean} depending on query success 
@app.route("/home_screens/report/<location>/<type>/<description>", methods=['POST'])
def addReport(location, type): 
    success = sql.tblInsert("crime_log", values={'created_at': datetime.strftime(datetime.now, '%Y-%m-%d %H:%M:%S'), 'crime_type':type, 'address':location})
    return Flask.jsonify({'success':success})

# SAFETY INFO: (UNFINISHED) #################################################################################################
# retrieves all criminal incidents within a specified timeframe
# params: time range in days before current day
# returns: 2D list: each element contains: [created_at, case_num, crime_type, address, case_open, case_close]
@app.route("/reports_screens/safetyhome/<range>", methods=['GET'])
def getSafety(range):
    # not super sure if this notation works with my implementation :D
    return Flask.jsonify(sql.tblGet("crime_log", values={'created_at <= date_sub(now(), interval ' + str(range) + ' day)':''}))

# ADD FAVORITE:
# adds a specified location the user's favorites catalogue
# params: userID, the business to favorite
# returns: {'success': boolean} depending on query success 
@app.route("/business_screens/businessinfo/<businessID>", methods=['POST'])
def addFavorite(user, businessID):
    success = sql.tblInsert("user_favorites", values={'userID':user, 'locationID':businessID})
    return Flask.jsonify({'success':success})
 
# GET BUILDINGS: (UNFINISHED) #################################################################################################
# retrives all buildings that meet a certain criteria
# params: filter??
# returns: list of buildings
@app.route("/business_screens/businesshome/<filter>", methods=['GET'])
def getBuildings(filter):
    #honestly, it might be easier to just do the google api call instead of using the database
    sql.tblGet("buildings") # add filter implementation if necessary

    return
# TODO: THIS LMFAO