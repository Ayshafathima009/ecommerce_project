import { Language } from '../types';

export interface Translations {
  // Brand
  brandName: string;
  tagline: string;
  subTagline: string;
  domainName: string;
  
  // Navigation
  navHome: string;
  navProducts: string;
  navAboutUs: string;
  navMyOrders: string;
  navAccount: string;
  navCart: string;
  navAdmin: string;
  navDistributor: string;
  searchPlaceholder: string;
  aiAssist: string;
  
  // Hero
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaBuy: string;
  heroCtaExplore: string;
  inStockBadge: string;
  outOfStockBadge?: string;
  unitsLeft: string;
  
  // Product actions & labels
  buyNow: string;
  addToCart: string;
  addedToCart: string;
  viewDetails: string;
  specifications: string;
  featuresAndBenefits: string;
  price: string;
  quantity: string;
  stockStatus: string;
  available: string;
  outOfStock: string;
  relatedProducts: string;
  ratingReviews: string;
  originalPrice: string;
  saveAmount: string;
  
  // Cart & Checkout
  shoppingCart: string;
  cartEmpty: string;
  cartEmptyDesc: string;
  continueShopping: string;
  subtotal: string;
  taxGst: string;
  shipping: string;
  freeShipping: string;
  total: string;
  proceedToCheckout: string;
  checkout: string;
  deliveryDetails: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  streetAddress: string;
  city: string;
  state: string;
  pinCode: string;
  paymentMethod: string;
  cashOnDelivery: string;
  upiPayment: string;
  cardPayment: string;
  netBanking: string;
  placeOrder: string;
  demoPaymentNotice: string;
  orderSummary: string;
  
  // Order Confirmation
  orderConfirmed: string;
  orderNumber: string;
  thankYouMessage: string;
  estimatedDeliveryDate: string;
  trackOrder: string;
  downloadInvoice: string;
  
  // Account & Auth
  login: string;
  register: string;
  logout: string;
  myAccount: string;
  email: string;
  password: string;
  showPassword: string;
  hidePassword: string;
  createAccount: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  profileDetails: string;
  orderHistory: string;
  noOrdersYet: string;
  
  // Dashboards
  adminPortal: string;
  distributorPortal: string;
  totalOrders: string;
  totalCustomers: string;
  productInventory: string;
  manageInventory: string;
  updatePrice: string;
  updateStock: string;
  saveChanges: string;
  orderId: string;
  customerName: string;
  contactNumber: string;
  orderAmount: string;
  orderDate: string;
  orderStatus: string;
  updateStatus: string;
  exportCsv: string;
  smtpStatus: string;
  
  // Common
  loading: string;
  error: string;
  success: string;
  currencySymbol: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    brandName: "MERAI SIEME",
    tagline: "SIEME DRIVE presenting MERAI",
    subTagline: "High-performance automotive electronics and intelligent cockpit systems.",
    domainName: "merai.sieme.in",
    
    navHome: "Home",
    navProducts: "Products",
    navAboutUs: "About Us",
    navMyOrders: "My Orders",
    navAccount: "Account",
    navCart: "Cart",
    navAdmin: "Admin",
    navDistributor: "Distributor",
    searchPlaceholder: "Search Driver.MERAI, Car Display, Android Screen...",
    aiAssist: "AI Assist",
    
    heroHeadline: "Intelligent Automotive Cockpit Systems",
    heroSubheadline: "Experience the pinnacle of intelligent automotive technology with the MERAI Daiichi Edition Car Display. Designed for seamless connectivity, cinematic clarity, and precision control.",
    heroCtaBuy: "Buy Driver.MERAI",
    heroCtaExplore: "Explore Products",
    inStockBadge: "In Stock & Ready to Ship",
    // outOfStockBadge: "Out of Stock",
    unitsLeft: "units available",
    
    buyNow: "Buy Now",
    addToCart: "Add to Cart",
    addedToCart: "Added to Cart",
    viewDetails: "View Details",
    specifications: "Specifications",
    featuresAndBenefits: "Key Features & Engineering",
    price: "Price",
    quantity: "Quantity",
    stockStatus: "Availability",
    available: "Available",
    outOfStock: "Out of Stock",
    relatedProducts: "Related Automotive Tech",
    ratingReviews: "Customer Reviews",
    originalPrice: "M.R.P.",
    saveAmount: "You Save",
    
