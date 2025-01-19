import bcrypt

def encrypt(password):
    with open("config", "w") as f:
        bytes = password.encode("utf-8")
        salt = bcrypt.gensalt()
        f.write(str(bcrypt.hashpw(bytes,salt).decode()))
    

def passcheck(password): #checks to see if root password is correct
    with open("config", "r") as f:
        rootpass = bytes(f.readlines()[0], "utf-8")
        userBytes = password.encode("utf-8")
        return bcrypt.checkpw(userBytes, rootpass)
    
def syslogin():
    with open("config", "r") as f:
        rootpass = bytes(f.readlines()[0], "utf-8")
        return rootpass.decode("utf-8")
        # return bcrypt.checkpw(userBytes, rootpass)
