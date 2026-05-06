# FreshCart - AI Meal & Deal Planner

A smart grocery/meal planning web app with real deal-finding, coupon stacking, and AI-powered suggestions.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/Baloo8721/PantryAi.git
cd PantryAi

# Open in browser (or serve locally)
open index.html
```

## Deployment

**GitHub Pages** - Already enabled:
- URL: `https://baloo8721.github.io/PantryAi/`

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
| Database | localStorage (offline-first) |
| AI | OpenRouter API |
| Hosting | GitHub Pages (free) |
| External APIs | Kroger Developer API, Flipp API, Amazon PA-API |

**No build step required** - just push `index.html` and it works.

---

## API Keys Required

### OpenRouter (AI Chat + Meal Suggestions)
1. Go to https://openrouter.ai/keys
2. Create a free account
3. Copy your API key
4. Paste in app: Settings → Enter API key

**Free models available:**
- `mistralai/mistral-7b-instruct`
- `google/gemma-3-4b-it`
- `meta-llama/llama-3-8b-instruct`

### Grocery APIs (Phase 2 - Not yet implemented)
These are optional for Phase 1 (using mock data):

| API | Purpose | Free Tier |
|-----|---------|-----------|
| [Kroger Developer](https://developer.kroger.com/) | Product pricing, store search | Yes |
| [Flipp](https://partner.flipp.com/) | Weekly store flyers, coupons | Partner approval |
| [Amazon PA-API](https://affiliate-program.amazon.com/) | Household items, cleaning supplies | Affiliate account |

---

## Features

| Feature | Status | Notes |
|---------|--------|-------|
| Fridge Inventory | ✅ Ready | Add/remove items, persists in localStorage |
| Meal Planning | ✅ Ready | Mediterranean diet preset, scales by # people |
| Shopping List | ✅ Ready | Auto-generates from meal plan |
| Store Deals | ✅ Ready | Mock data for Publix, Aldi, Greenwise, Amazon |
| Coupon Stacking | ✅ Ready | Simulates BOGO + % off savings |
| AI Chat | ⚠️ Needs key | OpenRouter API key required |
| Live API Data | 🔄 Phase 2 | Connect real Kroger/Flipp/Amazon APIs |

---

## File Structure

```
PantryAi/
├── index.html      # Complete app (all CSS/JS inline)
├── README.md      # This file
├── SPEC.md        # Project specification
└── .gitignore
```

---

## How It Works

1. **Add items to your fridge** - Type ingredients you have
2. **Generate meal plan** - App suggests meals based on Mediterranean diet
3. **Shopping list auto-populates** - Items you need to buy
4. **Apply coupons** - Click to stack deals on matching items
5. **AI Assistant** - Ask questions about recipes, substitutions, deals

All data saves to your browser's localStorage - no login required, works offline.

---

## Customization

### Add more recipes
Edit the `RECIPES` array in index.html:
```javascript
const RECIPES = [
  { name: "Your Recipe", ingredients: ["item1", "item2"], baseServings: 2 },
  // ...
];
```

### Add more store deals
Edit `STORE_DEALS` object with real data from APIs.

### Change diet presets
Modify `dietProfile` variable and add custom restrictions.

---

## Troubleshooting

**AI chat not working:**
- Go to Settings → Enter your OpenRouter API key
- Make sure you have credits (free models available)

**Changes not showing:**
- Force refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

**Want to reset all data:**
- Open browser dev tools → Application → Clear localStorage

---

## Credits & Inspiration

Built with design inspiration from:
- Modern dashboard UI patterns
- Coupon stacking logic from retail apps

AI powered by OpenRouter - supports 100+ free models.

---

## Contact

For issues or questions, open a GitHub issue or reach out directly.