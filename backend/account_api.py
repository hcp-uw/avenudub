from google_apis import create_service
import json
from datetime import datetime
import hashlib
import secrets
import accountManager
import mysqlcommands as sql

# Account creation and user management API routes and formatting functions

def format_user_data(user_response):
    """
    Formats user account data from database/API response into a clean structure
    """
    if isinstance(user_response, list):
        users = user_response
        formatted_users = []
        for user in users:
            user_data = {
                'user_id': user.get('id', ''),
                'username': user.get('username', ''),
                'email': user.get('email', ''),
                'first_name': user.get('first_name', ''),
                'last_name': user.get('last_name', ''),
                'created_at': user.get('created_at', ''),
                'last_login': user.get('last_login', ''),
                'is_active': user.get('is_active', True),
                'profile_picture': user.get('profile_picture', ''),
                'preferences': user.get('preferences', {})
            }
            formatted_users.append(user_data)
        return formatted_users
    else:
        # Single user response
        return {
            'user_id': user_response.get('id', ''),
            'username': user_response.get('username', ''),
            'email': user_response.get('email', ''),
            'first_name': user_response.get('first_name', ''),
            'last_name': user_response.get('last_name', ''),
            'created_at': user_response.get('created_at', ''),
            'last_login': user_response.get('last_login', ''),
            'is_active': user_response.get('is_active', True),
            'profile_picture': user_response.get('profile_picture', ''),
            'preferences': user_response.get('preferences', {})
        }

def format_auth_response(user_data, token=None):
    """
    Formats authentication response data
    """
    response = {
        'user': format_user_data(user_data),
        'authenticated': True,
        'timestamp': datetime.now().isoformat()
    }
    
    if token:
        response['access_token'] = token
    
    return response

# Example API route handlers (would be used with Flask/FastAPI)
def register_user_route(user_data):
    """
    POST /api/auth/register - Create a new user account
    Expected params: username, password, email
    """
    # Validate required fields
    required_fields = ['username', 'password', 'email']
    for field in required_fields:
        if field not in user_data or not user_data[field]:
            return {'error': f'Missing required field: {field}'}, 400
    
    # Validate username
    username = user_data['username'].strip()
    if not username:
        return {'error': 'Username cannot be empty'}, 400
    
    # Validate email format (basic validation)
    email = user_data['email'].strip()
    if not email or '@' not in email or '.' not in email.split('@')[-1]:
        return {'error': 'Invalid email format'}, 400
    
    # Validate password strength
    password = user_data['password']
    if len(password) < 8:
        return {'error': 'Password must be at least 8 characters long'}, 400
    
    try:
        # Check if username already exists
        existing_user = sql.tblGet(
            table="gen_user",
            columns=["user_id"],
            values={"username": username}
        )
        if existing_user.get('success') and existing_user.get('resp') and len(existing_user['resp']) > 0:
            return {'error': 'Username already exists'}, 400
        
        # Check if email already exists
        existing_email = sql.tblGet(
            table="gen_user",
            columns=["user_id"],
            values={"email": email}
        )
        if existing_email.get('success') and existing_email.get('resp') and len(existing_email['resp']) > 0:
            return {'error': 'Email already registered'}, 400
        
        # Create account using accountManager function
        create_result = accountManager.createAcc(
            username=username,
            passwd=password,
            email=email,
            specialID=user_data.get('specialID', 0)
        )
        
        if not create_result.get('success'):
            return {'error': f'Failed to create account: {create_result.get("err", "Unknown error")}'}, 400
        
        # Get the created user data
        user_info = sql.tblGet(
            table="gen_user", 
            columns=["user_id", "username", "email", "created_at"], 
            values={"username": username}
        )
        
        if user_info.get('success') and user_info.get('resp') and len(user_info['resp']) > 0:
            user = user_info['resp'][0]
            formatted_user = {
                'user_id': user.get('user_id', ''),
                'username': user.get('username', ''),
                'email': user.get('email', ''),
                'created_at': user.get('created_at', datetime.now().isoformat())
            }
            return {'message': 'User created successfully', 'user': formatted_user}, 201
        else:
            return {'error': 'User created but could not retrieve user data'}, 500
            
    except Exception as e:
        return {'error': f'Failed to create user: {str(e)}'}, 400

def login_user_route(credentials):
    """
    POST /api/auth/login - Authenticate user
    """
    # Validate required fields
    if 'username' not in credentials or 'password' not in credentials:
        return {'error': 'Username and password required'}, 400
    
    try:
        # Use existing accountManager function for login
        result = accountManager.logIn(credentials['username'], credentials['password'])
        
        # Check if login was successful
        if result.get('success'):
            user_id = result.get('userID')
            
            # Get user data from database
            user_info = sql.tblGet(
                table="gen_user", 
                columns=["user_id", "username", "email", "created_at"], 
                values={"user_id": user_id}
            )
            
            if user_info.get('success') and user_info.get('resp') and len(user_info['resp']) > 0:
                user = user_info['resp'][0]
                user_data = {
                    'id': user.get('user_id', ''),
                    'username': user.get('username', ''),
                    'email': user.get('email', ''),
                    'created_at': user.get('created_at', datetime.now().isoformat()),
                    'last_login': datetime.now().isoformat(),
                    'is_active': True
                }
                
                # Generate token (in production, use JWT)
                access_token = secrets.token_urlsafe(32)
                
                response = format_auth_response(user_data, access_token)
                return response, 200
            else:
                return {'error': 'Login successful but could not retrieve user data'}, 500
        else:
            return {'error': 'Invalid credentials'}, 401
            
    except Exception as e:
        return {'error': f'Login failed: {str(e)}'}, 401

