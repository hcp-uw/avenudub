# Allows Python to communicate with MySQL database with MySQLclient
# Current functions:
    # setDefaultDB
    # connect
    # dbConnect
    # dbCreate
    # dbDelete
    # tblCreate
    # tblDelete
    # tblInsert
    # tblGet (susceptible to injection)
    # tblUpdate
    # entryDelete (susceptible to injection)
    # close

import MySQLdb

connection = None
cursor = None
serverName = "avenudubmysql.mysql.database.azure.com" 
defaultDB = "avenudb"
# IF THE FOLDER NAME FOR THE BACKEND CHANGES, THIS PATH WILL ALSO NEED TO CHANGE
certificate="combined-ca-certificates.pem"

def setDefaultDB(name):
    global defaultDB
    defaultDB = name

def connect(usr, passwd = None):
    global connection
    global cursor
    global serverName

    try:
        cursor = connection.cursor(MySQLdb.cursors.DictCursor)
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
            loginsuccess = True
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    return {'success':True, 'resp':"Login success."}

# connects to a specific database
def dbConnect(db = defaultDB):
    try:
        # USE does not take parameters
        cursor.execute("USE " + db) 
    except MySQLdb.Error as err:
        return {'success':False, 'err':err}
    else:
        return {'success':True, 'resp':"Successfuly connected to database."}

# creates a database (likely will not use)
def dbCreate(name):
    global tables
    try:
        dbConnect(name)
        # CREATE does not take parameters
        cursor.execute("CREATE DATABASE " + name)
    except MySQLdb.Error as err:
        return {'success':False, 'err':err}
    else:
        return {'success':True, 'resp':"Database successfully created!"}
    
# deletes a database (likely will not use)
def dbDelete(name):
    try:
        dbConnect(name)
        # DROP does not take parameters
        cursor.execute("DROP DATABASE " + name)
    except MySQLdb.Error as err:
        return {'success':False, 'err':err}
    else:
        return {'success':True, 'resp':"Database successfully deleted."}

# gets the info regarding a table's columns, given the table's name.
# returns a dictionary (table:description) if successful, False otherwise
def tblInfo(table):
    try:
        dbConnect()
        cursor.execute("SHOW COLUMNS FROM " + table)
    except MySQLdb.Error as err:
        return {'success':False, 'err':err}
    else:
        return {'success':True, 'resp':cursor.fetchall()}

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
        return {'success':False, 'err':err}
    else:
        return {'success':True, 'resp':'Table successfully deleted.'}

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
    except MySQLdb.Error as err:
        return {'success':False, 'err':err}
    else:
        return {'success':True, 'resp':"Table successfully deleted."}

# inserts data into a table. Assumes that all columns will be filled or given null values.
# returns True if successful
def tblInsert(table, values = []):
    try:
        dbConnect()
        cmd = "INSERT INTO " + table + " VALUES ("
        for i in values:
            # This parameterization DOES work!
            cmd += "%s, "
        cmd = cmd[:len(cmd)-2] + ");"
        cursor.execute(cmd, values)
        cursor.execute("COMMIT")
    except MySQLdb.Error as err:
        return {'success':False, 'err':err}
    else:
        return {'success':True, 'resp':"Entry successfully inserted."}
    
# inserts data into a table. Will not insert values if not given, use only with tables using default values
# returns True if successful
def tblDictInsert(table, values = {}):
    try:
        dbConnect()
        cmd = "INSERT INTO " + table + " VALUES ("
        params = []
        for i in tblInfo(table).get('resp'):
            # This parameterization DOES work
            if i.get('Field') in values.keys():
                cmd += "%s, "
                params.append(values.get(i.get('Field')))
        cmd = cmd[:len(cmd)-2] + ");"
        cursor.execute(cmd, params)
        cursor.execute("COMMIT")
    except MySQLdb.Error as err:
        return {'success':False, 'err':err}
    else:
        return {'success':True, 'resp':"Entry successfully inserted."}

# returns requested columns from a table
# TODO: use dynamic sql to avoid injection hazards
def tblGet(table, columns = ["*"], values = {"column":"value"}):
    try:
        dbConnect()
        params = []
        cmd = "SELECT "

        for i in columns:
            cmd += i + ", "
        cmd = cmd[:-2] + " FROM " + table
        if(len(values) != 0):
            cmd += " WHERE "
            for i in values.keys():
                if(len(str(values.get(i))) != 0):
                    cmd += i + " = %s AND "
                    params.append(values.get(i))
            cmd = cmd[:-5] + ";"
        cursor.execute(cmd, params)
    except MySQLdb.Error as err:
        return {'success':False, 'err':err}
    else:
        return {'success':True, 'resp':cursor.fetchall()}

# changes/updates a specified value in a table (search by ID)
def tblUpdate(table, ID = ["column", "value"], values = {"column":"value"}):
    try:
        dbConnect()
        cmd = "UPDATE " + table + " SET "
        for i in values.keys():
            # This parameterization DOES work!
            cmd += i + " = %s, "
        cmd = cmd[:len(cmd)-2]
        cmd += "WHERE " + ID[0]  + " = " + str(ID[1]) + ";"
        valsToList = list(values.values())
        cursor.execute(cmd, valsToList)
        # print(cursor._executed)
        cursor.execute("COMMIT")
    except MySQLdb.Error as err:
        return {'success':False, 'err':err}
    else:
        return {'success':True, 'resp':'Entry successfully updated.'}

# averages values of a column in a table - used for average rating
def columnAvg(table, column, values = {"column":"value"}):
    try:
        dbConnect()
        params = []
        cmd = "SELECT AVG(" + column + ") FROM "+table
        if(len(values) != 0):
            cmd += " WHERE "
            for i in values.keys():
                if(len(str(values.get(i))) != 0):
                    cmd += i + " = %s AND "
                    params.append(values.get(i))
            cmd = cmd[:-5] + ";"

        print(cmd)
        cursor.execute(cmd, params)
    except MySQLdb.Error as err:
        return {'success':False, 'err':err}
    else:
        return {'success':True, 'resp':cursor.fetchall()}

# deletes an entry in a table
# POTENTIALLY SUSCEPTIBLE TO INJECTION
def entryDelete(table, condition="some string"):
    try:
        dbConnect()
        cmd = "DELETE FROM " + table + " WHERE " + condition
        cursor.execute(cmd)
        cursor.execute("COMMIT")
    except MySQLdb.Error as err:
        return {'success':False, 'err':err}
    else:
        return {'success':True, 'resp':"Entries successfully deleted."}

# closes the connection
def close():
    global connection
    connection.close()


