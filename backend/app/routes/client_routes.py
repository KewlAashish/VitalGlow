from flask import Blueprint, request, jsonify
from app.models.client_logging_models import get_logs_for_week, save_or_update_logs

client_bp = Blueprint('client', __name__)

# Fetch the logs of a specific week based on the date provided and client id
# Based on the date provided I find the week for the date (Monday to Sunady) in which the date falls
@client_bp.route('/logs/<client_id>/<date>', methods=['GET'])
def get_client_weekly_logs(client_id, date):
    """
    Fetch the logs of a specific week based on the date provided and client id.
    :param client_id: Client's unique identifier.
    :param date: Date string in 'YYYY-MM-DD' format.
    :return: JSON response with weekly logs.
    """
    # Placeholder for actual logic to fetch weekly logs
    # This should query the database for the logs of the week containing the given date for the specified client
    response = {}
    
    if not client_id or not date:
        response["status"] = "error"
        response["message"] = "Client ID and date are required"
        return jsonify(response), 400
    
    try:
        logs = get_logs_for_week(client_id, date)  # Function to get weekly logs exists
        response["status"] = "success"
        response["data"] = logs 
        response["message"] = "Weekly logs fetched successfully"
        return jsonify(response), 200
    except Exception as e:
        response["status"] = "error"
        response["message"] = str(e)
        return jsonify(response), 500


# Saving/Updating the workout/diet (training) logs of a specific client for a specific date
@client_bp.route('/daily/logs/<client_id>/<date>', methods=['POST'])
def save_daily_logs(client_id, date):
    """
    Save or update the workout/diet logs of a specific client for a specific date.
    :param client_id: Client's unique identifier.
    :param date: Date string in 'YYYY-MM-DD' format.
    :return: JSON response confirming the operation.
    """
    data = request.json
    # Placeholder for actual logic to save or update logs
    # This should validate the data and save it to the database
    response = {}
    
    if not client_id or not date:
        response["status"] = "error"
        response["message"] = "Client ID and date are required"
        return jsonify(response), 400
    
    try:
        updated_log = save_or_update_logs(client_id, date, data)  # Function to save or update logs exists
        response["status"] = "success"
        response["message"] = "Logs saved/updated successfully"
        response["data"] = updated_log
        return jsonify(response), 200
    except Exception as e:
        response["status"] = "error"
        response["message"] = str(e)
        return jsonify(response), 500