    shoppingCart: "Shopping Cart",
    cartEmpty: "Your cart is currently empty",
    cartEmptyDesc: "Explore our cutting-edge automotive displays and accessories to upgrade your drive.",
    continueShopping: "Continue Shopping",
    subtotal: "Subtotal",
    taxGst: "Estimated GST (18%)",
    shipping: "Express Shipping",
    freeShipping: "FREE",
    total: "Grand Total",
    proceedToCheckout: "Proceed to Checkout",
    checkout: "Secure Checkout",
    deliveryDetails: "Delivery Address",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    emailAddress: "Email Address",
    streetAddress: "House / Flat No., Street, Area",
    city: "City",
    state: "State",
    pinCode: "PIN Code (6 Digits)",
    paymentMethod: "Payment Method",
    cashOnDelivery: "Cash on Delivery (COD)",
    upiPayment: "UPI (Google Pay, PhonePe, Paytm)",
    cardPayment: "Credit / Debit Card (Demo Gateway)",
    netBanking: "Net Banking (All Major Banks)",
    placeOrder: "Place Order",
    demoPaymentNotice: "Secure Demo Mode: Payments are verified locally for testing without live charges.",
    orderSummary: "Order Summary",
    
    orderConfirmed: "Order Confirmed!",
    orderNumber: "Order ID",
    thankYouMessage: "Thank you for choosing MERAI SIEME. Your high-performance automotive system is being prepared for dispatch.",
    estimatedDeliveryDate: "Estimated Delivery: Within 3-5 Business Days",
    trackOrder: "Track Order Status",
    downloadInvoice: "Download Tax Invoice",
    
    login: "Sign In",
    register: "Create Account",
    logout: "Sign Out",
    myAccount: "Customer Account",
    email: "Email Address",
    password: "Password",
    showPassword: "Show Password",
    hidePassword: "Hide Password",
    createAccount: "Register New Account",
    alreadyHaveAccount: "Already have an account? Sign In",
    dontHaveAccount: "New to MERAI? Create an account",
    profileDetails: "Profile Details",
    orderHistory: "Order History",
    noOrdersYet: "You haven't placed any orders yet.",
    
