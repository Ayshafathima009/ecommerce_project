import hashlib
import time
from flask import Blueprint, jsonify, request

auth_bp = Blueprint('auth', __name__)

USERS_DB = [
    {
        "id": "usr-admin-01",
        "name": "SIEME Admin Operations",
        "email": "admin@sieme.in",
        "role": "admin",
        # sha256 of "Admin@2026"
        "password_hash": hashlib.sha256("Admin@2026".encode()).hexdigest()
    },
    {
        "id": "usr-customer-01",
        "name": "Rajesh Kumar",
        "email": "skr2436228@gmail.com",
        "role": "customer",
        # sha256 of "DriverMerai#2026"
        "password_hash": hashlib.sha256("DriverMerai#2026".encode()).hexdigest()
    }
]

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    hashed_pw = hashlib.sha256(password.encode()).hexdigest()
    user = next((u for u in USERS_DB if u['email'].lower() == email), None)

    if not user or user['password_hash'] != hashed_pw:
        return jsonify({"error": "Invalid email or password"}), 401

    token = f"jwt_mock_token_{user['id']}_{int(time.time())}"

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user['id'],
            "name": user['name'],
            "email": user['email'],
            "role": user['role']
        }
    }), 200

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    phone = data.get('phone', '').strip()
    password = data.get('password', '')

    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password are required"}), 400

    if any(u['email'].lower() == email for u in USERS_DB):
        return jsonify({"error": "An account with this email already exists"}), 409

    new_user = {
        "id": f"usr-{int(time.time())}",
        "name": name,
        "email": email,
        "phone": phone,
        "role": "customer",
        "password_hash": hashlib.sha256(password.encode()).hexdigest()
    }
    USERS_DB.append(new_user)

    return jsonify({
        "message": "Account registered successfully",
        "user": {
            "id": new_user['id'],
            "name": new_user['name'],
            "email": new_user['email'],
            "role": new_user['role']
        }
    }), 201
