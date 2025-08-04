# Firestore logic handling for trainers
from app.config.firebase import db

trainers_ref = db.collection('trainers')

def create_trainer(trainer_data):
    """
    Create a new trainer in Firestore.
    :param trainer_data: Dictionary containing trainer data.
    """
    trainers_ref.document(trainer_data['email']).set(trainer_data)

def get_trainer_by_email(email):
    """
    Retrieve a trainer by email from Firestore.
    :param email: Trainer's email address.
    :return: Trainer data if found, None otherwise.
    """
    trainer_doc = trainers_ref.document(email).get()
    if trainer_doc.exists:
        return trainer_doc.to_dict()
    return None

def get_trainer_summary(email):
    """
    Fetch the trainer summary including client count and other details.
    :param email: Trainer's email address.
    :return: Dictionary with trainer summary.
    """
    trainer_doc = trainers_ref.document(email).get()
    if not trainer_doc.exists:
        return None
    
    trainer_data = trainer_doc.to_dict()
    summary = {
        "email": trainer_data.get("email"),
        "created_at": trainer_data.get("created_at"),
        "client_summary": trainer_data.get("client_summary", {}),
        "client_count": len(trainer_data.get("client_summary", [])) if trainer_data.get("client_summary") else 0
    }
    
    return summary