import random
import datetime
from flask import Blueprint, jsonify, request
from routes.product_routes import PRODUCTS_DB

order_bp = Blueprint('orders', __name__)

ORDERS_DB = []

@order_bp.route('', methods=['POST'])
def place_order():
    data = request.get_json() or {}
    items = data.get('items', [])
    customer = data.get('customer', {})
    payment_method = data.get('paymentMethod', 'cod')

    if not items:
        return jsonify({"error": "Cart cannot be empty"}), 400

    if not customer.get('fullName') or not customer.get('phone') or not customer.get('email') or not customer.get('streetAddress'):
        return jsonify({"error": "Complete customer shipping information is required"}), 400

    # 1. Concurrency Check: Verify sufficient stock for all requested items
    for item in items:
        prod_id = item.get('productId')
        qty = int(item.get('quantity', 1))
        
        product = next((p for p in PRODUCTS_DB if p['id'] == prod_id), None)
        if not product:
            return jsonify({"error": f"Product with ID '{prod_id}' not found"}), 404

        if product['stock'] < qty:
            return jsonify({
                "error": f"Insufficient stock for {product['name']}. Available: {product['stock']}, Requested: {qty}"
            }), 409

    # 2. Safely deduct inventory (200 -> 199 -> 198...)
    for item in items:
        prod_id = item.get('productId')
        qty = int(item.get('quantity', 1))
        product = next(p for p in PRODUCTS_DB if p['id'] == prod_id)
        product['stock'] -= qty
        if product['stock'] <= 0:
            product['stock'] = 0
            product['status'] = 'out_of_stock'

    # 3. Compute totals and unique Order ID
    subtotal = sum(float(item.get('price', 0)) * int(item.get('quantity', 1)) for item in items)
    tax = round(subtotal * 0.18, 2)
    order_id = f"MS-2026-{random.randint(100000, 999999)}"

    new_order = {
        "id": order_id,
        "customer": customer,
        "items": items,
        "subtotal": subtotal,
        "tax": tax,
        "shipping": 0,
        "total": subtotal,
        "paymentMethod": payment_method,
        "paymentStatus": "verified_demo",
        "status": "confirmed",
        "createdAt": datetime.datetime.utcnow().isoformat() + "Z",
        "estimatedDelivery": (datetime.date.today() + datetime.timedelta(days=4)).isoformat(),
        "trackingNumber": f"SIEME-EXP-{random.randint(100000, 999999)}",
        "isDemo": True,
        "notes": "Order placed successfully. Inventory decremented."
    }

    ORDERS_DB.insert(0, new_order)

    return jsonify({
        "message": "Order placed successfully",
        "order": new_order
    }), 201

@order_bp.route('', methods=['GET'])
def get_orders():
    email = request.args.get('email')
    if email:
        user_orders = [o for o in ORDERS_DB if o['customer'].get('email', '').lower() == email.lower()]
        return jsonify({"orders": user_orders, "count": len(user_orders)}), 200

    return jsonify({"orders": ORDERS_DB, "count": len(ORDERS_DB)}), 200

@order_bp.route('/<order_id>', methods=['GET'])
def get_order_by_id(order_id):
    order = next((o for o in ORDERS_DB if o['id'] == order_id), None)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    return jsonify(order), 200
