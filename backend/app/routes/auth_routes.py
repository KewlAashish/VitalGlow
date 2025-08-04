from flask import Blueprint, request, jsonify
from app.utils.password_utils import hash_password, verify_password
from datetime import datetime
from app.models.trainer_model import create_trainer, get_trainer_by_email

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data=request.json
    email = data.get('email')
    password = data.get('password')

    if get_trainer_by_email(email):
        return jsonify({"error": "Email already registered"}), 400
    
    password_hash = hash_password(password)

    trainer_data = {
        "email": email,
        "password_hash": password_hash,
        "created_at": datetime.utcnow().isoformat()
    }

    create_trainer(trainer_data)
    return jsonify({"message": "Signup Successful"}), 201

@auth_bp.route('/test')
def test():
    return jsonify({"message": "Test endpoint is working"}), 200

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = get_trainer_by_email(email)
    if not user or not verify_password(password, user['password_hash']):
        return jsonify({"error": "Invalid email or password"}), 401
    
    return jsonify({"message": "Login Successful", "user": {"email": user['email']}}), 200