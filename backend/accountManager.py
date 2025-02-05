import mysqlcommands as sql
import passmanage

def createAcc(username, passwd, specialID = 0):
    if not username or not passwd:
        raise Exception()
    login = [username] + passmanage.encrypt(passwd) + [specialID] #if 0, ID will be autoincremented
    sql.tblInsert("gen_user", login)

def logIn(username, passwd):
    if not username or not passwd:
        raise Exception("Please enter both your username and your password.")
    print(passmanage.passcheck(username, passwd))
    #not done

# sql.connect("avenudub", "JoeyScaresMe!")
# createAcc("test", "thisIsMyv3ryC00LPassWord!!!")
# logIn(None,None)
# logIn("test", "thisIsMyv3ryC00LPassWord!!!")

