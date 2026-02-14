from flask import Blueprint, request, jsonify

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/send', methods=['POST'])
def send_message():
    data = request.json
    # Logic for sending email or saving to DB
    return jsonify({"message": "Message received", "data": data}), 200
