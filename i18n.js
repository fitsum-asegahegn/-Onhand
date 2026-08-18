// ============================================================
// Onhand — bilingual (English / Amharic) support
// Usage: add data-i18n="key" to any element's text content,
// or data-i18n-placeholder="key" for input placeholders.
// Language choice is remembered per device (localStorage), since
// it's a personal display preference, not shop data.
//
// NOTE: these Amharic strings were machine-translated for common
// shop/business terms. They should read fine, but it's worth
// having a native speaker skim them once before relying on this
// with real customers — a few word choices (e.g. "keeper") may
// have a more natural local phrasing than what's here.
// ============================================================

const translations = {
  en: {
    tagline: "Track sales and stock, even when you're not there.",
    signInTitle: "Sign In",
    signUpTitle: "Create Account",
    email: "Email",
    password: "Password",
    signInBtn: "Sign In",
    signUpBtn: "Create Account",
    toggleToSignup: "New here? Create an account",
    toggleToSignin: "Already have an account? Sign in",
    iAmA: "I am a...",
    shopOwner: "Shop owner",
    keeperRole: "Keeper",
    yourName: "Your name",
    shopCode: "Shop code",
    shopCodePlaceholder: "Ask the owner",
    finishSetupTitle: "Finish Setting Up Your Account",
    finishSetupHint: "We found your login, but your profile wasn't saved last time. Fill this in once to fix it.",
    saveContinue: "Save & Continue",
    notYouSignOut: "Not you? Sign out",

    ownerBadge: "Owner",
    keeperBadge: "Keeper",
    signOut: "Sign out",
    yourShopCode: "Your shop code",
    shopCodeHint: "Give this to a keeper so they can join your shop when they sign up.",
    salesOverview: "Sales Overview",
    today: "Today",
    days7: "7 days",
    days30: "30 days",
    revenue: "Revenue",
    profit: "Profit",
    itemsSold: "Items sold",
    revenueTrend: "Revenue Trend",
    topProducts: "Top Products",
    notEnoughTrendData: "Not enough sales yet to show a trend.",
    notEnoughSalesData: "No sales recorded in this period yet.",
    needsAttention: "Needs Attention",
    addProduct: "Add a Product",
    addProductHint: "A barcode is generated automatically — print or screenshot the label after saving.",
    productName: "Product name",
    productNamePlaceholder: "e.g. Sugar",
    soldBy: "Sold by",
    unitPiece: "Piece",
    unitKg: "Kilogram (kg)",
    unitLitre: "Litre",
    unitPack: "Pack",
    costPrice: "Cost price (Birr)",
    sellingPrice: "Selling price (Birr)",
    openingStock: "Opening stock",
    lowStockBelow: "Low stock alert below",
    saveGenerateBarcode: "Save Product & Generate Barcode",
    printLabelHint: "Print this label and stick it on the product.",
    yourProducts: "Your Products",
    inStock: "in stock",
    stockLow: "Low",
    stockOk: "OK",
    noProductsYet: "No products yet. Add your first one above.",
    nothingNeedsAttention: "Nothing needs attention right now.",
    reorderSoon: "Reorder",
    stockLeft: "left in stock.",

    scanProduct: "Scan a Product",
    tapToOpenCamera: "Tap to open the camera",
    orTypeCode: "Or type the code",
    scannerHint: "Works with the camera, or a wired/Bluetooth barcode scanner — just point and scan, it types like a keyboard.",
    typeCodePlaceholder: "e.g. ONHAND738514783",
    find: "Find",
    cancelScan: "Cancel Scan",
    torch: "Torch",
    itemNotFound: "Item not found?",
    itemNotFoundHint: "If a customer asks for something out of stock or not yet in the system, log it — this helps restock the right things.",
    whatDidTheyAsk: "What did they ask for?",
    missedSalePlaceholder: "e.g. Cooking oil 1L",
    logMissedSale: "Log Missed Sale",
    selling: "Selling",
    quantity: "Quantity",
    cancel: "Cancel",
    confirmSale: "Confirm Sale",

    offlineBanner: "Offline — sales are being saved on this phone and will sync when you're back online.",
    pendingSync: "waiting to sync",

    brandOtherName: "በእጄ — In your hand",
    viewStockTitle: "View Stock & Prices",
    detailsBtn: "Details",
    hideDetailsBtn: "Hide",
    totalSoldAllTime: "Total sold (all time)",
    currentlyLeft: "Currently in stock",
    lastSold: "Last sold",
    neverSold: "Not sold yet",
    barcodeLabel: "Barcode",
    printLabelBtn: "Print Label",
    printAllBtn: "Print All",
    batchUploadTitle: "Batch Upload (CSV)",
    batchUploadHint: "Add many products at once. Columns: name, unit, cost_price, selling_price, current_stock, low_stock_threshold. If a name has a comma, wrap it in quotes.",
    uploadSaveBtn: "Upload & Save",
    generatingLabels: "Generating labels…",
    productAlreadyExists: "already exists — add stock from its Details below instead of creating a duplicate.",
    scrollToExisting: "Show it",
    addStock: "Add Stock",
    addStockHint: "Recording a delivery? Add to what's already on the shelf — this keeps the same barcode, no reprinting needed.",
    quantityReceived: "Quantity received",
    addStockBtn: "Add to Stock",
    stockAdded: "Stock updated",

    enterValidQuantity: "Enter a valid quantity.",
    saleRecorded: "Sold",
    saleQueuedOffline: "Sold — saved offline, will sync when back online",
    barcodeNotFound: "That barcode isn't in your shop's catalog.",
    enterBarcode: "Enter a barcode number.",
    enterMissedItem: "Enter what the customer asked for.",
    missedLogged: "Logged — thanks!",
    missedQueuedOffline: "Logged offline — will sync when back online",
    couldNotOpenCamera: "Couldn't open camera. Check permissions.",
    torchNotAvailable: "Torch not available on this device.",
    notLinkedTitle: "This keeper account is not linked to a shop.",
    notLinkedBody: "Please contact your shop owner for the correct shop code and sign up again."
  },

  am: {
    tagline: "እርስዎ በሌሉበት እንኳን ሽያጭንና ክምችትን ይከታተሉ።",
    signInTitle: "ግባ",
    signUpTitle: "መለያ ፍጠር",
    email: "ኢሜይል",
    password: "የይለፍ ቃል",
    signInBtn: "ግባ",
    signUpBtn: "መለያ ፍጠር",
    toggleToSignup: "አዲስ ነዎት? መለያ ይፍጠሩ",
    toggleToSignin: "መለያ አለዎት? ይግቡ",
    iAmA: "እኔ...",
    shopOwner: "የሱቅ ባለቤት",
    keeperRole: "ሱቅ ጠባቂ",
    yourName: "ስምዎ",
    shopCode: "የሱቅ ኮድ",
    shopCodePlaceholder: "ከባለቤቱ ይጠይቁ",
    finishSetupTitle: "መለያዎን ማጠናቀቅ",
    finishSetupHint: "መግቢያዎን አግኝተናል፣ ነገር ግን መገለጫዎ ካለፈው ጊዜ አልተቀመጠም። ይህን አንድ ጊዜ ይሙሉ።",
    saveContinue: "አስቀምጥ እና ቀጥል",
    notYouSignOut: "እርስዎ አይደሉም? ውጣ",

    ownerBadge: "ባለቤት",
    keeperBadge: "ጠባቂ",
    signOut: "ውጣ",
    yourShopCode: "የእርስዎ የሱቅ ኮድ",
    shopCodeHint: "ጠባቂ ሲመዘገብ ሱቅዎን እንዲቀላቀል ይህን ይስጡት።",
    salesOverview: "የሽያጭ አጠቃላይ እይታ",
    today: "ዛሬ",
    days7: "7 ቀናት",
    days30: "30 ቀናት",
    revenue: "ገቢ",
    profit: "ትርፍ",
    itemsSold: "የተሸጡ እቃዎች",
    revenueTrend: "የገቢ አዝማሚያ",
    topProducts: "ከፍተኛ ሽያጭ ያላቸው እቃዎች",
    notEnoughTrendData: "አዝማሚያ ለማሳየት በቂ ሽያጭ የለም።",
    notEnoughSalesData: "በዚህ ጊዜ ውስጥ የተመዘገበ ሽያጭ የለም።",
    needsAttention: "ትኩረት የሚያስፈልገው",
    addProduct: "እቃ ጨምር",
    addProductHint: "ባርኮድ በራስ-ሰር ይፈጠራል — ካስቀመጡ በኋላ ምልክቱን ያትሙ ወይም ፎቶ ያንሱ።",
    productName: "የእቃ ስም",
    productNamePlaceholder: "ለምሳሌ ስኳር",
    soldBy: "የመለኪያ አይነት",
    unitPiece: "ቁራጭ",
    unitKg: "ኪሎግራም (kg)",
    unitLitre: "ሊትር",
    unitPack: "ጥቅል",
    costPrice: "የግዢ ዋጋ (ብር)",
    sellingPrice: "የመሸጫ ዋጋ (ብር)",
    openingStock: "መነሻ ክምችት",
    lowStockBelow: "ማንቂያ ከዚህ ክምችት በታች",
    saveGenerateBarcode: "እቃ አስቀምጥ እና ባርኮድ ፍጠር",
    printLabelHint: "ይህን ምልክት አትመው በእቃው ላይ ይለጥፉ።",
    yourProducts: "የእርስዎ እቃዎች",
    inStock: "በክምችት ውስጥ",
    stockLow: "ዝቅተኛ",
    stockOk: "ጥሩ",
    noProductsYet: "እስካሁን እቃ የለም። የመጀመሪያውን ከላይ ይጨምሩ።",
    nothingNeedsAttention: "አሁን ምንም ትኩረት የሚያስፈልገው ነገር የለም።",
    reorderSoon: "ዳግም ይዘዙ",
    stockLeft: "በክምችት ውስጥ ቀርቷል።",

    scanProduct: "እቃ ስካን አድርግ",
    tapToOpenCamera: "ካሜራ ለመክፈት ይንኩ",
    orTypeCode: "ወይም ኮዱን ይተይቡ",
    scannerHint: "ከካሜራ ወይም ከሽቦ/ብሉቱዝ ባርኮድ ስካነር ጋር ይሰራል — እንደ የቁልፍ ሰሌዳ ይተይባል፣ ብቻ ይምሩና ያስካኑ።",
    typeCodePlaceholder: "ለምሳሌ ONHAND738514783",
    find: "ፈልግ",
    cancelScan: "ስካን ሰርዝ",
    torch: "ብርሃን",
    itemNotFound: "እቃው አልተገኘም?",
    itemNotFoundHint: "ደንበኛ ያለቀ ወይም ገና ወደ ስርዓቱ ያልገባ እቃ ከጠየቀ ይመዝግቡት — ትክክለኛውን ነገር ዳግም ለማዘዝ ይረዳል።",
    whatDidTheyAsk: "ምን ጠየቁ?",
    missedSalePlaceholder: "ለምሳሌ የምግብ ዘይት 1L",
    logMissedSale: "ያመለጠ ሽያጭ መዝግብ",
    selling: "በመሸጥ ላይ",
    quantity: "ብዛት",
    cancel: "ሰርዝ",
    confirmSale: "ሽያጭ አረጋግጥ",

    offlineBanner: "ከመስመር ውጭ — ሽያጮች በዚህ ስልክ ላይ እየተቀመጡ ነው፣ ተመልሰው ሲገናኙ ይመሳሰላሉ።",
    pendingSync: "ለማመሳሰል በመጠበቅ ላይ",

    brandOtherName: "Onhand — በእጅዎ",
    viewStockTitle: "ክምችት እና ዋጋ ይመልከቱ",
    detailsBtn: "ዝርዝር",
    hideDetailsBtn: "ደብቅ",
    totalSoldAllTime: "በጠቅላላ የተሸጠ",
    currentlyLeft: "አሁን በክምችት ውስጥ ያለ",
    lastSold: "መጨረሻ የተሸጠበት",
    neverSold: "እስካሁን አልተሸጠም",
    barcodeLabel: "ባርኮድ",
    printLabelBtn: "ምልክት አትም",
    printAllBtn: "ሁሉንም አትም",
    batchUploadTitle: "በጅምላ ስቀል (CSV)",
    batchUploadHint: "ብዙ እቃዎችን በአንድ ጊዜ ይጨምሩ። አምዶች፦ name, unit, cost_price, selling_price, current_stock, low_stock_threshold። ስም ኮማ ካለው በትዕምርተ ጥቅስ ውስጥ ያድርጉት።",
    uploadSaveBtn: "ስቀል እና አስቀምጥ",
    generatingLabels: "ምልክቶች በመፍጠር ላይ…",
    productAlreadyExists: "አስቀድሞ ተመዝግቧል — ድግግሞሽ ከመፍጠር ይልቅ ከታች ካለው ዝርዝር ክምችት ይጨምሩ።",
    scrollToExisting: "አሳየኝ",
    addStock: "ክምችት ጨምር",
    addStockHint: "አዲስ ደርሶ አለ? ቀድሞ በመደርደሪያው ላይ ካለው ጋር ይጨምሩ — ተመሳሳዩ ባርኮድ ይቀጥላል፣ ዳግም ማተም አያስፈልግም።",
    quantityReceived: "የደረሰ ብዛት",
    addStockBtn: "ወደ ክምችት ጨምር",
    stockAdded: "ክምችት ተዘምኗል",

    enterValidQuantity: "ትክክለኛ ብዛት ያስገቡ።",
    saleRecorded: "ተሽጧል",
    saleQueuedOffline: "ተሽጧል — ከመስመር ውጭ ተቀምጧል፣ ሲገናኙ ይመሳሰላል",
    barcodeNotFound: "ይህ ባርኮድ በሱቅዎ ዝርዝር ውስጥ የለም።",
    enterBarcode: "የባርኮድ ቁጥር ያስገቡ።",
    enterMissedItem: "ደንበኛው ምን እንደጠየቀ ያስገቡ።",
    missedLogged: "ተመዝግቧል — እናመሰግናለን!",
    missedQueuedOffline: "ከመስመር ውጭ ተመዝግቧል — ሲገናኙ ይመሳሰላል",
    couldNotOpenCamera: "ካሜራ መክፈት አልተቻለም። ፍቃድ ያረጋግጡ።",
    torchNotAvailable: "ብርሃን በዚህ መሳሪያ ላይ አይገኝም።",
    notLinkedTitle: "ይህ የጠባቂ መለያ ከምንም ሱቅ ጋር አልተገናኘም።",
    notLinkedBody: "እባክዎ ትክክለኛውን የሱቅ ኮድ ከባለቤቱ ይጠይቁ እና እንደገና ይመዝገቡ።"
  }
};

