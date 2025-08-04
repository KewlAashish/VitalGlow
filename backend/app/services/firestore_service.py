import os
from google.cloud import firestore

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = 'firebase-key.json'

db = firestore.Client()
users_ref = db.collection('users')

def create_user(user_data): 
    """
    Create a new user in Firestore.
    :param user_data: Dictionary containing user data.
    """
    users_ref.document(user_data['email']).set(user_data)

def get_user_by_email(email):
    """
    Retrieve a user by email from Firestore.
    :param email: User's email address.
    :return: User data if found, None otherwise.
    """
    user_doc = users_ref.document(email).get()
    if user_doc.exists:
        return user_doc.to_dict()
    return None