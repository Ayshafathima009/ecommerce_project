import { Product, Order, User } from '../types';
import { IMAGES } from '../assets/images';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'merai-car-display-daiichi',
    name: 'MERAI Daiichi Edition Car Display',
    displayLabel: 'Driver.MERAI',
    slug: 'merai-daiichi-car-display',
    price: 10000,
    originalPrice: 14999,
    stock: 200,
    status: 'available',
    category: 'car_display',
    ram: '4GB',
    storage: '64GB',
    shortDescription: '10.1" 2K Ultra-HD IPS Capacitive Android In-Dash Cockpit System with Wireless CarPlay & Android Auto.',
    description: 'Engineered specifically for discerning drivers, the MERAI Daiichi Edition Car Display transforms your vehicle cockpit into an intelligent digital command center. Featuring high-speed 4GB LPDDR4 RAM, 64GB automotive-grade flash storage, real-time CANBUS OBD-II telemetry, 48-band DSP studio audio equalizer, and instant wireless smartphone projection. Powered by SIEME DRIVE automotive intelligence.',
    features: [
      '10.1" 2K (1920×1200) IPS Anti-Reflective Optical Bonding Touchscreen with 850 nits sunlight visibility',
      'High-Speed 4GB RAM + 64GB High-Endurance eMMC 5.1 Flash Storage',
      'Wireless Apple CarPlay & Wireless Android Auto with 5GHz high-throughput WiFi direct link',
      'Built-in 48-Band DSP (Digital Sound Processor) with Subwoofer Pre-out & Time Alignment',
      'Dual-Zone AHD 1080p Starlight Night-Vision Reverse & Front Camera inputs with dynamic steering trajectory',
      'Universal OEM Harness Compatibility & Steering Wheel Controls (SWC) support without wire cutting',
      'Quad-Satellite GNSS Navigation (GPS, GLONASS, Galileo, BeiDou) with offline maps pre-loaded',
      'Automotive-grade thermal dissipation shield certified for -20°C to +75°C extreme cabin temperatures'
    ],
    specs: [
      { label: 'Display Size & Resolution', value: '10.1-inch IPS 2K (1920 × 1200), 178° viewing angle' },
      { label: 'Processor (SoC)', value: 'Octa-Core 2.0 GHz 64-bit Automotive SoC' },
      { label: 'Memory (RAM)', value: '4GB High-Speed LPDDR4' },
      { label: 'Internal Storage', value: '64GB High-Endurance Flash (Expandable via Dual USB)' },
      { label: 'Operating System', value: 'Android 13 Automotive Edition with Driver.MERAI UI' },
      { label: 'Phone Connectivity', value: 'Wireless Apple CarPlay & Android Auto' },
      { label: 'Audio Hardware', value: '4 × 50W MOSFET Amplifier with 48-Band DSP EQ' },
      { label: 'Wireless Connectivity', value: 'Dual-Band 2.4/5GHz Wi-Fi, Bluetooth 5.2 AptX HD' },
      { label: 'Vehicle Integration', value: 'CANBUS Engine Telemetry, TPMS & Steering Controls' },
      { label: 'Power Input', value: 'DC 12V – 14.4V with smart battery drain cutoff' },
      { label: 'Warranty', value: '2-Year Direct Replacement Warranty by SIEME DRIVE' }
    ],
    images: [
      IMAGES.carDisplayStand,
      IMAGES.carDisplayDash,
      IMAGES.carDisplayBox,
    ],
    rating: 4.9,
    reviewCount: 382,
    aliases: [
      'MERAI Driver',
      'Driver.MERAI',
      'Car Display',
      'Car Screen',
      'Android Display',
      'Dash Display',
      'Daiichi Edition',
      'daiichi',
      'car screen 10 inch',
      'infotainment',
      'car stereo',
      'touchscreen'
    ],
    isFeatured: true
  },
  {
    id: 'merai-airpods-pro',
    name: 'MERAI AirPods',
    displayLabel: 'MERAI Sonic Buds',
    slug: 'merai-airpods',
    price: 20000,
    originalPrice: 24999,
    stock: 0,
    status: 'out_of_stock',
    category: 'audio',
    shortDescription: 'Studio-grade spatial wireless audio with 45dB hybrid Active Noise Cancellation and automotive acoustic tuning.',
    description: 'Precision engineered acoustic drivers with titanium diaphragms, ultra-low 28ms latency mode for in-cabin entertainment, and aerospace aluminum magnetic charging case.',
    features: [
      '45dB Adaptive Active Noise Cancellation with Transparency Mode',
      'Custom 11mm Titanium Dynamic Driver calibrated by SIEME sound engineers',
      '40-Hour Total Battery Life with fast wireless Qi charging',
      'IPX5 sweat and water resistance for all-weather durability'
    ],
    specs: [
      { label: 'Acoustic Driver', value: '11mm Titanium Composite Diaphragm' },
      { label: 'Noise Cancellation', value: 'Up to 45dB Hybrid ANC' },
      { label: 'Battery Life', value: '8.5h earbuds + 32h charging case' },
      { label: 'Bluetooth', value: 'Bluetooth 5.4 with LDAC & LC3 codec support' }
    ],
    images: [
      IMAGES.airpods
    ],
    rating: 4.8,
    reviewCount: 94,
    aliases: ['airpods', 'earbuds', 'merai airpods', 'sonic buds', 'wireless earphones', 'headphones'],
    isFeatured: false
  },
  {
    id: 'merai-smart-watch',
    name: 'MERAI Smart Watch',
    displayLabel: 'MERAI ChronoDrive',
    slug: 'merai-smartwatch',
    price: 30000,
    originalPrice: 36000,
    stock: 0,
    status: 'out_of_stock',
    category: 'wearable',
    shortDescription: 'Aerospace titanium smartwatch with vehicle telemetry pairing, tachometer watch faces, and sapphire crystal.',
    description: 'Connect directly to your MERAI Daiichi Car Display from your wrist. Monitor vehicle tire pressures, fuel level, GPS location, and lock/unlock triggers in real time.',
    features: [
      'Grade 5 Aerospace Titanium Bezel with Scratch-Proof Sapphire Glass',
      '1.43" AMOLED 1000 nits Always-On Display with 60Hz smooth refresh rate',
      'Exclusive CANBUS Vehicle Link syncs with Driver.MERAI Car Display',
      '14-Day Battery Life on a single magnetic rapid charge'
    ],
    specs: [
      { label: 'Case Material', value: 'Grade 5 Brushed Titanium & Ceramic Back' },
      { label: 'Display', value: '1.43-inch AMOLED (466 × 466), 326 ppi' },
      { label: 'Sensors', value: 'Optical Heart Rate, SpO2, Dual-band GPS, Compass' },
      { label: 'Water Resistance', value: '5 ATM (50 meters) Marine grade' }
    ],
    images: [
      IMAGES.smartwatch
    ],
    rating: 4.9,
    reviewCount: 112,
    aliases: ['smart watch', 'watch', 'merai watch', 'chronodrive', 'fitness tracker', 'smartwatch'],
    isFeatured: false
  },
  {
    id: 'merai-ai-robot',
    name: 'MERAI AI Robot',
    displayLabel: 'MERAI Companion Core',
    slug: 'merai-ai-robot',
    price: 15000,
    originalPrice: 19999,
    stock: 0,
    status: 'out_of_stock',
    category: 'robotics',
    shortDescription: 'Intelligent desktop & dashboard companion robot with expressive emotive OLED eye display and acoustic sensors.',
    description: 'Your intelligent driving companion. Features real-time voice interaction, navigation prompts, vehicle diagnostics warnings, and personalized cabin climate coordination.',
    features: [
      'Dual Emotive OLED Visor with 60+ expressive dynamic character moods',
      'Quad-Microphone Array with 360° Far-Field Acoustic Noise Cancellation',
      'Direct Bluetooth & WiFi link to MERAI Daiichi car system',
      'Integrated edge-AI neural processor for offline voice commands'
    ],
    specs: [
      { label: 'Display Visor', value: 'Dual Curved Micro-OLED Character Panel' },
      { label: 'Voice Processor', value: 'Quad-Core NPU Neural Audio Engine' },
      { label: 'Sensors', value: 'ToF Proximity Sensor, 6-Axis IMU, Ambient Light' },
      { label: 'Power', value: 'Built-in 3200mAh Li-ion battery + USB-C fast charging' }
    ],
    images: [
      IMAGES.aiRobot
    ],
    rating: 4.7,
    reviewCount: 46,
    aliases: ['ai robot', 'robot', 'companion', 'merai robot', 'aurora', 'desktop robot'],
    isFeatured: false
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'MS-2026-904128',
    customer: {
      fullName: 'Vikram Malhotra',
      phone: '+91 98201 44521',
      email: 'vikram.m@domain.in',
      streetAddress: 'Flat 402, Signature Towers, MG Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560001',
      country: 'India'
    },
    items: [
      {
        productId: 'merai-car-display-daiichi',
        productName: 'MERAI Daiichi Edition Car Display (Driver.MERAI)',
        displayLabel: 'Driver.MERAI (4GB / 64GB)',
        price: 10000,
        quantity: 1,
        image: IMAGES.carDisplayStand
      }
    ],
    subtotal: 10000,
    tax: 1800,
    shipping: 0,
    total: 10000,
    paymentMethod: 'upi',
    paymentStatus: 'verified_demo',
    status: 'shipped',
    createdAt: '2026-10-20T10:14:00Z',
    estimatedDelivery: '2026-10-25',
    trackingNumber: 'SIEME-BLR-892401',
    isDemo: true,
    notes: 'Dispatched via BlueDart Express Air'
  },
  {
    id: 'MS-2026-881249',
    customer: {
      fullName: 'Aarav Singhania',
      phone: '+91 97110 88219',
      email: 'aarav.s@auto-group.in',
      streetAddress: 'Villa 12, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560066',
      country: 'India'
    },
    items: [
      {
        productId: 'merai-car-display-daiichi',
        productName: 'MERAI Daiichi Edition Car Display (Driver.MERAI)',
        displayLabel: 'Driver.MERAI (4GB / 64GB)',
        price: 10000,
        quantity: 2,
        image: IMAGES.carDisplayStand
      }
    ],
    subtotal: 20000,
    tax: 3600,
    shipping: 0,
    total: 20000,
    paymentMethod: 'card',
    paymentStatus: 'verified_demo',
    status: 'delivered',
    createdAt: '2026-10-18T14:32:00Z',
    estimatedDelivery: '2026-10-22',
    trackingNumber: 'SIEME-BLR-771923',
    isDemo: true,
    notes: 'Successfully delivered and installed'
  }
];

export const INITIAL_USER: User = {
  id: 'usr-customer-01',
  name: 'Rajesh Kumar',
  email: 'skr2436228@gmail.com',
  phone: '+91 98765 43210',
  role: 'customer',
  addresses: [
    {
      fullName: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'skr2436228@gmail.com',
      streetAddress: 'Plot 74, Sector 18, Cyber City',
      city: 'Gurugram',
      state: 'Haryana',
      postalCode: '122002',
      country: 'India'
    }
  ]
};