    adminPortal: "Admin Command Center",
    distributorPortal: "Distributor Network Hub",
    totalOrders: "Total Orders",
    totalCustomers: "Registered Customers",
    productInventory: "Live Inventory",
    manageInventory: "Manage Stock & Pricing",
    updatePrice: "Update Price",
    updateStock: "Update Stock",
    saveChanges: "Save Changes",
    orderId: "Order ID",
    customerName: "Customer Name",
    contactNumber: "Contact Number",
    orderAmount: "Amount",
    orderDate: "Date",
    orderStatus: "Status",
    updateStatus: "Update Status",
    exportCsv: "Export Dispatch Manifest",
    smtpStatus: "SMTP Relay Status: Simulated Delivery Active",
    
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",
    currencySymbol: "₹"
  },
  hi: {
    brandName: "मेरई सीमे (MERAI SIEME)",
    tagline: "सीमे ड्राइव प्रस्तुत करता है मेरई — प्रेरित करने के लिए निर्मित।",
    subTagline: "उच्च प्रदर्शन ऑटोमोटिव इलेक्ट्रॉनिक्स और स्मार्ट कॉकपिट डिस्प्ले।",
    domainName: "merai.sieme.in",
    
    navHome: "होम",
    navProducts: "उत्पाद",
    navAboutUs: "हमारे बारे में",
    navMyOrders: "मेरे ऑर्डर्स",
    navAccount: "खाता",
    navCart: "कार्ट",
    navAdmin: "एडमिन",
    navDistributor: "वितरक",
    searchPlaceholder: "Driver.MERAI, कार डिस्प्ले, एंड्रॉइड स्क्रीन खोजें...",
    aiAssist: "एआई असिस्ट",
    
    heroHeadline: "प्रेरित करने के लिए निर्मित।",
    heroSubheadline: "मेरई दाइची एडिशन कार डिस्प्ले के साथ आधुनिक ऑटोमोटिव तकनीक का अनुभव करें। निर्बाध कनेक्टिविटी और असाधारण स्पष्टता।",
    heroCtaBuy: "अभी खरीदें Driver.MERAI",
    heroCtaExplore: "सभी उत्पाद देखें",
    inStockBadge: "स्टॉक में उपलब्ध — त्वरित डिलीवरी",
    outOfStockBadge: "आउट ऑफ स्टॉक",
    unitsLeft: "यूनिट्स शेष",
    
    buyNow: "अभी खरीदें",
    addToCart: "कार्ट में जोड़ें",
    addedToCart: "कार्ट में जोड़ा गया",
    viewDetails: "विवरण देखें",
    specifications: "तकनीकी विवरण",
    featuresAndBenefits: "मुख्य विशेषताएं",
    price: "मूल्य",
    quantity: "मात्रा",
    stockStatus: "उपलब्धता",
    available: "उपलब्ध",
    outOfStock: "स्टॉक में नहीं",
    relatedProducts: "संबंधित उत्पाद",
    ratingReviews: "ग्राहक समीक्षाएं",
    originalPrice: "एम.आर.पी.",
    saveAmount: "आपकी बचत",
    
    shoppingCart: "शॉपिंग कार्ट",
    cartEmpty: "आपकी कार्ट खाली है",
    cartEmptyDesc: "अपनी कार के लिए बेहतरीन डिस्प्ले और इलेक्ट्रॉनिक्स जोड़ें।",
    continueShopping: "खरीदारी जारी रखें",
    subtotal: "उप-योग",
    taxGst: "जीएसटी (18%)",
    shipping: "एक्सप्रेस शिपिंग",
    freeShipping: "मुफ्त",
    total: "कुल राशि",
    proceedToCheckout: "चेकआउट के लिए आगे बढ़ें",
    checkout: "सुरक्षित चेकआउट",
    deliveryDetails: "डिलीवरी का पता",
    fullName: "पूरा नाम",
    phoneNumber: "फोन नंबर",
    emailAddress: "ईमेल पता",
    streetAddress: "मकान/सड़क का पता",
    city: "शहर",
    state: "राज्य",
    pinCode: "पिन कोड",
    paymentMethod: "भुगतान का तरीका",
    cashOnDelivery: "कैश ऑन डिलीवरी (COD)",
    upiPayment: "यूपीआई (Google Pay / PhonePe / Paytm)",
    cardPayment: "डेबिट / क्रेडिट कार्ड",
    netBanking: "नेट बैंकिंग",
    placeOrder: "ऑर्डर सबमिट करें",
    demoPaymentNotice: "डेमो मोड: परीक्षण के लिए सुरक्षित सत्यापन।",
    orderSummary: "ऑर्डर सारांश",
    
    orderConfirmed: "ऑर्डर सफलतापूर्वक दर्ज!",
    orderNumber: "ऑर्डर आईडी",
    thankYouMessage: "MERAI SIEME चुनने के लिए धन्यवाद। आपका उत्पाद डिलीवरी के लिए तैयार किया जा रहा है।",
    estimatedDeliveryDate: "अनुमानित डिलीवरी: 3-5 कार्य दिवस",
    trackOrder: "ऑर्डर ट्रैक करें",
    downloadInvoice: "इनवॉइस डाउनलोड करें",
    
    login: "लॉग इन",
    register: "रजिस्टर करें",
    logout: "लॉग आउट",
    myAccount: "मेरा खाता",
    email: "ईमेल",
    password: "पासवर्ड",
    showPassword: "पासवर्ड दिखाएं",
    hidePassword: "पासवर्ड छिपाएं",
    createAccount: "नया खाता बनाएं",
    alreadyHaveAccount: "खाता पहले से है? लॉग इन करें",
    dontHaveAccount: "नया खाता बनाएं",
    profileDetails: "प्रोफ़ाइल विवरण",
    orderHistory: "ऑर्डर का इतिहास",
    noOrdersYet: "आपने अभी तक कोई ऑर्डर नहीं दिया है।",
    
    adminPortal: "एडमिन पोर्टल",
    distributorPortal: "वितरक हब",
    totalOrders: "कुल ऑर्डर्स",
    totalCustomers: "ग्राहक संख्या",
    productInventory: "स्टॉक प्रबंधन",
    manageInventory: "स्टॉक और मूल्य अद्यतन",
    updatePrice: "मूल्य बदलें",
    updateStock: "स्टॉक बदलें",
    saveChanges: "सुरक्षित करें",
    orderId: "ऑर्डर संख्या",
    customerName: "ग्राहक का नाम",
    contactNumber: "संपर्क नंबर",
    orderAmount: "राशि",
    orderDate: "तारीख",
    orderStatus: "स्थिति",
    updateStatus: "स्थिति बदलें",
    exportCsv: "सूची डाउनलोड करें",
    smtpStatus: "ईमेल सूचना: सक्रिय",
    
    loading: "लोड हो रहा है...",
    error: "त्रुटि हुई",
    success: "सफल",
    currencySymbol: "₹"
  },
  ta: {
    brandName: "MERAI SIEME",
    tagline: "SIEME DRIVE வழங்கும் MERAI — உத்வேகம் அளிக்க வடிவமைக்கப்பட்டது.",
    subTagline: "உயர்தர ஆட்டோமோட்டிவ் தொழில்நுட்பம் மற்றும் ஸ்மார்ட் திரைகள்.",
    domainName: "merai.sieme.in",
    
    navHome: "முகப்பு",
    navProducts: "தயாரிப்புகள்",
    navAboutUs: "எங்களை பற்றி",
    navMyOrders: "என் ஆர்டர்கள்",
    navAccount: "கணக்கு",
    navCart: "கூடை",
    navAdmin: "நிர்வாகம்",
    navDistributor: "விநியோகஸ்தர்",
    searchPlaceholder: "Driver.MERAI, கார் டிஸ்ப்ளே தேடவும்...",
    aiAssist: "AI உதவி",
    
    heroHeadline: "உத்வேகம் அளிக்க வடிவமைக்கப்பட்டது.",
    heroSubheadline: "MERAI Daiichi பதிப்பு கார் டிஸ்ப்ளே உடன் சிறந்த தொழில்நுட்பத்தை அனுபவியுங்கள். நவீன வசதிகள் மற்றும் துல்லியமான கட்டுப்பாடு.",
    heroCtaBuy: "இப்போதே வாங்க Driver.MERAI",
    heroCtaExplore: "தயாரிப்புகளைக் காண்க",
    inStockBadge: "கையிருப்பில் உள்ளது",
    outOfStockBadge: "கையிருப்பில் இல்லை",
    unitsLeft: "மீதமுள்ளவை",
    
    buyNow: "இப்போதே வாங்கு",
    addToCart: "கூடையில் சேர்",
    addedToCart: "சேர்க்கப்பட்டது",
    viewDetails: "விவரங்களை பார்க்க",
    specifications: "தொழில்நுட்ப விவரங்கள்",
    featuresAndBenefits: "சிறப்பம்சங்கள்",
    price: "விலை",
    quantity: "அளவு",
    stockStatus: "நிலை",
    available: "கிடைக்கிறது",
    outOfStock: "முடிந்துவிட்டது",
    relatedProducts: "தொடர்புடையவை",
    ratingReviews: "மதிப்புரைகள்",
    originalPrice: "அசல் விலை",
    saveAmount: "சேமிப்பு",
    
    shoppingCart: "ஷாப்பிங் கூடை",
    cartEmpty: "கூடை காலியாக உள்ளது",
    cartEmptyDesc: "உங்கள் காருக்கு புதிய திரைகளைத் தேர்வு செய்யவும்.",
    continueShopping: "ஷாப்பிங் தொடரவும்",
    subtotal: "கூட்டுத்தொகை",
    taxGst: "ஜிஎஸ்டி (18%)",
    shipping: "விரைவு டெலிவரி",
    freeShipping: "இலவசம்",
    total: "மொத்தம்",
    proceedToCheckout: "செக்அவுட் தொடர்க",
    checkout: "செக்அவுட்",
    deliveryDetails: "டெலிவரி முகவரி",
    fullName: "முழு பெயர்",
    phoneNumber: "தொலைபேசி எண்",
    emailAddress: "மின்னஞ்சல்",
    streetAddress: "முகவரி",
    city: "நகரம்",
    state: "மாநிலம்",
    pinCode: "அஞ்சல் குறியீடு",
    paymentMethod: "பணம் செலுத்தும் முறை",
    cashOnDelivery: "டெலிவரியில் பணம் (COD)",
    upiPayment: "UPI பேமென்ட்",
    cardPayment: "கார்டு பேமென்ட்",
    netBanking: "நெட் பேங்கிங்",
    placeOrder: "ஆர்டர் உறுதி செய்",
    demoPaymentNotice: "டெமோ முறை: பாதுகாப்பான சோதனை அமைப்பு.",
    orderSummary: "ஆர்டர் விவரம்",
    
    orderConfirmed: "ஆர்டர் வெற்றிகரமாக பதிவானது!",
    orderNumber: "ஆர்டர் எண்",
    thankYouMessage: "MERAI SIEME-ஐ தேர்ந்தெடுத்ததற்கு நன்றி.",
    estimatedDeliveryDate: "டெலிவரி: 3-5 வேலை நாட்கள்",
    trackOrder: "நிலை அறிய",
    downloadInvoice: "இன்வாய்ஸ் பதிவிறக்கம்",
    
    login: "உள்நுழைக",
    register: "பதிவு செய்க",
    logout: "வெளியேறு",
    myAccount: "என் கணக்கு",
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    showPassword: "கடவுச்சொல்லைக் காட்டு",
    hidePassword: "கடவுச்சொல்லை மறை",
    createAccount: "புதிய கணக்கு",
    alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    dontHaveAccount: "புதிய பயனரா?",
    profileDetails: "விவரக்குறிப்பு",
    orderHistory: "ஆர்டர் வரலாறு",
    noOrdersYet: "இதுவரை எந்த ஆர்டரும் இல்லை.",
    
    adminPortal: "நிர்வாக தளம்",
    distributorPortal: "விநியோக தளம்",
    totalOrders: "மொத்த ஆர்டர்கள்",
    totalCustomers: "வாடிக்கையாளர்கள்",
    productInventory: "கையிருப்பு",
    manageInventory: "கையிருப்பை நிர்வகி",
    updatePrice: "விலை மாற்று",
    updateStock: "கையிருப்பு மாற்று",
    saveChanges: "சேமி",
    orderId: "ஆர்டர் எண்",
    customerName: "பெயர்",
    contactNumber: "தொலைபேசி",
    orderAmount: "தொகை",
    orderDate: "தேதி",
    orderStatus: "நிலை",
    updateStatus: "நிலையை மாற்று",
    exportCsv: "பட்டியலை பதிவிறக்கு",
    smtpStatus: "மின்னஞ்சல் எச்சரிக்கை தயார்",
    
    loading: "ஏற்றுகிறது...",
    error: "பிழை ஏற்பட்டது",
    success: "வெற்றி",
    currencySymbol: "₹"
  },
  ml: {
    brandName: "MERAI SIEME",
    tagline: "സീമേ ഡ്രൈവ് അവതരിപ്പിക്കുന്ന മെരായി — പ്രചോദനത്തിനായി രൂപകൽപ്പന ചെയ്തത്.",
    subTagline: "ഉയർന്ന നിലവാരമുള്ള ഓട്ടോമോട്ടീവ് ഇലക്ട്രോണിക്സും കാർ ഡിസ്പ്ലേകളും.",
    domainName: "merai.sieme.in",
    
    navHome: "ഹോം",
    navProducts: "ഉൽപന്നങ്ങൾ",
    navAboutUs: "ഞങ്ങളെക്കുറിച്ച്",
    navMyOrders: "എന്റെ ഓർഡറുകൾ",
    navAccount: "അക്കൗണ്ട്",
    navCart: "കാർട്ട്",
    navAdmin: "അഡ്മിൻ",
    navDistributor: "വിതരണക്കാരൻ",
    searchPlaceholder: "Driver.MERAI, കാർ ഡിസ്പ്ലേ തിരയുക...",
    aiAssist: "എഐ അസിസ്റ്റ്",
    
    heroHeadline: "പ്രചോദനത്തിനായി രൂപകൽപ്പന ചെയ്തത്.",
    heroSubheadline: "MERAI Daiichi എഡിഷൻ കാർ ഡിസ്പ്ലേയിലൂടെ അത്യാധുനിക കാർ സാങ്കേതികവിദ്യ ആസ്വദിക്കൂ.",
    heroCtaBuy: "വാങ്ങുക Driver.MERAI",
    heroCtaExplore: "ഉൽപന്നങ്ങൾ കാണുക",
    inStockBadge: "സ്റ്റോക്കുണ്ട് — ഉടൻ അയക്കും",
    outOfStockBadge: "സ്റ്റോക്കില്ല",
    unitsLeft: "എണ്ണം ബാക്കി",
    
    buyNow: "ഇപ്പോൾ വാങ്ങുക",
    addToCart: "കാർട്ടിലേക്ക് ചേർക്കുക",
    addedToCart: "ചേർത്തു",
    viewDetails: "വിശദാംശങ്ങൾ",
    specifications: "സവിശേഷതകൾ",
    featuresAndBenefits: "പ്രധാന നേട്ടങ്ങൾ",
    price: "വില",
    quantity: "അളവ്",
    stockStatus: "ലഭ്യത",
    available: "ലഭ്യമാണ്",
    outOfStock: "തീർന്നുപോയി",
    relatedProducts: "സമാന ഉൽപന്നങ്ങൾ",
    ratingReviews: "അവലോകനങ്ങൾ",
    originalPrice: "യഥാർത്ഥ വില",
    saveAmount: "ലാഭം",
    
    shoppingCart: "ഷോപ്പിംഗ് കാർട്ട്",
    cartEmpty: "കാർട്ട് ശൂന്യമാണ്",
    cartEmptyDesc: "നിങ്ങളുടെ കാറിനായി ഉൽപന്നങ്ങൾ കണ്ടെത്തുക.",
    continueShopping: "ഷോപ്പിംഗ് തുടരുക",
    subtotal: "ഉപതുക",
    taxGst: "ജിഎസ്ടി (18%)",
    shipping: "ഡെലിവറി ചാർജ്",
    freeShipping: "സൗജന്യം",
    total: "ആകെ തുക",
    proceedToCheckout: "ചെക്ക്ഔട്ട് ചെയ്യുക",
    checkout: "ചെക്ക്ഔട്ട്",
    deliveryDetails: "ഡെലിവറി വിലാസം",
    fullName: "പൂർണ്ണമായ പേര്",
    phoneNumber: "ഫോൺ നമ്പർ",
    emailAddress: "ഇമെയിൽ",
    streetAddress: "വിലാസം",
    city: "നഗരം",
    state: "സംസ്ഥാനം",
    pinCode: "പിൻ കോഡ്",
    paymentMethod: "പേയ്മെന്റ് രീതി",
    cashOnDelivery: "ക്യാഷ് ഓൺ ഡെലിവറി (COD)",
    upiPayment: "യുപിഐ (UPI)",
    cardPayment: "കാർഡ് പേയ്മെന്റ്",
    netBanking: "നെറ്റ് ബാങ്കിംഗ്",
    placeOrder: "ഓർഡർ ചെയ്യുക",
    demoPaymentNotice: "ഡെമോ മോഡ്: പരീക്ഷണത്തിനായി തയ്യാറാക്കിയത്.",
    orderSummary: "ഓർഡർ സംഗ്രഹം",
    
    orderConfirmed: "ഓർഡർ ഉറപ്പിച്ചു!",
    orderNumber: "ഓർഡർ നമ്പർ",
    thankYouMessage: "MERAI SIEME തിരഞ്ഞെടുത്തതിന് നന്ദി.",
    estimatedDeliveryDate: "ഡെലിവറി: 3-5 പ്രവൃത്തി ദിവസങ്ങൾക്കുള്ളിൽ",
    trackOrder: "ഓർഡർ ട്രാക്ക് ചെയ്യുക",
    downloadInvoice: "ഇൻവോയ്സ് ഡൗൺലോഡ്",
    
    login: "ലോഗിൻ",
    register: "രജിസ്റ്റർ ചെയ്യുക",
    logout: "ലോഗൗട്ട്",
    myAccount: "എന്റെ അക്കൗണ്ട്",
    email: "ഇമെയിൽ",
    password: "പാസ്‌വേഡ്",
    showPassword: "പാസ്‌വേഡ് കാണിക്കുക",
    hidePassword: "പാസ്‌വേഡ് മറയ്ക്കുക",
    createAccount: "പുതിയ അക്കൗണ്ട്",
    alreadyHaveAccount: "അക്കൗണ്ട് ഉണ്ടോ? ലോഗിൻ ചെയ്യുക",
    dontHaveAccount: "പുതിയ അക്കൗണ്ട് ഉണ്ടാക്കുക",
    profileDetails: "വിവരങ്ങൾ",
    orderHistory: "ഓർഡർ ചരിത്രം",
    noOrdersYet: "ഇതുവരെ ഓർഡറുകളൊന്നും നൽകിയിട്ടില്ല.",
    
    adminPortal: "അഡ്മിൻ പോർട്ടൽ",
    distributorPortal: "വിതരണ ഹബ്ബ്",
    totalOrders: "ആകെ ഓർഡറുകൾ",
    totalCustomers: "ഉപഭോക്താക്കൾ",
    productInventory: "സ്റ്റോക്ക് വിവരങ്ങൾ",
    manageInventory: "സ്റ്റോക്ക് നിയന്ത്രിക്കുക",
    updatePrice: "വില മാറ്റുക",
    updateStock: "സ്റ്റോക്ക് മാറ്റുക",
    saveChanges: "സംരക്ഷിക്കുക",
    orderId: "ഓർഡർ ഐഡി",
    customerName: "പേര്",
    contactNumber: "ഫോൺ",
    orderAmount: "തുക",
    orderDate: "തീയതി",
    orderStatus: "നില",
    updateStatus: "നില മാറ്റുക",
    exportCsv: "റിപ്പോർട്ട് ഡൗൺലോഡ്",
    smtpStatus: "ഇമെയിൽ തൽസ്ഥിതി: സജീവം",
    
    loading: "ലോഡ് ചെയ്യുന്നു...",
    error: "തകരാർ സംഭവിച്ചു",
    success: "വിജയം",
    currencySymbol: "₹"
  },
  ar: {
    brandName: "ميراي سيمي (MERAI SIEME)",
    tagline: "سيمي درايف تقدم ميراي — مصممة لتلهم.",
    subTagline: "تقنيات السيارات الذكية والشاشات التفاعلية فائقة الأداء.",
    domainName: "merai.sieme.in",
    
    navHome: "الرئيسية",
    navProducts: "المنتجات",
    navAboutUs: "من نحن",
    navMyOrders: "طلباتي",
    navAccount: "حسابي",
    navCart: "السلة",
    navAdmin: "لوحة التحكم",
    navDistributor: "الموزعون",
    searchPlaceholder: "ابحث عن شاشة Driver.MERAI، شاشة سيارة...",
    aiAssist: "مساعد الذكاء الاصطناعي",
    
    heroHeadline: "مصممة لتلهم.",
    heroSubheadline: "اختبر قمة هندسة السيارات الذكية مع شاشة MERAI Daiichi Edition للسيارات. وضوح سينمائي وتحكم استثنائي.",
    heroCtaBuy: "شراء Driver.MERAI الآن",
    heroCtaExplore: "استكشف المنتجات",
    inStockBadge: "متوفر بالمخزون — جاهز للشحن",
    outOfStockBadge: "نفد من المخزون",
    unitsLeft: "قطع متبقية",
    
    buyNow: "شراء الآن",
    addToCart: "أضف إلى السلة",
    addedToCart: "تمت الإضافة",
    viewDetails: "عرض التفاصيل",
    specifications: "المواصفات التقنية",
    featuresAndBenefits: "المميزات الهندسية",
    price: "السعر",
    quantity: "الكمية",
    stockStatus: "الحالة",
    available: "متوفر",
    outOfStock: "غير متوفر",
    relatedProducts: "منتجات ذات صلة",
    ratingReviews: "تقييمات العملاء",
    originalPrice: "السعر الأصلي",
    saveAmount: "وفرت",
    
    shoppingCart: "سلة التسوق",
    cartEmpty: "سلتك فارغة حالياً",
    cartEmptyDesc: "استكشف أحدث شاشات السيارات وملحقاتها لتطوير تجربة قيادتك.",
    continueShopping: "متابعة التسوق",
    subtotal: "المجموع الفرعي",
    taxGst: "ضريبة القيمة المضافة (18%)",
    shipping: "الشحن السريع",
    freeShipping: "مجاني",
    total: "الإجمالي",
    proceedToCheckout: "إتمام الشراء",
    checkout: "الدفع الآمن",
    deliveryDetails: "عنوان التوصيل",
    fullName: "الاسم بالكامل",
    phoneNumber: "رقم الهاتف",
    emailAddress: "البريد الإلكتروني",
    streetAddress: "العنوان / الشارع / المبنى",
    city: "المدينة",
    state: "المنطقة / المحافظة",
    pinCode: "الرمز البريدي",
    paymentMethod: "طريقة الدفع",
    cashOnDelivery: "الدفع عند الاستلام (COD)",
    upiPayment: "الدفع عبر UPI",
    cardPayment: "بطاقة الائتمان / الخصم",
    netBanking: "الخدمات المصرفية عبر الإنترنت",
    placeOrder: "تأكيد الطلب",
    demoPaymentNotice: "وضع تجريبي آمن: يتم التحقق محلياً بدون خصم مالي حقيقي.",
    orderSummary: "ملخص الطلب",
    
    orderConfirmed: "تم تأكيد طلبك بنجاح!",
    orderNumber: "رقم الطلب",
    thankYouMessage: "شكراً لاختيارك MERAI SIEME. جاري تجهيز جهازك للشحن السريع.",
    estimatedDeliveryDate: "موعد التوصيل المتوقع: خلال 3-5 أيام عمل",
    trackOrder: "تتبع مسار الشحنة",
    downloadInvoice: "تحميل الفاتورة الضريبية",
    
    login: "تسجيل الدخول",
    register: "إنشاء حساب جديد",
    logout: "تسجيل الخروج",
    myAccount: "حساب العميل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    showPassword: "إظهار كلمة المرور",
    hidePassword: "إخفاء كلمة المرور",
    createAccount: "إنشاء حساب",
    alreadyHaveAccount: "هل لديك حساب بالفعل؟ تسجيل الدخول",
    dontHaveAccount: "مستخدم جديد؟ سجل الآن",
    profileDetails: "بيانات الحساب",
    orderHistory: "سجل المشتريات",
    noOrdersYet: "لا توجد لديك طلبات سابقة.",
    
    adminPortal: "لوحة تحكم المسؤول",
    distributorPortal: "بوابة الموزعين",
    totalOrders: "إجمالي الطلبات",
    totalCustomers: "العملاء المسجلين",
    productInventory: "المخزون الفعلي",
    manageInventory: "إدارة المخزون والأسعار",
    updatePrice: "تعديل السعر",
    updateStock: "تعديل الكمية",
    saveChanges: "حفظ التغييرات",
    orderId: "رقم الطلب",
    customerName: "اسم العميل",
    contactNumber: "رقم التواصل",
    orderAmount: "القيمة",
    orderDate: "التاريخ",
    orderStatus: "حالة الطلب",
    updateStatus: "تحديث الحالة",
    exportCsv: "تصدير بيان الشحنات",
    smtpStatus: "حالة خادم البريد: إرسال محاكي مفعل",
    
    loading: "جاري التحميل...",
    error: "حدث خطأ ما",
    success: "تم بنجاح",
    currencySymbol: "₹"
  }
};
