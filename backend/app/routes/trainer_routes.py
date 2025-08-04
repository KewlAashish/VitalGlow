from flask import Blueprint, request, jsonify
from app.models.trainer_model import get_trainer_summary
from app.models.client_model import create_client, get_client_sumamry, update_client_info, delete_client_info

trainer_bp = Blueprint('trainer', __name__)

# Fetching the trainer summary (Includes a client summary as well for rendering the trainer dashboard) and other trainer details
@trainer_bp.route('/summary/<email>', methods=['GET'])
def fetch_trainer_summary(email):
    """
    Fetch the trainer summary including client count and other details.
    :param email: Trainer's email address.
    :return: JSON response with trainer summary.
    """
    # Placeholder for actual logic to fetch trainer summary
    # This should include fetching client count and other relevant data
    
    summary = get_trainer_summary(email)

    response = {}

    if not summary:
        response["status"] = "error"
        response["message"] = "Trainer not found"
        return jsonify(response), 404

    response["status"] = "success"
    response["data"] = summary
    response["message"] = "Trainer summary fetched successfully"

    return jsonify(response), 200


# Fetching a specific client by ID
@trainer_bp.route('/client/<client_id>', methods=['GET'])
def get_client(client_id):
    """
    Fetch a specific client by ID.
    :param client_id: Client's unique identifier.
    :return: JSON response with client details.
    """
    # Placeholder for actual logic to fetch client details
    # This should query the database for the client with the given ID
    response = {}
    client_data = get_client_sumamry(client_id)  # Function to get client summary exists

    if not client_data:
        response["status"] = "error"
        response["message"] = "Client not found"
        return jsonify(response), 404

    response["status"] = "success"
    response["data"] = client_data  
    response["message"] = "Client details fetched successfully"
    return jsonify(response), 200

# Adding a new client
@trainer_bp.route('/client', methods=['POST'])
def add_client():
    """
    Add a new client.
    :return: JSON response confirming client addition.
    """
    data = request.json
    # Placeholder for actual logic to add a new client
    # This should validate the data and save it to the database
    required_fields = ["trainer_email", "name", "age", "goal", "email", "height_cm", "weight_kg", "gender"]
    missing_fields = [field for field in required_fields if field not in data]

    response = {}

    if missing_fields:
        response["status"] = "error"
        response["message"] = f"Missing fields: {', '.join(missing_fields)}"
        return jsonify(response), 400
    
    try:
        client_record = create_client(data, data["trainer_email"])
        response["status"] = "success"
        response["message"] = "Client added successfully"
        response["data"] = client_record
        return jsonify(response), 201
    except Exception as e:
        response["status"] = "error"
        response["message"] = str(e)
        return jsonify(response), 500


# Updating an existing client
@trainer_bp.route('/client/<client_id>', methods=['PUT'])
def update_client(client_id):
    """
    Update an existing client.
    :param client_id: Client's unique identifier.
    :return: JSON response confirming client update.
    """
    data = request.json
    response = {}
    # Placeholder for actual logic to update client details
    # This should validate the data and update the database record
    required_fields = ["trainer_email", "name", "age", "goal", "email", "height_cm", "weight_kg", "gender"]
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        response["status"] = "error"
        response["message"] = f"Missing fields: {', '.join(missing_fields)}"
        return jsonify(response), 400
    
    updated_data = {
        "client_id": client_id,
        "trainer_email": data.get("trainer_email"),
        "name": data.get("name"),
        "age": data.get("age"),
        "goal": data.get("goal"),
        "email": data.get("email"),
        "height_cm": data.get("height_cm"),
        "weight_kg": data.get("weight_kg"),
        "gender": data.get("gender"),
    }
    
    update_client = update_client_info(client_id, updated_data)

    if not update_client:
        response["status"] = "error"
        response["message"] = "Client not found or update failed"
        return jsonify(response), 404
    
    response["status"] = "success"
    response["message"] = "Client updated successfully" 
    response["data"] = { **update_client, "id": client_id }
    return jsonify(response), 200

# Deleting a client
@trainer_bp.route('/client/<client_id>', methods=['DELETE'])
def delete_client(client_id):
    """
    Delete a client.
    :param client_id: Client's unique identifier.
    :return: JSON response confirming client deletion.
    """
    # Placeholder for actual logic to delete a client
    # This should remove the client from the database
    response = {}
    client_data = get_client_sumamry(client_id)
    if not client_data:
        response["status"] = "error"
        response["message"] = "Client not found"
        return jsonify(response), 404
    
    # Assuming a function delete_client exists to handle deletion
    result = delete_client_info(client_id)  # This function should be implemented to handle deletion logic

    if not result:
        response["status"] = "error"
        response["message"] = "Failed to delete client"
        return jsonify(response), 400

    response["status"] = "success"
    response["message"] = "Client deleted successfully" 
    response["data"] = {"client_id": client_id}
    return jsonify(response), 200