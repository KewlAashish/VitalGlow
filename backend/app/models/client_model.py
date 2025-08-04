from app.config.firebase import db
from google.cloud.firestore import DELETE_FIELD
from datetime import datetime
import uuid 

clients_ref = db.collection('clients')
trainers_ref = db.collection('trainers')

def create_client(client_data, trainer_email):
    """
    Create a new client in Firestore.
    :param client_data: Dictionary containing client data.
    :param trainer_email: Email of the trainer associated with the client.
    """
    client_id = str(uuid.uuid4())  # Generate a unique client ID

    # Full client document to add in 'clients' collection
    client_record = {
        "client_id": client_id,
        "trainer_email": trainer_email,
        "name": client_data.get("name"),
        "age": client_data.get("age"),
        "goal": client_data.get("goal"),
        "email": client_data.get("email"),
        "height_cm": client_data.get("height_cm"),
        "weight_kg": client_data.get("weight_kg"),
        "gender": client_data.get("gender"),
        "created_at": datetime.utcnow().isoformat(),
        "last_updated": datetime.utcnow().isoformat()
    }

    # Add client to the 'clients' collection
    clients_ref.document(client_id).set(client_record)

    # Updating the trainer's summary with the new client
    summary_entry = {
        "name": client_data.get("name"),
        "age": client_data.get("age"),  
        "goal": client_data.get("goal"),
        "email": client_data.get("email"),
        "height_cm": client_data.get("height_cm"),
        "weight_kg": client_data.get("weight_kg"),
        "gender": client_data.get("gender")
    }

    trainer_doc = trainers_ref.document(trainer_email)
    trainer_doc.set({
        "client_summary": {client_id: summary_entry}
    }, merge=True)  # We are not overwriting the entire document, just merging the new client summary

    return {**client_record, "id": client_id}


def get_client_sumamry(client_id):
    """
    Fetch a specific client's summary by ID.
    :param client_id: Client's unique identifier.
    :return: Dictionary with client summary if found, None otherwise.
    """
    client_doc = clients_ref.document(client_id).get()
    if not client_doc.exists:
        return None
    
    return client_doc.to_dict()

def update_client_info(client_id, update_data):
    """
    Update an existing client's Firestore record and trainer's client_summary.
    """
    client_ref = clients_ref.document(client_id)
    client_doc = client_ref.get()

    if not client_doc.exists:
        return None

    original = client_doc.to_dict()
    trainer_email = original.get("trainer_email")

    # Sanity check: prevent changing trainer_email
    if update_data.get("trainer_email") != trainer_email:
        raise ValueError("Trainer email does not match client ownership.")

    # Add last_updated timestamp
    update_data["last_updated"] = datetime.utcnow().isoformat()

    # Update full client record
    client_ref.update(update_data)

    # Prepare clean summary data
    summary_entry = {
        "name": update_data["name"],
        "age": update_data["age"],
        "goal": update_data["goal"],
        "email": update_data["email"],
        "height_cm": update_data["height_cm"],
        "weight_kg": update_data["weight_kg"],
        "gender": update_data["gender"]
    }

    # Update the trainer's client_summary
    trainer_ref = trainers_ref.document(trainer_email)
    trainer_ref.set({
        "client_summary": {
            client_id: summary_entry
        }
    }, merge=True)

    return {**original, **update_data}

def delete_client_info(client_id):
    """
    Delete a client from Firestore.
    :param client_id: Client's unique identifier.
    :return: JSON response confirming client deletion.
    """
    client_ref = clients_ref.document(client_id)
    client_doc = client_ref.get()

    if not client_doc.exists:
        return None  # Client not found

    # Delete the client document
    client_ref.delete()

    # Remove the client from the trainer's summary
    trainer_email = client_doc.to_dict().get("trainer_email")
    trainer_ref = trainers_ref.document(trainer_email)
    
    if trainer_ref.get().exists:
        trainer_ref.set({
            "client_summary": {client_id: DELETE_FIELD}
        }, merge=True)  # Set to None to remove the entry

    return {"message": "Client deleted successfully", "client_id": client_id}