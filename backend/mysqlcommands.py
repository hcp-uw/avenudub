# Allows Python to communicate with MySQL database with MySQLclient
# Current functions:
    # connect
    # dbConnect
    # dbDelete
    # tblCreate
    # tblInsert
    # tblDelete

import MySQLdb

connection = None
cursor = None
serverName = "avenudubmysql.mysql.database.azure.com" 
defaultDB = "test"
# IF THE FOLDER NAME FOR THE BACKEND CHANGES, THIS PATH WILL ALSO NEED TO CHANGE
certificate="backend/DigiCertGlobalRootCA.crt.pem"
# currently a test/dev server, subject to change

def setDefaultDB(name):
    global defaultDB
    defaultDB = name

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
                connection = MySQLdb.connect(user=usr, password=passwd, host=serverName, port=3306, ssl={"ca":certificate}, ssl_mode="VERIFY_CA")
            else:
                connection = MySQLdb.connect(user=usr, password=input("What is the root user's password?\n"), host=serverName, port=3306, ssl_ca=certificate, ssl_disabled=False)
        except MySQLdb.Error as err:
            if err == "ER.ACCESS_DENIED_ERROR":
                print("Something is wrong with your user name or password")
            else:
                print(err)
        else:
            print("Login success!")
            loginsuccess = True
    cursor = connection.cursor()

# connects to a specific database
def dbConnect(db = defaultDB):
    try:
        # USE does not take parameters
        cursor.execute("USE " + db) 
    except MySQLdb.Error as err:
        if err.args[0] == 1008:
            print("Database does not exist")
        else:
            print(err)

# creates a database (likely will not use)
def dbCreate(name):
    global tables
    try:
        dbConnect(name)
        # CREATE does not take parameters
        cursor.execute("CREATE DATABASE " + name)
    except MySQLdb.Error as err:
        if err.args[0] == 1007:
            print("Database already exists")
        else:
            print(err)
    else:
        print("Database successfully created!")
    
# deletes a database (likely will not use)
def dbDelete(name):
    try:
        dbConnect(name)
        # DROP does not take parameters
        cursor.execute("DROP DATABASE " + name)
    except MySQLdb.Error as err:
        if err.args[0] == 1008:
            print("Database does not exist")
        else:
            print(err)
    else:
        print("Database successfully deleted!")

# creates a table. Columns are specified by "(column name) (datatype)|(new column) (new data)" etc.
# the delimiter parameter can be used to change delimiter if default pipe (|) is part of the parameters
def tblCreate(table, entries = "(column name) (datatype)", delimiter = "|"):
    try:
        dbConnect()
        cmd = "CREATE TABLE " + table + " ("
        i = entries.count(delimiter)
        while(0 < i):
            cmd += entries[0:entries.index(delimiter)] + ","
            entries = entries[entries.index(delimiter)+1:]
            i -= 1
        cmd = cmd[:(len(cmd)-1)] + ");"
        cursor.execute(cmd)
        
    except MySQLdb.Error as err:
        if err.args[0] == 1050:
            print("Table already exists")
        else:
            print(err)
    else:
        print("Table successfully created!")

# deletes a table
def tblDelete(table):
    try:
        dbConnect()
        # DROP does not take parameters
        cursor.execute("DROP TABLE " + table)
    except MySQLdb.Error as err:
        if err.args[0] == 1008:
            print("Table does not exist")
        else:
            print(err)
    else:
        print("Table successfully deleted!")

# inserts data into a table. Assumes that all columns will be filled or given null values.
def tblInsert(table, values = []):
    try:
        dbConnect()
        cmd = "INSERT INTO " + table + " VALUES ("
        for i in values:
            # This parameterization DOES work!
            cmd += "%s, "
        cmd = cmd[:len(cmd)-2] + ");"
        cursor.execute(cmd, values)
        connection.commit()
    except MySQLdb.Error as err:
        print(err)
    else:
        print("Entry successfully added!")

# closes the connection
def close():
    global connection
    connection.close()


