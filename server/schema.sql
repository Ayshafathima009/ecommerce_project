-- =======================================================
-- MERAI SIEME — PostgreSQL Database Schema
-- Target Domain: merai.sieme.in
-- Brand: SIEME DRIVE presenting MERAI
-- =======================================================

-- 1. Create Enums
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'admin', 'distributor');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE product_status AS ENUM ('available', 'out_of_stock', 'discontinued');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'verified_demo', 'completed', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(180) UNIQUE NOT NULL,
    phone VARCHAR(30),
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(180) NOT NULL,
    display_label VARCHAR(100),
    slug VARCHAR(180) UNIQUE NOT NULL,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    original_price NUMERIC(12, 2),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    status product_status DEFAULT 'out_of_stock',
    category VARCHAR(60) NOT NULL,
    ram VARCHAR(30),
    storage VARCHAR(30),
    short_description TEXT,
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    specs JSONB DEFAULT '[]'::jsonb,
    images JSONB DEFAULT '[]'::jsonb,
    aliases JSONB DEFAULT '[]'::jsonb,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    customer_name VARCHAR(120) NOT NULL,
    customer_email VARCHAR(180) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    street_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(60) DEFAULT 'India',
    subtotal NUMERIC(12, 2) NOT NULL,
    tax NUMERIC(12, 2) NOT NULL DEFAULT 0,
    shipping NUMERIC(12, 2) NOT NULL DEFAULT 0,
    total NUMERIC(12, 2) NOT NULL,
    payment_method VARCHAR(40) NOT NULL,
    payment_status payment_status DEFAULT 'pending',
    status order_status DEFAULT 'pending',
    tracking_number VARCHAR(100),
    estimated_delivery DATE,
    is_demo BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(64) REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(64) REFERENCES products(id),
    product_name VARCHAR(180) NOT NULL,
    display_label VARCHAR(100),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL,
    total_price NUMERIC(12, 2) NOT NULL,
    image_url TEXT
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- 6. Initial Seed Data
INSERT INTO products (
    id, name, display_label, slug, price, original_price, stock, status, category, ram, storage, short_description, is_featured
) VALUES
(
    'merai-car-display-daiichi',
    'MERAI Daiichi Edition Car Display',
    'Driver.MERAI',
    'merai-daiichi-car-display',
    10000.00,
    14999.00,
    200,
    'available',
    'car_display',
    '4GB',
    '64GB',
    '10.1" 2K Ultra-HD IPS Capacitive Android In-Dash Cockpit System with Wireless CarPlay & Android Auto.',
    TRUE
),
(
    'merai-airpods-pro',
    'MERAI AirPods',
    'MERAI Sonic Buds',
    'merai-airpods',
    20000.00,
    24999.00,
    0,
    'out_of_stock',
    'audio',
    NULL,
    NULL,
    'Studio-grade spatial wireless audio with 45dB hybrid Active Noise Cancellation.',
    FALSE
),
(
    'merai-smart-watch',
    'MERAI Smart Watch',
    'MERAI ChronoDrive',
    'merai-smartwatch',
    30000.00,
    36000.00,
    0,
    'out_of_stock',
    'wearable',
    NULL,
    NULL,
    'Aerospace titanium smartwatch with vehicle telemetry pairing and sapphire crystal.',
    FALSE
),
(
    'merai-ai-robot',
    'MERAI AI Robot',
    'MERAI Companion Core',
    'merai-ai-robot',
    15000.00,
    19999.00,
    0,
    'out_of_stock',
    'robotics',
    NULL,
    NULL,
    'Intelligent companion robot with expressive emotive OLED eye display and acoustic sensors.',
    FALSE
)
ON CONFLICT (id) DO NOTHING;
