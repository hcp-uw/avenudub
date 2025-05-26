import mysqlcommands as sql
import passmanage

def createAcc(username, passwd, specialID = 0):
    if not username or not passwd:
        raise Exception()
    
    #TODO: password validation - make sure its a good password!

    login = [username] + passmanage.encrypt(passwd) + [specialID] #if 0, ID will be autoincremented
    sql.tblInsert("gen_user", login)

def logIn(username, passwd):
    if not username or not passwd:
        raise Exception("Please enter both your username and your password.")
    print(passmanage.passcheck(username, passwd))
    return "success! " + username + passwd
    #not done
    
#api-ify this part and return true to frontend, they have a "isLoggedIn" status var


#implement forgot password
def forgotPw(username = "", email = ""):
    userdata = sql.tblGet(table="gen_user", columns=["username", "email"], values={"username":username, "email":email})
    if(not userdata):
       #no such account found!
       print("no such account found")
       return
    print("we have sent an email to " + userdata[1] + " with instructions to reset your password")
    #TODO: email the user a verification code!!
    print(userdata)

def changePw(id = "", pw=None):
    pwSalt, pwHash = passmanage.encrypt(pw)
    if((not pw) or passmanage.passcheck(ID=id, passwd=pw)): 
        #TODO: implement the passmanage.py isValidPass(pw) and pass here instead
        #no password provided aw hell naw
        print("Please enter a valid password.")
    else:
        sql.tblUpdate(table="gen_user", ID=["userID", id], values={"salt": pwSalt, "pwhash": pwHash})
    
def userInfoToID(username = "", email = ""):
    return sql.tblGet(table="gen_user", columns=["userID"], values={"username":username, "email":email})[0]

