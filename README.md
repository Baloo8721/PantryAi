# FreshCart - AI Meal & Deal Planner

A smart grocery/meal planning web app with real deal-finding, coupon stacking, and AI-powered suggestions.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/Baloo8721/PantryAi.git
cd PantryAi

# Open in browser
open index.html
```

## Deployment - GitHub Pages

1. Go to: https://github.com/Baloo8721/PantryAi/settings/pages
2. **Source**: Select "Deploy from a branch"
3. **Branch**: Select `main` → `/ (root)`
4. Click **Save**

Your site will be live at: `https://baloo8721.github.io/PantryAi/`

To redeploy after changes:
```bash
git add .
git commit -m "Update"
git push
```

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Plain HTML/CSS/JS (no frameworks) |
| Database | localStorage (offline-first, no login) |
| AI | OpenRouter API |
| Hosting | GitHub Pages (free) |

**No build step required** - just push `index.html` and it works.

---

## API KEYS REQUIRED - EXACT LIST

### 1. OPENROUTER (AI - Required for Chat)

**Purpose:** AI chatbot, meal suggestions, recipe help

**How to get:**
1. Go to https://openrouter.ai/keys
2. Sign up (free email)
3. Click "Create Secret Key"
4. Copy the key starting with `sk-or-v1-...`

**Free models (no credit card):**
- `mistralai/mistral-7b-instruct` ← USE THIS ONE (recommended free)
- `google/gemma-3-4b-it`
- `meta-llama/llama-3-8b-instruct`

**App usage:** Settings → Paste API key

---

### 2. KROGER DEVELOPER API (Grocery Prices - Optional)

**Purpose:** Real product prices, store locations, product search

**How to get:**
1. Go to https://developer.kroger.com/
2. Click "Sign Up" → Create account
3. Go to Manage → Apps → Register new app
4. Select "Production" environment
5. Choose APIs: `product.compact`, `location`
6. Get `client_id` and `client_secret`

**Free tier:** Yes, basic access is free

**Documentation:** https://developer.kroger.com/reference

**Example endpoint:**
```
GET https://api.kroger.com/v1/products?filter.term=milk&filter.locationId=012345
```

---

### 3. WALMART PRODUCT API (Optional)

**Purpose:** Product pricing, inventory, reviews from Walmart.com

**How to get:**
1. Go to https://partner-api.walmart.com/
2. Sign up for API access
3. Get API key

**Free tier:** Pay-per-use, first calls often free

**Alternative (easier):** Use Nextract service:
- https://nextract.dev/apis/walmart-api/

---

### 4. AMAZON PRODUCT ADVERTISING API (Optional)

**Purpose:** Household items, cleaning supplies, condiments

**How to get:**
1. Go to https://affiliate-program.amazon.com/
2. Sign up as Amazon Affiliate
3. Go to Product Advertising API section
4. Request access (needs 3 sales first)

**Free tier:** Free with affiliate account

---

### 5. CHOMP THIS API (Food/Nutrition Data)

**Purpose:** Food product info, nutrition facts, UPC lookups

**How to get:**
1. Go to https://chompthis.com/api/
2. Sign up for free tier
3. Get API key

**Free tier:**
- Limited: Free (with attribution)
- Standard: $25/month (pay per request)

**Data:** 1.2M+ grocery products

---

### 6. OPEN FOOD FACTS (Free, No Key)

**Purpose:** Product nutrition, ingredients, barcode lookups

**How to get:** NO KEY NEEDED - completely free, open source

**API:** https://world.openfoodfacts.org/api

**Example:**
```
GET https://world.openfoodfacts.org/api/v2/product/012345678905.json
```

---

### 7. STRIPE (Coupon/Receipt Scanning) - Optional Future

**Purpose:** Receipt scanning, saving receipts

**How to get:** https://stripe.com/docs/billing/connect

---

---

## WHICH APIs TO USE - RECOMMENDED PRIORITY

### PHASE 1 (Current - Works Now)
- OpenRouter AI - Get from https://openrouter.ai/keys
- Open Food Facts - FREE, no key needed

### PHASE 2 (Add Real Data)
1. **Kroger API** - https://developer.kroger.com/ (best for grocery prices)
2. **Chomp This** - https://chompthis.com/api/ (nutrition data)

### PHASE 3 (Advanced)
3. **Walmart API** - https://partner-api.walmart.com/
4. **Amazon PA-API** - https://affiliate-program.amazon.com/

---

## CURRENT STATUS

| Feature | Status | API Needed |
|---------|--------|------------|
| Fridge Inventory | ✅ Ready | None |
| Meal Planning | ✅ Ready | None |
| Shopping List | ✅ Ready | None |
| Store Deals (Mock) | ✅ Ready | None |
| Coupon Stacking | ✅ Ready | None |
| AI Chat | ⚠️ Needs Key | OpenRouter |
| Real Grocery Prices | 🔄 Optional | Kroger |
| Nutrition Data | 🔄 Optional | Open Food Facts (FREE) |

---

## FILE STRUCTURE

```
PantryAi/
├── index.html      # Complete app (all CSS/JS inline)
├── README.md      # This file
├── SPEC.md        # Project specification
└── .gitignore
```

---

## HOW IT WORKS

1. **Add items to your fridge** - Type ingredients you have
2. **Generate meal plan** - App suggests meals based on Mediterranean diet
3. **Shopping list auto-populates** - Items you need to buy
4. **Apply coupons** - Click to stack deals on matching items
5. **AI Assistant** - Ask questions about recipes, substitutions, deals

All data saves to your browser's localStorage - no login required, works offline.

---

## ADDING REAL API DATA

### Example: Add Kroger Product Search

In index.html, add function:
```javascript
async function searchKrogerProducts(query) {
  const token = await getKrogerToken(); // You'll store this
  const response = await fetch(
    `https://api.kroger.com/v1/products?filter.term=${query}&filter.locationId=YOUR_STORE_ID`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  return response.json();
}
```

### Example: Open Food Facts (No Key Needed)
```javascript
async function getNutrition(barcode) {
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
  );
  return response.json();
}
```

---

## CUSTOMIZATION

### Add more recipes
Edit `RECIPES` array in index.html:
```javascript
const RECIPES = [
  { name: "Your Recipe", ingredients: ["item1", "item2"], baseServings: 2 },
];
```

### Add more store deals
Edit `STORE_DEALS` object with real data from APIs.

### Change diet presets
Modify `dietProfile` variable.

---

## TROUBLESHOOTING

**AI chat not working:**
- Go to Settings → Enter your OpenRouter API key
- Use free model: `mistralai/mistral-7b-instruct`

**Changes not showing:**
- Force refresh: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)

**Want to reset all data:**
- Browser dev tools → Application → Clear localStorage

---

## CREDITS

- AI powered by OpenRouter
- Free food data from Open Food Facts
- Design inspired by modern dashboard UIs