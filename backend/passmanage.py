import bcrypt
import mysqlcommands as sql
# TODO: conversion for use with MySQL database

# encrypts new user password upon account creation
def encrypt(password):
    bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    return [salt, bcrypt.hashpw(bytes,salt)]
    
# checks user password against MySQL database
# returns {'success':boolean, 'userID':int}
def passcheck(username = "", ID = "", passwd = ""):
    user = sql.tblGet("gen_user", columns = ["pwhash"], values = {"username":username, "user_id":ID})[0]
    pw = bytes(user.get('pwhash'), "utf-8")
    userID = user.get('user_id')
    passwd = bytes(passwd, "utf-8")
    return {'success':bcrypt.checkpw(passwd, pw), 'userID':userID}
    

#TODO: makes sure that a provided password meets requirements
def isValidPass():
    return



# def syslogin():

#     rootpass = bytes(f.readlines()[0], "utf-8")
#     return rootpass.decode("utf-8")


