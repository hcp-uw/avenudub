import bcrypt
import mysqlcommands as sql
# TODO: conversion for use with MySQL database

# encrypts new user password upon account creation
def encrypt(password):
    bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    return [salt, bcrypt.hashpw(bytes,salt)]
    
# checks user password against MySQL database
def passcheck(username, password):
    pw = bytes(sql.tblGet("gen_user", columns = ["pwhash"], values = {"username":username})[0], "utf-8")
    password = bytes(password, "utf-8")
    return bcrypt.checkpw(password, pw)
    
# def syslogin():

#     rootpass = bytes(f.readlines()[0], "utf-8")
#     return rootpass.decode("utf-8")