def get_user_profile_route(user_id):
    """
    GET /api/auth/profile/:userId - Get user profile
    """
    try:
        # Fetch user data from database
        user_info = sql.tblGet(
            table="gen_user", 
            columns=["user_id", "username", "email", "created_at"], 
            values={"user_id": user_id}
        )
        
        if user_info.get('success') and user_info.get('resp') and len(user_info['resp']) > 0:
            user = user_info['resp'][0]
            user_data = {
                'id': user.get('user_id', ''),
                'username': user.get('username', ''),
                'email': user.get('email', ''),
                'created_at': user.get('created_at', datetime.now().isoformat()),
                'is_active': True,
                'profile_picture': '',
                'preferences': {}
            }
            
            formatted_user = format_user_data(user_data)
            return {'user': formatted_user}, 200
        else:
            return {'error': 'User not found'}, 404
            
    except Exception as e:
        return {'error': f'Failed to retrieve user profile: {str(e)}'}, 500

def update_user_profile_route(user_id, update_data):
    """
    PUT /api/auth/profile/:userId - Update user profile
    """
    try:
        # Check if user exists
        user_info = sql.tblGet(
            table="gen_user", 
            columns=["user_id", "username", "email", "created_at"], 
            values={"user_id": user_id}
        )
        
        if not user_info:
            return {'error': 'User not found'}, 404
        
        # Prepare update values
        update_values = {}
        if 'email' in update_data:
            update_values['email'] = update_data['email']
        if 'username' in update_data:
            update_values['username'] = update_data['username']
        
        # Update user in database
        if update_values:
            update_result = sql.tblUpdate(
                table="gen_user", 
                ID=["user_id", user_id], 
                values=update_values
            )
            
            if not update_result.get('success'):
                return {'error': 'Failed to update profile'}, 500
        
        # Get updated user data
        updated_user_info = sql.tblGet(
            table="gen_user", 
            columns=["user_id", "username", "email", "created_at"], 
            values={"user_id": user_id}
        )
        
        if updated_user_info:
            user_data = {
                'id': user.get('user_id', ''),
                'username': user.get('username', ''),
                'email': user.get('email', ''),
                'created_at': user.get('created_at', datetime.now().isoformat()),
                'is_active': True,
                'profile_picture': '',
                'preferences': {}
            }
            
            formatted_user = format_user_data(user_data)
            return {'message': 'Profile updated successfully', 'user': formatted_user}, 200
        else:
            return {'error': 'Profile updated but could not retrieve updated data'}, 500
            
    except Exception as e:
        return {'error': f'Failed to update user profile: {str(e)}'}, 500

def forgot_password_route(request_data):
    """
    POST /api/auth/forgot-password - Request password reset
    Generates a reset token and returns it (token should be sent via email in production)
    """
    username = request_data.get('username', '')
    email = request_data.get('email', '')
    
    if not username and not email:
        return {'error': 'Username or email required'}, 400
    
    try:
        result = accountManager.forgotPw(username=username, email=email)
        
        if result.get('success'):
            user_id = result.get('user_id')
            
            # Generate reset token at API layer (valid for 1 hour)
            reset_token = secrets.token_urlsafe(32)
            
            # TODO: In production, send reset_token via email instead of returning it
            # Store token in memory/session/cache for verification, or use email verification
            
            response = {
                'message': result.get('message', 'Password reset code has been sent'),
                'user_id': user_id,
                'reset_token': reset_token  # Remove in production, only send via email
            }
            return response, 200
        else:
            return {'error': result.get('error', 'Failed to process password reset request')}, 400
            
    except Exception as e:
        return {'error': f'Failed to process request: {str(e)}'}, 500

def verify_reset_token_route(request_data):
    """
    POST /api/auth/verify-reset-token - Verify reset token is valid
    """
    user_id = request_data.get('user_id')
    reset_token = request_data.get('reset_token')
    
    if not user_id or not reset_token:
        return {'error': 'user_id and reset_token required'}, 400
    
    try:
        result = accountManager.verifyResetToken(user_id, reset_token)
        
        if result.get('success') and result.get('valid'):
            return {'valid': True, 'message': 'Reset token is valid'}, 200
        else:
            return {'valid': False, 'error': result.get('error', 'Invalid or expired token')}, 400
            
    except Exception as e:
        return {'error': f'Failed to verify token: {str(e)}'}, 500

def reset_password_route(request_data):
    """
    POST /api/auth/reset-password - Reset password using reset token
    """
    user_id = request_data.get('user_id')
    reset_token = request_data.get('reset_token')
    new_password = request_data.get('new_password')
    
    if not user_id or not reset_token or not new_password:
        return {'error': 'user_id, reset_token, and new_password required'}, 400
    
    # Validate password strength
    if len(new_password) < 8:
        return {'error': 'Password must be at least 8 characters long'}, 400
    
    try:
        result = accountManager.resetPassword(user_id, reset_token, new_password)
        
        if result.get('success'):
            return {'message': 'Password reset successfully'}, 200
        else:
            return {'error': result.get('error', 'Failed to reset password')}, 400
            
    except Exception as e:
        return {'error': f'Failed to reset password: {str(e)}'}, 500
