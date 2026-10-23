from flask import Blueprint, jsonify, request
from routes.order_routes import ORDERS_DB
from services.email_service import send_dispatch_notification

distributor_bp = Blueprint('distributor', __name__)

@distributor_bp.route('/orders', methods=['GET'])
def get_distributor_orders():
    # Returns formatted list with customer details, quantities, and totals
    manifest = []
    for o in ORDERS_DB:
        manifest.append({
            "orderId": o.get('id'),
            "customerName": o.get('customer', {}).get('fullName'),
            "customerEmail": o.get('customer', {}).get('email'),
            "customerPhone": o.get('customer', {}).get('phone'),
            "products": [f"{i.get('productName')} (Qty: {i.get('quantity')})" for i in o.get('items', [])],
            "totalQuantity": sum(i.get('quantity', 0) for i in o.get('items', [])),
            "orderAmount": o.get('total'),
            "orderDate": o.get('createdAt'),
            "orderStatus": o.get('status'),
            "trackingNumber": o.get('trackingNumber')
        })

    return jsonify({"orders": manifest, "count": len(manifest)}), 200

@distributor_bp.route('/notify', methods=['POST'])
def trigger_notification():
    data = request.get_json() or {}
    order_id = data.get('orderId')
    email = data.get('email')

    if not order_id or not email:
        return jsonify({"error": "orderId and email are required"}), 400

    order = next((o for o in ORDERS_DB if o['id'] == order_id), None)
    tracking = order.get('trackingNumber', 'SIEME-EXP-PENDING') if order else 'SIEME-EXP-PENDING'

    result = send_dispatch_notification(email, order_id, tracking)
    return jsonify(result), 200