let currentLang = localStorage.getItem('onhand_lang') || 'en';

function t(key) {
  return (translations[currentLang] && translations[currentLang][key])
      || translations.en[key]
      || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  document.documentElement.lang = currentLang === 'am' ? 'am' : 'en';
  const toggle = document.getElementById('langToggle');
  if (toggle) toggle.textContent = currentLang === 'en' ? 'አማርኛ' : 'English';

  // Brand mark: "On"(ink)+"hand"(blue) <-> "በ"(ink)+"እጄ"(blue) — same
  // two-tone pattern, just swapping which script it's written in.
  const brandPart1 = document.getElementById('brandPart1');
  const brandPart2 = document.getElementById('brandPart2');
  if (brandPart1 && brandPart2) {
    if (currentLang === 'am') {
      brandPart1.textContent = 'በ';
      brandPart2.textContent = 'እጄ';
    } else {
      brandPart1.textContent = 'On';
      brandPart2.textContent = 'hand';
    }
  }
  const brandSubtitle = document.getElementById('brandSubtitle');
  if (brandSubtitle) brandSubtitle.textContent = t('brandOtherName');
}

function toggleLang() {
  currentLang = currentLang === 'en' ? 'am' : 'en';
  localStorage.setItem('onhand_lang', currentLang);
  applyTranslations();
}

document.addEventListener('DOMContentLoaded', applyTranslations);
