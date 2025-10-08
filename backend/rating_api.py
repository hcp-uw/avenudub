from google_apis import create_service
import json
from datetime import datetime

# Rating API routes and formatting functions

def format_rating_data(rating_response):
    """
    Formats rating data from database/API response into a clean structure
    """
    formatted_ratings = []
    
    if isinstance(rating_response, list):
        ratings = rating_response
    else:
        ratings = rating_response.get('ratings', [])
    
    for rating in ratings:
        rating_data = {
            'rating_id': rating.get('id', ''),
            'place_id': rating.get('place_id', ''),
            'user_id': rating.get('user_id', ''),
            'rating_value': rating.get('rating_value', 0),  # 1-5 stars
            'review_text': rating.get('review_text', ''),
            'created_at': rating.get('created_at', ''),
            'updated_at': rating.get('updated_at', ''),
            'helpful_count': rating.get('helpful_count', 0),
            'user_name': rating.get('user_name', 'Anonymous')
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
    required_fields = ['place_id', 'user_id', 'rating_value']
    for field in required_fields:
        if field not in rating_data:
            return {'error': f'Missing required field: {field}'}, 400
    
    # Validate rating value (1-5)
    if not 1 <= rating_data['rating_value'] <= 5:
        return {'error': 'Rating must be between 1 and 5'}, 400
    
    # Add timestamps
    rating_data['created_at'] = datetime.now().isoformat()
    rating_data['updated_at'] = datetime.now().isoformat()
    
    # Here you would save to database
    # db.save_rating(rating_data)
    
    return {'message': 'Rating created successfully', 'rating_id': 'generated_id'}, 201

def get_ratings_route(place_id):
    """
    GET /api/ratings/:placeId - Get all ratings for a place
    """
    # Here you would fetch from database
    # ratings = db.get_ratings_by_place(place_id)
    
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
            'helpful_count': 5,
            'user_name': 'John Doe'
        }
    ]
    
    formatted_ratings = format_rating_data(mock_ratings)
    return {'ratings': formatted_ratings}, 200

def get_rating_summary_route(place_id):
    """
    GET /api/ratings/:placeId/summary - Get rating summary for a place
    """
    # Here you would fetch from database
    # ratings = db.get_ratings_by_place(place_id)
    
    # Mock data for example
    mock_ratings = [
        {'rating_value': 5, 'place_id': place_id},
        {'rating_value': 4, 'place_id': place_id},
        {'rating_value': 5, 'place_id': place_id},
        {'rating_value': 3, 'place_id': place_id}
    ]
    
    summary = format_place_rating_summary(place_id, mock_ratings)
    return summary, 200
