# 🥗 PantryAi - Smart Grocery & Meal Planner

A production-ready AI-powered grocery and meal planning app. Features include fridge photo scanning, real-time deals from multiple stores, coupon stacking, and AI assistance.

![Version](https://img.shields.io/badge/version-1.0.0-green)
![Platform](https://img.shields.io/badge/platform-Web-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🚀 Quick Start

### Option 1: Deploy to Netlify (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial production release"
   git push origin main
   ```

2. **Deploy**
   - Go to [Netlify](https://app.netlify.com)
   - "Add new site" → "Import an existing project"
   - Select your GitHub repo
   - Add environment variables (see below)
   - Deploy!

3. **Environment Variables** (in Netlify dashboard)
   ```
   KROGER_CLIENT_ID=your_kroger_client_id
   KROGER_CLIENT_SECRET=your_kroger_client_secret
   OPENROUTER_API_KEY=your_openrouter_key
   ```

### Option 2: Local Development

```bash
# Clone the repo
git clone https://github.com/Baloo8721/PantryAi.git
cd PantryAi

# Open in browser (no server needed!)
open index.html
```

---

## 📱 Features

| Feature | Description | Status |
|---------|-------------|--------|
| 📸 **Fridge Scanner** | Snap photo → AI identifies items automatically | ✅ Ready |
| ❄️ **Fridge Inventory** | Add/remove items, persists in localStorage | ✅ Ready |
| 🍽️ **Meal Planning** | Auto-generates meals based on available ingredients | ✅ Ready |
| 🛒 **Smart Shopping** | Auto-populates shopping list from meal plan | ✅ Ready |
| 💰 **Store Deals** | Real-time deals from Aldi, Publix, Walmart, Kroger | ✅ Ready |
| 🏷️ **Coupon Stacking** | Apply multiple coupons for maximum savings | ✅ Ready |
| 💬 **AI Assistant** | Chat with AI about recipes, substitutions, deals | ⚠️ Needs API Key |
| 🧾 **Receipt Upload** | Links to receipt cashback apps (Fetch, Ibotta, etc.) | ✅ Ready |
| 🖼️ **Product Images** | Shows actual product images from APIs | 🔄 Coming |

---

## 🔑 API KEYS REQUIRED

### 1. OPENROUTER (AI - Required for Fridge Scanner & Chat)

| Item | Details |
|------|---------|
| **Get Key** | https://openrouter.ai/keys |
| **Free Tier** | Yes, with free models |
| **Models** | `mistralai/mistral-7b-instruct:free`, `anthropic/claude-3-haiku:free` |
| **Setup** | Settings → Enter API key |

### 2. KROGER DEVELOPER API (Product Data)

| Item | Details |
|------|---------|
| **Get Access** | https://developer.kroger.com/ |
| **Cost** | FREE (official API) |
| **Data** | Product search, prices, images, store locations |
| **Setup** | Register app → Get client_id + client_secret |

### 3. WALLET API (Optional - Coming Soon)

| Item | Details |
|------|---------|
| **Get Access** | https://partner-api.walmart.com/ |
| **Alternative** | Use Apify actors (free tier available) |

### 4. RECEIPT CASHBACK APPS (No API Needed)

| App | Best For | Payout |
|-----|----------|--------|
| **Fetch Rewards** | Any receipt, $1-2/receipt | Gift cards |
| **Ibotta** | Groceries, $218/year avg | PayPal, Gift cards |
| **Checkout 51** | Weekly offers | Check ($20 min) |
| **CoinOut** | Any receipt | Cash |
| **Upside** | Gas & groceries | PayPal |

> 💡 **Tip:** Scan the same receipt to multiple apps to maximize earnings!

---

## 📂 PROJECT STRUCTURE

```
PantryAi/
├── index.html              # Main app (single page)
├── styles.css              # All styling
├── js/
│   └── app.js              # Main application logic
├── netlify/
│   ├── functions/           # Serverless functions
│   │   ├── kroger.js        # Kroger API proxy
│   │   └── analyze-fridge.js # AI vision proxy
│   └── functions/README.md  # Functions documentation
├── netlify.toml             # Netlify config
├── package.json             # Dependencies (for Netlify)
└── README.md                # This file
```

---

## 🛠️ TECHNICAL STACK

| Layer | Technology | Why |
|-------|------------|-----|
| **Frontend** | Plain HTML/CSS/JS | Simple, no build required |
| **Backend** | Netlify Functions | Hide API keys, free tier |
| **AI** | OpenRouter | Works with vision models |
| **Data** | localStorage | Offline-first, no login |
| **Hosting** | Netlify | Free, supports functions |

---

## 🔧 DEVELOPMENT

### Adding New Features

**Add more recipes:**
```javascript
// In js/app.js, edit RECIPES array
const RECIPES = [
  { name: "Your Recipe", ingredients: ["item1", "item2"], servings: 2, emoji: "🍳" },
  // ...
];
```

**Add store deals:**
```javascript
// Edit STORE_DEALS object
STORE_DEALS.aldi = [
  { store: 'aldi', name: 'Product', price: 2.99, originalPrice: 3.99, image: '', coupon: null },
  // ...
];
```

### API Integration Examples

**Kroger API (when credentials configured):**
```javascript
// Via Netlify function
const response = await fetch('/.netlify/functions/kroger', {
  method: 'POST',
  body: JSON.stringify({ searchTerm: 'milk', locationId: '01400963' })
});
```

**Open Food Facts (free, no key):**
```javascript
const response = await fetch(
  'https://world.openfoodfacts.org/api/v2/product/012345678905.json'
);
const data = await response.json();
// Returns: name, brand, image, nutrition
```

---

## 📋 TROUBLESHOOTING

| Issue | Solution |
|-------|----------|
| AI chat not working | Add OpenRouter key in Settings |
| Fridge photo not analyzing | Use clearer photo, good lighting |
| Deals not loading | Check internet connection |
| Changes not showing | Force refresh (Cmd+Shift+R) |
| Reset all data | Clear localStorage in browser dev tools |

---

## 🌐 DEPLOYMENT CHECKLIST

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Netlify account connected
- [ ] Environment variables added (optional)
- [ ] Site deployed
- [ ] OpenRouter API key added in app
- [ ] Tested fridge camera
- [ ] Tested meal generation
- [ ] Verified deals display

---

## 📄 LICENSE

MIT License - feel free to use, modify, and distribute.

---

## 🙏 CREDITS

- AI powered by [OpenRouter](https://openrouter.ai)
- Food data from [Open Food Facts](https://world.openfoodfacts.org)
- Design inspired by modern app UIs
- Receipt apps: Fetch, Ibotta, Checkout 51

---

## 📞 SUPPORT

- Open a GitHub issue
- Check the docs in `/netlify/functions`
- Review the code in `js/app.js`

**Happy shopping! 🛒🥗**