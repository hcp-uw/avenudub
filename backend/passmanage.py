import bcrypt
import mysqlcommands as sql
# TODO: conversion for use with MySQL database

# encrypts new user password upon account creation
def encrypt(password):
    bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    return [salt, bcrypt.hashpw(bytes,salt)]
    
# checks user password against MySQL database
def passcheck(username = "", ID = "", passwd = ""):
    pw = bytes(sql.tblGet("gen_user", columns = ["pwhash"], values = {"username":username, "userID":ID})[0], "utf-8")
    passwd = bytes(passwd, "utf-8")
    return bcrypt.checkpw(passwd, pw)
    

#TODO: makes sure that a provided password meets requirements
def isValidPass():
    return



# def syslogin():

#     rootpass = bytes(f.readlines()[0], "utf-8")
#     return rootpass.decode("utf-8")


