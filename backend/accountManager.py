import MySQLCommands as sql
import passManage

def createAcc(username, passwd, specialID = 0):
    if not username or not passwd:
        raise Exception()
    login = [username] + passManage.encrypt(passwd) + [specialID] #if 0, ID will be autoincremented
    sql.tblInsert("gen_user", login)

def logIn(username, passwd):
    if not username or not passwd:
        raise Exception("Please enter both your username and your password.")
    print(passManage.passcheck(username, passwd))
    #not done

# sql.connect("avenudub", "JoeyScaresMe!")
# createAcc("test", "thisIsMyv3ryC00LPassWord!!!")
# logIn(None,None)
# logIn("test", "thisIsMyv3ryC00LPassWord!!!")

