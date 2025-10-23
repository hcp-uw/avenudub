from google_apis import create_service
import json
from datetime import datetime
import mysqlcommands as sql

# Rating API routes and formatting functions

def format_rating_data(rating_response):
    """
    Formats rating data from database/API response into a clean structure
    """
    formatted_ratings = []
    
    if isinstance(rating_response, tuple):
        ratings = rating_response
    else:
        ratings = rating_response.get('ratings', [])
    
    for rating in ratings:
        rating_data = {
            'rating_id': rating.get('rating_id', ''),
            'place_id': rating.get('place_id', ''),
            'user_id': rating.get('user_id', ''),
            'rating_val': rating.get('rating_val', ''),  # 1-5 stars
            'review_text': rating.get('review_text', ''),
            'post_time': rating.get('post_time', ''),
            'update_time': rating.get('update_time', ''),
            'upvotes': rating.get('upvotes', 0),
            'anonymous': rating.get('anonymous', '')
        }
        formatted_ratings.append(rating_data)
    
    return formatted_ratings

def format_place_rating_summary(place_id, ratings_data):
    """
    Formats rating summary for a specific place
    """
    if not ratings_data:
        return {
            'place_id': place_id,
            'average_rating': 0,
            'total_ratings': 0,
            'rating_breakdown': {
                '5_stars': 0,
                '4_stars': 0,
                '3_stars': 0,
                '2_stars': 0,
                '1_star': 0
            }
        }
    
    total_ratings = len(ratings_data)
    total_score = sum(rating['rating_value'] for rating in ratings_data)
    average_rating = total_score / total_ratings if total_ratings > 0 else 0 
    # average_rating = round(sql.columnAvg('ratings', 'rating_val', {'place_id':place_id})[0], 2)
    
    # Count ratings by star value
    rating_breakdown = {f'{i}_stars': 0 for i in range(1, 6)}
    for rating in ratings_data:
        star_count = rating['rating_value']
        rating_breakdown[f'{star_count}_stars'] += 1
    
    return {
        'place_id': place_id,
        'average_rating': round(average_rating, 2),
        'total_ratings': total_ratings,
        'rating_breakdown': rating_breakdown
    }

# Example API route handlers (would be used with Flask/FastAPI)
def create_rating_route(rating_data):
    """
    POST /api/ratings - Create a new rating
    """
    # Validate input
    required_fields = ['place_id', 'user_id', 'rating_val']
    for field in required_fields:
        if field not in rating_data:
            return {'error': f'Missing required field: {field}'}, 400
    
    # Validate rating value (1-5)
    if not 1 <= rating_data['rating_val'] <= 5:
        return {'error': 'Rating must be between 1 and 5'}, 400
    
    # Add timestamps
    rating_data['post_time'] = datetime.now().isoformat()
    rating_data['update_time'] = datetime.now().isoformat() #mysql also has an auto-timestamp feature, which to use?

    # Here you would save to database
    # dbResp = sql.tblDictInsert('ratings', rating_data)
    dbResp = sql.tblInsert('ratings', rating_data.values())
    if(dbResp.get('success') == True):
         return {'message': 'Rating created successfully', 'rating_id': 'generated_id'}, 201
    else:
        return {'error': dbResp.get('err')}, 400
    # use tblDictInsert if some columns may be null. otherwise you may use tblInsert(table, rating_data.values())
    
   
def get_ratings_route(place_id):
    """
    GET /api/ratings/:placeId - Get all ratings for a place
    """
    # Here you would fetch from database
    ratings = sql.tblGet('ratings', values={"place_id":place_id})
    # table columns matches rating_data
    
    # Mock data for example
    mock_ratings = [
        {
            'id': 'rating_1',
            'place_id': place_id,
            'user_id': 'user_1',
            'rating_value': 4,
            'review_text': 'Great food and service!',
            'created_at': '2024-01-15T10:30:00Z',
            'updated_at': '2024-01-15T10:30:00Z',
            'upvotes': 5,
            'user_name': 'John Doe'
        }
    ]
    
    formatted_ratings = format_rating_data(ratings)
    return {'ratings': formatted_ratings}, 200

def get_rating_summary_route(place_id):
    """
    GET /api/ratings/:placeId/summary - Get rating summary for a place
    """
    # Here you would fetch from database
    dbRatings = sql.tblGet('ratings', values={'place_id':place_id})
    ratings = []
    for entry in dbRatings:
        ratings.append({'rating_value':entry.get("rating_val"), 'place_id':place_id})
    
    # Mock data for example
    mock_ratings = [
        {'rating_value': 5, 'place_id': place_id},
        {'rating_value': 4, 'place_id': place_id},
        {'rating_value': 5, 'place_id': place_id},
        {'rating_value': 3, 'place_id': place_id}
    ]
    
    summary = format_place_rating_summary(place_id, ratings)
    return summary, 200

sql.connect("avenudub", input("Admin Password: "))
# print(get_rating_summary_route(0))
# print(get_ratings_route(0))
mock_rating = {
            'rating_id': 5,
            'place_id': 0,
            'user_id': 1015,
            'rating_val': 4,
            'review_text': 'Great food and service!',
            'post_time': 'DEFAULT',
            'update_time': None,
            'upvotes': 5,
            'anonymous': True}
print(create_rating_route(mock_rating))