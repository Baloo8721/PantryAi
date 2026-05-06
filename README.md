# 🥗 PantryAi - Smart Grocery & Meal Planner

A production-ready AI-powered grocery and meal planning app deployed on Vercel.

![Version](https://img.shields.io/badge/version-1.0.0-green)
![Platform](https://img.shields.io/badge/platform-Vercel-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🚀 Quick Start

### Your Live App
**URL:** https://pantry-ai.vercel.app

### Local Development

```bash
# Clone the repo
git clone https://github.com/Baloo8721/PantryAi.git
cd PantryAi

# Open in browser
open index.html

# Or use Vercel CLI
npm i -g vercel
vercel dev
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

### 2. KROGER DEVELOPER API (Optional - Product Data)

| Item | Details |
|------|---------|
| **Get Access** | https://developer.kroger.com/ |
| **Cost** | FREE (official API) |
| **Setup** | Register app → Get client_id + client_secret |
| **Environment** | Add in Vercel dashboard: KROGER_CLIENT_ID, KROGER_CLIENT_SECRET |

---

## 📂 PROJECT STRUCTURE

```
PantryAi/
├── index.html              # Main app (single page)
├── styles.css              # All styling
├── js/
│   └── app.js              # Main application logic
├── api/                    # Vercel API routes (optional)
│   ├── kroger.js           # Kroger API proxy
│   └── analyze-fridge.js   # AI vision proxy
├── package.json            # Vercel config
└── README.md               # This file
```

---

## 🛠️ TECHNICAL STACK

| Layer | Technology |
|-------|------------|
| **Frontend** | Plain HTML/CSS/JS |
| **Backend** | Vercel API Routes (serverless) |
| **AI** | OpenRouter |
| **Data** | localStorage (offline-first) |
| **Hosting** | Vercel (free) |

---

## 🔧 SETUP API KEYS IN VERCEL

1. Go to https://vercel.com/dashboard → Your project → Settings → Environment Variables
2. Add variables:
   - `KROGER_CLIENT_ID` (from developer.kroger.com)
   - `KROGER_CLIENT_SECRET` (from developer.kroger.com)
   - `OPENROUTER_API_KEY` (optional, can also enter in app)

---

## 📋 TROUBLESHOOTING

| Issue | Solution |
|-------|----------|
| AI chat not working | Add OpenRouter key in Settings |
| Fridge photo not analyzing | Use clearer photo, good lighting |
| Changes not showing | Force refresh (Cmd+Shift+R) |
| Reset all data | Clear localStorage in browser dev tools |

---

## 🧾 RECEIPT CASHBACK APPS

| App | Best For | Payout |
|-----|----------|--------|
| **Fetch Rewards** | Any receipt, $1-2/receipt | Gift cards |
| **Ibotta** | Groceries, $218/year avg | PayPal, Gift cards |
| **Checkout 51** | Weekly offers | Check ($20 min) |
| **CoinOut** | Any receipt | Cash |
| **Upside** | Gas & groceries | PayPal |

> 💡 Tip: Scan the same receipt to multiple apps to maximize earnings!

---

## 📄 LICENSE

MIT License - feel free to use, modify, and distribute.

---

## 🙏 CREDITS

- AI powered by [OpenRouter](https://openrouter.ai)
- Food data from [Open Food Facts](https://world.openfoodfacts.org)
- Deployed on [Vercel](https://vercel.com)

---

**Happy shopping! 🛒🥗**