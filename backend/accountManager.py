import mysqlcommands as sql
import passmanage

def createAcc(username, passwd, email="", specialID = 0):
    if not username or not passwd:
        raise Exception("Username and password are required")
    
    # Encrypt password
    pwSalt, pwHash = passmanage.encrypt(passwd)
    
    # Prepare values dictionary for tblDictInsert
    # Note: tblDictInsert only inserts columns that are in the values dict
    # Columns with defaults or auto-increment will be handled by the database
    values = {
        'username': username,
        'salt': pwSalt,
        'pwhash': pwHash
    }
    
    # Add email if provided
    if email:
        values['email'] = email
    
    # Add specialID if provided (0 means auto-increment, so we can omit it)
    # But if explicitly provided, include it
    if specialID != 0:
        values['specialID'] = specialID
    
    # Insert into database using dictionary insert
    result = sql.tblDictInsert("gen_user", values)
    
    if not result.get('success'):
        raise Exception(f"Failed to create account: {result.get('err', 'Unknown error')}")
    
    return result

def logIn(username, passwd):
    if username and passwd:    
        return passmanage.passcheck(username, passwd)
    return {'success':False, 'userID':None}
    
#api-ify this part and return true to frontend, they have a "isLoggedIn" status var


def forgotPw(username = "", email = ""):
    """
    Initiates password reset process
    Returns user_id for password reset (token generation/storage handled externally)
    Returns: {'success': bool, 'user_id': int} or {'success': False, 'error': str}
    """
    # Build search values - use either username or email
    search_values = {}
    if username:
        search_values['username'] = username
    if email:
        search_values['email'] = email
    
    if not search_values:
        return {'success': False, 'error': 'Username or email required'}
    
    # Get user data
    userdata = sql.tblGet(table="gen_user", columns=["user_id", "username", "email"], values=search_values)
    
    if not userdata.get('success') or not userdata.get('resp') or len(userdata['resp']) == 0:
        return {'success': True, 'message': 'If an account exists, a reset code has been sent'}
    
    user = userdata['resp'][0]
    user_id = user.get('user_id')

    return {
        'success': True,
        'user_id': user_id,
        'message': 'Password reset initiated. Please check your email for reset code.'
    }

def changePw(user_id = "", pw=None):
    """
    Changes user password
    Returns: {'success': bool, 'error': str}
    """
    if not pw:
        return {'success': False, 'error': 'Password required'}
    
    pwSalt, pwHash = passmanage.encrypt(pw)
    if(passmanage.passcheck(ID=user_id, passwd=pw)): 
        #TODO: implement the passmanage.py isValidPass(pw) and pass here instead
        #no password provided aw hell naw
        print("Please enter a valid password.")
    else:
        return {'success': False, 'error': 'Invalid password'}

def verifyResetToken(user_id, reset_token):
    """
    Verifies if user exists (token validation handled externally via email verification)
    Returns: {'success': bool, 'valid': bool, 'error': str}
    """
    # Verify user exists
    userdata = sql.tblGet(
        table="gen_user",
        columns=["user_id"],
        values={"user_id": user_id}
    )
    
    if not userdata.get('success') or not userdata.get('resp') or len(userdata['resp']) == 0:
        # User not found - but don't reveal this for security
        return {'success': True, 'valid': False, 'error': 'Invalid or expired token'}
    
    # Token validation should be handled by email verification or external service
    # For now, if user exists and token is provided, consider it valid
    # In production, verify token through email service or separate token storage
    if reset_token:
        return {'success': True, 'valid': True}
    else:
        return {'success': True, 'valid': False, 'error': 'Reset token required'}

def resetPassword(user_id, reset_token, new_password):
    """
    Resets password using a reset token
    Returns: {'success': bool, 'error': str}
    """
    # Verify reset token first
    token_verify = verifyResetToken(user_id, reset_token)
    
    if not token_verify.get('success'):
        return {'success': False, 'error': token_verify.get('error', 'Token verification failed')}
    
    if not token_verify.get('valid'):
        return {'success': False, 'error': token_verify.get('error', 'Invalid or expired token')}
    
    # Change password
    pwSalt, pwHash = passmanage.encrypt(new_password)
    update_result = sql.tblUpdate(
        table="gen_user",
        ID=["user_id", user_id],
        values={
            "salt": pwSalt,
            "pwhash": pwHash
        }
    )
    
    if update_result.get('success'):
        return {'success': True, 'message': 'Password reset successfully'}
    else:
        return {'success': False, 'error': 'Failed to update password'}
    
# returns a dictionary of all users (hopefully 1!) with the username and email given
def userInfoToID(username = "", email = ""):
    return sql.tblGet(table="gen_user", columns=["user_id"], values={"username":username, "email":email})[0]

