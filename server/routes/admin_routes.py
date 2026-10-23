from flask import Blueprint, jsonify, request
from routes.product_routes import PRODUCTS_DB
from routes.order_routes import ORDERS_DB
from routes.auth_routes import USERS_DB

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/stats', methods=['GET'])
def get_stats():
    total_orders = len(ORDERS_DB)
    total_revenue = sum(o.get('total', 0) for o in ORDERS_DB)
    total_customers = len([u for u in USERS_DB if u.get('role') == 'customer'])
    available_skus = len([p for p in PRODUCTS_DB if p.get('stock', 0) > 0 and p.get('status') == 'available'])
    out_of_stock_skus = len([p for p in PRODUCTS_DB if p.get('stock', 0) == 0 or p.get('status') == 'out_of_stock'])

    return jsonify({
        "totalOrders": total_orders,
        "totalRevenue": total_revenue,
        "totalCustomers": total_customers,
        "availableSkus": available_skus,
        "outOfStockSkus": out_of_stock_skus
    }), 200

@admin_bp.route('/products/<product_id>/stock', methods=['PATCH'])
def update_stock(product_id):
    data = request.get_json() or {}
    new_stock = data.get('stock')

    if new_stock is None or new_stock < 0:
        return jsonify({"error": "Valid non-negative stock count is required"}), 400

    product = next((p for p in PRODUCTS_DB if p['id'] == product_id), None)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    product['stock'] = int(new_stock)
    product['status'] = 'available' if product['stock'] > 0 else 'out_of_stock'

    return jsonify({
        "message": f"Stock updated to {product['stock']} units",
        "product": product
    }), 200

@admin_bp.route('/products/<product_id>/price', methods=['PATCH'])
def update_price(product_id):
    data = request.get_json() or {}
    new_price = data.get('price')

    if not new_price or new_price <= 0:
        return jsonify({"error": "Valid positive price is required"}), 400

    product = next((p for p in PRODUCTS_DB if p['id'] == product_id), None)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    product['price'] = float(new_price)

    return jsonify({
        "message": f"Price updated to ₹{product['price']}",
        "product": product
    }), 200

@admin_bp.route('/orders/<order_id>/status', methods=['PATCH'])
def update_order_status(order_id):
    data = request.get_json() or {}
    status = data.get('status')

    valid_statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']
    if status not in valid_statuses:
        return jsonify({"error": f"Invalid status. Must be one of {valid_statuses}"}), 400

    order = next((o for o in ORDERS_DB if o['id'] == order_id), None)
    if not order:
        return jsonify({"error": "Order not found"}), 404

    order['status'] = status
    return jsonify({
        "message": f"Order {order_id} status updated to {status}",
        "order": order
    }), 200
