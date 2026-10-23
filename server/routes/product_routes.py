from flask import Blueprint, jsonify, request

product_bp = Blueprint('products', __name__)

# Master in-memory product catalogue for development fallback
PRODUCTS_DB = [
    {
        "id": "merai-car-display-daiichi",
        "name": "MERAI Daiichi Edition Car Display",
        "displayLabel": "Driver.MERAI",
        "slug": "merai-daiichi-car-display",
        "price": 10000.0,
        "originalPrice": 14999.0,
        "stock": 200,
        "status": "available",
        "category": "car_display",
        "ram": "4GB",
        "storage": "64GB",
        "shortDescription": "10.1\" 2K Ultra-HD IPS Capacitive Android In-Dash Cockpit System with Wireless CarPlay & Android Auto.",
        "rating": 4.9,
        "reviewCount": 382,
        "aliases": [
            "MERAI Driver",
            "Driver.MERAI",
            "Car Display",
            "Car Screen",
            "Android Display",
            "Dash Display",
            "Daiichi Edition"
        ],
        "isFeatured": True
    },
    {
        "id": "merai-airpods-pro",
        "name": "MERAI AirPods",
        "displayLabel": "MERAI Sonic Buds",
        "slug": "merai-airpods",
        "price": 20000.0,
        "originalPrice": 24999.0,
        "stock": 100,
        "status": "out_of_stock",
        "category": "audio",
        "shortDescription": "Studio-grade spatial wireless audio with 45dB hybrid Active Noise Cancellation.",
        "rating": 4.8,
        "reviewCount": 94,
        "aliases": ["airpods", "earbuds", "merai airpods"],
        "isFeatured": False
    },
    {
        "id": "merai-smart-watch",
        "name": "MERAI Smart Watch",
        "displayLabel": "MERAI ChronoDrive",
        "slug": "merai-smartwatch",
        "price": 30000.0,
        "originalPrice": 36000.0,
        "stock": 0,
        "status": "out_of_stock",
        "category": "wearable",
        "shortDescription": "Aerospace titanium smartwatch with vehicle telemetry pairing and sapphire crystal.",
        "rating": 4.9,
        "reviewCount": 112,
        "aliases": ["smart watch", "watch", "merai watch", "chronodrive"],
        "isFeatured": False
    },
    {
        "id": "merai-ai-robot",
        "name": "MERAI AI Robot",
        "displayLabel": "MERAI Companion Core",
        "slug": "merai-ai-robot",
        "price": 15000.0,
        "originalPrice": 19999.0,
        "stock": 0,
        "status": "out_of_stock",
        "category": "robotics",
        "shortDescription": "Intelligent companion robot with expressive emotive OLED eye display and acoustic sensors.",
        "rating": 4.7,
        "reviewCount": 46,
        "aliases": ["ai robot", "robot", "companion", "aurora"],
        "isFeatured": False
    }
]

@product_bp.route('', methods=['GET'])
def get_products():
    category = request.args.get('category')
    search_q = request.args.get('q', '').lower().strip()

    filtered = PRODUCTS_DB

    if category:
        filtered = [p for p in filtered if p['category'] == category]

    if search_q:
        filtered = [
            p for p in filtered
            if search_q in p['name'].lower()
            or (p.get('displayLabel') and search_q in p['displayLabel'].lower())
            or any(search_q in alias.lower() for alias in p.get('aliases', []))
        ]

    return jsonify({"products": filtered, "count": len(filtered)}), 200

@product_bp.route('/<product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in PRODUCTS_DB if p['id'] == product_id or p['slug'] == product_id), None)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product), 200
