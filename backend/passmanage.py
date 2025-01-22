import bcrypt
# TODO: conversion for use with MySQL database


def encrypt(password):
    bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    

def passcheck(password): #checks to see if root password is correct
    rootpass = bytes(f.readlines()[0], "utf-8")
    userBytes = password.encode("utf-8")
    return bcrypt.checkpw(userBytes, rootpass)
    
def syslogin():

    rootpass = bytes(f.readlines()[0], "utf-8")
    return rootpass.decode("utf-8")
