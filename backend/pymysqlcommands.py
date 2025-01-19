#commands which directly contact MySQL

import sys
import os
import pymysql #replace with mysql.connector -> greater safety features


connection = None
cursor = None
tables = []
serverName = "avenudubmysql.mysql.database.azure.com" 
dbName = "test"
certificate="backend/DigiCertGlobalRootCA.crt.pem"
#currently a test/dev server, subject to change

def connect(usr, passwd = None):
    global connection
    global cursor
    global serverName

    try:
        cursor = connection.cursor()
        loginsuccess = True
    except:
        loginsuccess = False
    
    #we should NOT be storing root user's password on in app. unfortunately, there is no method to decrypt, so root password is required on program startup
    
    while not loginsuccess:
        try:
            if passwd:
                connection = pymysql.connect(host=serverName, user=usr, password=passwd, ssl_ca=certificate, ssl_disabled=False)
            else:
                connection = pymysql.connect(host=serverName, user=usr, password=input("What is the root user's password?\n"), ssl_ca=certificate, ssl_disabled=False)
        except pymysql.Error as err:
            if err == "ER.ACCESS_DENIED_ERROR":
                print("Something is wrong with your user name or password")
            else:
                print(err)
        else:
            print("Login success!")
            loginsuccess = True
            # connection.close()
    cursor = connection.cursor()

def dbConnect(name = dbName):
    try:
        cmd = "USE %s"
        cursor.execute(cmd, (name,)) #must do this before adding tables and stuff to a database
    except pymysql.Error as err:
        if err.args[0] == 1008:
            print("Database does not exist")
        else:
            print(err)

def prepare(usr = "root", name = dbName):
    # connect(usr)
    dbConnect()
#not sure what this method is actually doing lmao


def dbCreate(name):
    global tables
    try:
        prepare()
        cursor.execute("CREATE DATABASE " + name)
    except pymysql.Error as err:
        if err.args[0] == 1007:
            print("Database already exists")
        else:
            print(err)
    else:
        print("Database successfully created!")
        tables.append(name)
    

def dbDelete(name):
    try:
        prepare()
        cursor.execute("DROP DATABASE " + name)
    except pymysql.Error as err:
        if err.args[0] == 1008:
            print("Database does not exist")
        else:
            print(err)
    else:
        print("Database successfully deleted!")
        tables.remove(name)


def tblCreate(name, entries = "'column name' datatype", delimiter = "|"):
    global tables
    tableargs = []
    try:
        prepare()
        dbConnect()
        execute = "CREATE TABLE " + name + " ("
        i = entries.count(delimiter)
        while(0 < i):
            execute += entries[0:entries.index(delimiter)] + ","
            tableargs.append(entries[0:entries.index(delimiter)])
            entries = entries[entries.index(delimiter)+1:]
            i -= 1
        execute = execute[:(len(execute)-1)] + ")"
        print(tableargs)
        cursor.execute(execute)
        
    except pymysql.Error as err:
        if err.args[0] == 1050:
            print("Table already exists")
        else:
            print(err)
    else:
        print("Table successfully created!")
        tables.append({name:tableargs})
        print(tables)

def tblInsertEntry(tablename, values = []):
    try:
        prepare()
        execute = "INSERT INTO " + tablename + " VALUES (" + str(values)[1:len(str(values))-1] + ");"
        # for i in values:
        #     execute += i+", "
        # execute = execute[:(len(execute)-2)] + ");"
        print(execute)
        print(cursor.execute("SELECT * FROM " + tablename))
        print(cursor.fetchall())
        print(cursor.execute(execute))
        print(cursor.execute("SELECT * FROM " + tablename))
        connection.commit()
        #ok so this gives the # of entries, STARTING w/ # of entries in the WORKSPACE's table 
        #BUT ALL NEW ENTRIES ARE INVISIBLE, AND ARE TEMPORARY?
        #ALSO SOME NULL ERROR (0,'') in both tblInsertEntry() and prepare() on first time run :skull: so we're gonna have to restart the app???

    except pymysql.Error as err:
        print(err)
    else:
        print("Entry successfully added!")



def close():
    global connection
    connection.close()