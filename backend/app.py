from flask import Flask
from flask import request
import accountManager
import mysqlcommands as sql
from datetime import datetime

#https://code.visualstudio.com/docs/python/tutorial-flask
#https://flask.palletsprojects.com/en/stable/quickstart/


app = Flask(__name__)

# looks like frontend never came up with dynamic routing conventions so I GET TO DECIDE THEM YIPPEE 

# @app.route("/")
# def home():
#     return "Hello, Flask!"
    
# logIn:
# params: username/email, password
# returns: true if login successful
@app.route("/home_screens", methods=['GET'])
def logIn(user, passwd):
    return Flask.jsonify({'logInSuccess':accountManager.logIn(user, passwd)})

# setting:
# params: userID
# returns: acc email, user's favorites
@app.route("/home_screens/settings<userID>", methods=['GET'])
def logIn(userID):
    userdata = sql.tblGet('gen_user', columns=['username', 'email'], values={'userID':userID})
    userfavs = sql.tblGet('user_favorites', values={'userID':userID}) # may return a list
    return Flask.jsonify({'user':userdata[0], 'email':userdata[1], 'favorites': userfavs[2]})

# reports:
# params: location, crime type, description
# returns: true if successful, report ID 
@app.route("/home_screens/report/<location><type><description>", methods=['POST'])
def addReport(location, type, description):
    sql.tblInsert("crime_log", values={'created_at': datetime.strftime(datetime.now, '%Y-%m-%d %H:%M:%S'), 'crime_type':type})
    return Flask.jsonify({'success':True})

# safety info:
# params: time range in days
# returns: crimelog, i think: created_at, case_num, crime_type, address, case_open, case_close
@app.route("/reports_screens/safetyhome<range>", methods=['GET'])
def getSafety(range):
    # not super sure if this notation works with my implementation :D
    return Flask.jsonify(sql.tblGet("crime_log", values={'created_at <= date_sub(now(), interval ' + str(range) + ' day)':''}))

# favorite:
# params: userID, the business to favorite
# returns: true if successful?
@app.route("/business_screens/businessinfo<businessID>", methods=['POST'])
def addFavorite(user, businessID):
    sql.tblInsert("user_favorites", values={'userID':user, 'locationID':businessID})
    return Flask.jsonify({'success':True})
 
# buildings:
# params: filter??
# returns: list of buildings
@app.route("/business_screens/businesshome<filter>", methods=['GET'])
def getBuildings(filter):
    sql.tblGet("buildings") # add filter implementation if necessary
    return
# TODO: THIS LMFAO