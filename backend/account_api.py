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
    """
    # Validate required fields
    required_fields = ['username', 'password']
    for field in required_fields:
        if field not in user_data or not user_data[field]:
            return {'error': f'Missing required field: {field}'}, 400
    
    # Validate password strength
    if len(user_data['password']) < 8:
        return {'error': 'Password must be at least 8 characters long'}, 400
    
    try:
        # Use existing accountManager function
        accountManager.createAcc(
            username=user_data['username'],
            passwd=user_data['password'],
            specialID=user_data.get('specialID', 0)
        )
        
        # Get the created user data
        user_info = sql.tblGet(
            table="gen_user", 
            columns=["userID", "username", "email", "created_at"], 
            values={"username": user_data['username']}
        )
        
        if user_info:
            formatted_user = {
                'user_id': user_info[0],
                'username': user_info[1],
                'email': user_info[2] if len(user_info) > 2 else '',
                'created_at': user_info[3] if len(user_info) > 3 else datetime.now().isoformat()
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
        if "success!" in result:
            # Get user data from database
            user_info = sql.tblGet(
                table="gen_user", 
                columns=["userID", "username", "email", "created_at"], 
                values={"username": credentials['username']}
            )
            
            if user_info:
                user_data = {
                    'id': user_info[0],
                    'username': user_info[1],
                    'email': user_info[2] if len(user_info) > 2 else '',
                    'created_at': user_info[3] if len(user_info) > 3 else datetime.now().isoformat(),
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
            columns=["userID", "username", "email", "created_at"], 
            values={"userID": user_id}
        )
        
        if user_info:
            user_data = {
                'id': user_info[0],
                'username': user_info[1],
                'email': user_info[2] if len(user_info) > 2 else '',
                'created_at': user_info[3] if len(user_info) > 3 else datetime.now().isoformat(),
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
            columns=["userID", "username", "email", "created_at"], 
            values={"userID": user_id}
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
            sql.tblUpdate(
                table="gen_user", 
                ID=["userID", user_id], 
                values=update_values
            )
        
        # Get updated user data
        updated_user_info = sql.tblGet(
            table="gen_user", 
            columns=["userID", "username", "email", "created_at"], 
            values={"userID": user_id}
        )
        
        if updated_user_info:
            user_data = {
                'id': updated_user_info[0],
                'username': updated_user_info[1],
                'email': updated_user_info[2] if len(updated_user_info) > 2 else '',
                'created_at': updated_user_info[3] if len(updated_user_info) > 3 else datetime.now().isoformat(),
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
