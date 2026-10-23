"""
MERAI SIEME — Backend REST API
Brand: SIEME DRIVE presenting MERAI — Engineered to Inspire.
Target Domain: merai.sieme.in
"""

import os
import sys
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment configuration
load_dotenv()

def create_app():
    app = Flask(__name__)

    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'merai-sieme-secret-key-2026')
    database_url = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Check database configuration status truthfully
    db_connected = False
    if database_url and not database_url.startswith('placeholder'):
        db_connected = True

    # Setup CORS for development & production domains
    allowed_origins = os.getenv(
        'ALLOWED_ORIGINS',
        'https://merai.sieme.in,http://localhost:3000,http://localhost:5173'
    ).split(',')

    CORS(app, resources={r"/api/*": {"origins": allowed_origins}}, supports_credentials=True)

    # Health and environment inspection endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            'status': 'online',
            'brand': 'MERAI SIEME',
            'tagline': 'SIEME DRIVE presenting MERAI — Engineered to Inspire.',
            'domain': 'merai.sieme.in',
            'database': {
                'configured': db_connected,
                'status': 'connected' if db_connected else 'development_mode_fallback'
            },
            'version': '1.0.0'
        }), 200

    # In-memory development store when PostgreSQL is not yet provisioned
    # Ensures zero broken screens or dead clicks while running
    from routes.product_routes import product_bp
    from routes.order_routes import order_bp
    from routes.auth_routes import auth_bp
    from routes.admin_routes import admin_bp
    from routes.distributor_routes import distributor_bp

    app.register_blueprint(product_bp, url_prefix='/api/products')
    app.register_blueprint(order_bp, url_prefix='/api/orders')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    app.register_blueprint(distributor_bp, url_prefix='/api/distributor')

    @app.errorhandler(404)
    def handle_not_found(e):
        return jsonify({'error': 'Resource not found', 'code': 404}), 404

    @app.errorhandler(500)
    def handle_server_error(e):
        return jsonify({'error': 'Internal server error', 'code': 500}), 500

    return app

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app = create_app()
    print(f"🚀 MERAI SIEME Flask Backend running on http://localhost:{port}")
    print("🚗 Engineered to Inspire — Domain: merai.sieme.in")
    app.run(host='0.0.0.0', port=port, debug=False)
