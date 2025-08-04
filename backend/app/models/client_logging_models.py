from app.config.firebase import db
from datetime import datetime, timedelta


client_logging_ref = db.collection('client_logging')

def get_start_end_of_the_week(date_obj):
    """
    Get the start (Monday) and end (Sunday) dates of the week for a given date.
    :param date_obj: Date object for which to find the week range.
    :return: Tuple containing start and end dates of the week.
    """
    start_of_week = date_obj - timedelta(days=date_obj.weekday())  # Monday
    end_of_week = start_of_week + timedelta(days=6)  # Sunday
    return start_of_week, end_of_week


def get_logs_for_week(client_id, date):
    """
    Fetch the logs of a specific week based on the date provided and client id.
    :param client_id: Client's unique identifier.
    :param date: Date string in 'YYYY-MM-DD' format.
    :return: List of logs for the week.
    """
    date_obj = datetime.strptime(date, '%Y-%m-%d')
    start_of_week, end_of_week = get_start_end_of_the_week(date_obj)

    logs = []

    for i in range(7):
        current_date = start_of_week + timedelta(days=i)
        doc_id = f"{client_id}_{current_date.strftime('%Y-%m-%d')}"
        doc = client_logging_ref.document(doc_id).get()

        if doc.exists:
            logs.append({
                "date": current_date.strftime('%Y-%m-%d'),
                "data": doc.to_dict()
            })
        else:
            logs.append({
                "date": current_date.strftime('%Y-%m-%d'),
                "data": {
                    "client_id": client_id,
                    "date": current_date.strftime('%Y-%m-%d'),
                    "training_logs": [],
                    "nutrition_logs": [],
                    "weight_kg": None,
                }
            })

    return logs

def save_or_update_logs(client_id, date_str, data):
    """
    Save or update the workout/diet logs of a specific client for a specific date.
    :param client_id: Client's unique identifier.
    :param date_str: Date string in 'YYYY-MM-DD' format.
    :param data: Dictionary containing the logs to be saved or updated.
    :return: JSON response confirming the operation.
    """
    doc_id = f"{client_id}_{date_str}"
    doc_ref = client_logging_ref.document(doc_id)

    # Default structure for the log entry 
    updated_data = {
        "client_id": client_id,
        "date": date_str,
        "last_updated": datetime.utcnow().isoformat(),
    }

    if "training_logs" in data:
        updated_data["training_logs"] = data["training_logs"]

    if "nutrition_logs" in data:
        updated_data["nutrition_logs"] = data["nutrition_logs"]

    if "weight_kg" in data:
        updated_data["weight_kg"] = data["weight_kg"]

    doc_ref.set(updated_data, merge=True)

    return updated_data