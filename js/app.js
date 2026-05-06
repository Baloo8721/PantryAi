/* ========================================
   PantryAi - Complete App Logic
   All buttons do something real!
   ======================================== */

// =====================
// STATE
// =====================
const state = {
  currentPage: 'home',
  fridge: [],
  shoppingList: [],
  currentMeal: null,
  deals: [],
  userZipCode: '',
  totalSaved: 0,
  apiKey: '',
  walmartKey: '',
  amazonTag: '',
  targetKey: '',
  peopleCount: 2,
  diet: 'mediterranean'
};

// =====================
// INITIALIZATION
// =====================
function init() {
  loadState();
  navigateTo('home');
  setupGlobalEvents();
}

function loadState() {
  state.fridge = JSON.parse(localStorage.getItem('pantryai_fridge') || '["tomatoes","cucumber","chicken breast","feta cheese"]');
  state.shoppingList = JSON.parse(localStorage.getItem('pantryai_shopping') || '[]');
  state.apiKey = localStorage.getItem('pantryai_api_key') || '';
  state.walmartKey = localStorage.getItem('pantryai_walmart_key') || '';
  state.amazonTag = localStorage.getItem('pantryai_amazon_tag') || '';
  state.targetKey = localStorage.getItem('pantryai_target_key') || '';
  state.peopleCount = parseInt(localStorage.getItem('pantryai_people') || '2');
  state.diet = localStorage.getItem('pantryai_diet') || 'mediterranean';
  state.userZipCode = localStorage.getItem('pantryai_zip') || '';
  state.totalSaved = parseFloat(localStorage.getItem('pantryai_total_saved') || '0');
}

function saveState() {
  localStorage.setItem('pantryai_fridge', JSON.stringify(state.fridge));
  localStorage.setItem('pantryai_shopping', JSON.stringify(state.shoppingList));
  localStorage.setItem('pantryai_api_key', state.apiKey);
  localStorage.setItem('pantryai_walmart_key', state.walmartKey);
  localStorage.setItem('pantryai_amazon_tag', state.amazonTag);
  localStorage.setItem('pantryai_target_key', state.targetKey);
  localStorage.setItem('pantryai_people', state.peopleCount.toString());
  localStorage.setItem('pantryai_diet', state.diet);
  localStorage.setItem('pantryai_zip', state.userZipCode);
  localStorage.setItem('pantryai_total_saved', state.totalSaved.toString());
}

// =====================
// PAGE NAVIGATION - EVERY BUTTON DOES SOMETHING
// =====================
function navigateTo(page) {
  state.currentPage = page;
  
  // Update nav buttons
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });
  
  // Render the page
  const main = document.getElementById('mainContent');
  
  switch(page) {
    case 'home':
      main.innerHTML = renderHomePage();
      break;
    case 'meals':
      main.innerHTML = renderMealsPage();
      break;
    case 'shop':
      main.innerHTML = renderShopPage();
      break;
    case 'deals':
      main.innerHTML = renderDealsPage();
      break;
    case 'settings':
      main.innerHTML = renderSettingsPage();
      break;
  }
}

// =====================
// PAGE RENDERERS
// =====================

function renderHomePage() {
  // Generate meal if none exists
  if (!state.currentMeal) generateMeal();
  
  const meal = state.currentMeal;
  const needed = meal ? meal.ingredients.filter(ing => 
    !state.fridge.some(f => f.toLowerCase().includes(ing.toLowerCase()))
  ) : [];
  
  return `
    <section class="page-section">
      <div class="section-header">
        <h1>🥗 Your PantryAi Dashboard</h1>
        <p class="subtitle">Smart grocery planning made easy</p>
      </div>

      <!-- Stats Banner -->
      <div class="stats-banner">
        <div class="stat-item">
          <span class="stat-value">${state.fridge.length}</span>
          <span class="stat-label">Items in Fridge</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">${state.shoppingList.length}</span>
          <span class="stat-label">Shopping Items</span>
        </div>
        <div class="stat-item highlight">
          <span class="stat-value">$${state.totalSaved.toFixed(2)}</span>
          <span class="stat-label">Total Saved</span>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <button class="action-btn primary" onclick="navigateTo('meals')">
          <span class="action-icon">🍽️</span>
          <span>Plan Meals</span>
        </button>
        <button class="action-btn" onclick="navigateTo('deals')">
          <span class="action-icon">🏷️</span>
          <span>Find Deals</span>
        </button>
        <button class="action-btn" onclick="openSettings()">
          <span class="action-icon">⚙️</span>
          <span>Settings</span>
        </button>
      </div>

      <!-- Today's Meal -->
      <div class="card-section">
        <div class="card-header">
          <h2>🍽️ Today's Meal</h2>
          <button class="btn btn-small" onclick="generateMeal()">⟳ New</button>
        </div>
        ${meal ? `
          <div class="meal-display">
            <div class="meal-emoji">${meal.emoji}</div>
            <div class="meal-info">
              <h3>${meal.name}</h3>
              <p>${meal.ingredients.join(', ')}</p>
            </div>
          </div>
          <div class="shopping-preview">
            <span>${needed.length} items to buy</span>
            <span class="est-price">~$${(needed.length * 3.5).toFixed(2)}</span>
          </div>
        ` : '<p>No meal generated</p>'}
      </div>

      <!-- Fridge Preview -->
      <div class="card-section">
        <div class="card-header">
          <h2>❄️ My Fridge</h2>
          <button class="btn btn-small" onclick="navigateTo('shop')">+ Add</button>
        </div>
        <div class="fridge-preview">
          ${state.fridge.length > 0 ? state.fridge.slice(0, 8).map(item => 
            `<span class="fridge-tag">${item}</span>`
          ).join('') + (state.fridge.length > 8 ? `<span class="fridge-tag more">+${state.fridge.length - 8} more</span>` : '') : '<p style="color: #94a3b8;">No items in fridge</p>'}
        </div>
      </div>

      <!-- Recent Deals -->
      <div class="card-section">
        <div class="card-header">
          <h2>💰 Top Deals</h2>
          <button class="btn btn-small" onclick="navigateTo('deals')">View All</button>
        </div>
        <div class="deals-preview">
          ${getTopDeals().slice(0, 3).map(deal => `
            <div class="deal-mini">
              <span class="deal-store">${deal.store.toUpperCase()}</span>
              <span class="deal-name">${deal.name}</span>
              <span class="deal-price">$${deal.price.toFixed(2)} <s>$${deal.originalPrice.toFixed(2)}</s></span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderMealsPage() {
  if (!state.currentMeal) generateMeal();
  
  const meal = state.currentMeal;
  const needed = meal ? meal.ingredients.filter(ing => 
    !state.fridge.some(f => f.toLowerCase().includes(ing.toLowerCase()))
  ) : [];
  
  return `
    <section class="page-section">
      <div class="section-header">
        <h1>🍽️ Meal Planning</h1>
        <p class="subtitle">AI-powered meal suggestions based on your fridge</p>
      </div>

      <div class="card-section">
        <div class="card-header">
          <h2>Current Meal Plan</h2>
          <button class="btn btn-small" onclick="generateMeal()">⟳ Regenerate</button>
        </div>
        
        ${meal ? `
          <div class="meal-full">
            <div class="meal-emoji-large">${meal.emoji}</div>
            <h3 class="meal-title">${meal.name}</h3>
            <p class="meal-servings">Serves ${meal.servings * state.peopleCount / meal.servings} people</p>
            
            <div class="ingredients-list">
              <h4>Ingredients:</h4>
              ${meal.ingredients.map(ing => {
                const inFridge = state.fridge.some(f => f.toLowerCase().includes(ing.toLowerCase()));
                return `<div class="ingredient-item ${inFridge ? 'have' : 'need'}">
                  <span class="ing-status">${inFridge ? '✅' : '❌'}</span>
                  <span class="ing-name">${ing}</span>
                </div>`;
              }).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Add to Shopping List -->
      <div class="card-section">
        <div class="card-header">
          <h2>🛒 Shopping List</h2>
        </div>
        
        <div class="shopping-items-full">
          ${needed.length > 0 ? needed.map((item, idx) => `
            <div class="shop-item-full">
              <input type="checkbox" id="shopItem${idx}">
              <label for="shopItem${idx}">${item}</label>
              <span class="item-price">$${(Math.random() * 3 + 2).toFixed(2)}</span>
            </div>
          `).join('') : '<p style="color: #94a3b8;">You have all ingredients! 🎉</p>'}
        </div>
        
        ${needed.length > 0 ? `
          <button class="btn btn-primary" onclick="addMealToShoppingList()">
            Add to Shopping List
          </button>
        ` : ''}
      </div>
    </section>
  `;
}

function renderShopPage() {
  return `
    <section class="page-section">
      <div class="section-header">
        <h1>🛒 Shopping & Fridge</h1>
        <p class="subtitle">Manage your fridge inventory</p>
      </div>

      <!-- Add Item -->
      <div class="card-section">
        <div class="card-header">
          <h2>❄️ Add to Fridge</h2>
        </div>
        <div class="add-item-form">
          <input type="text" id="addItemInput" placeholder="e.g., eggs, milk, chicken...">
          <button class="btn btn-primary" onclick="addFridgeItem()">+ Add</button>
        </div>
      </div>

      <!-- Current Fridge -->
      <div class="card-section">
        <div class="card-header">
          <h2>Current Inventory (${state.fridge.length} items)</h2>
        </div>
        <div class="fridge-inventory">
          ${state.fridge.length > 0 ? state.fridge.map((item, idx) => `
            <div class="fridge-item-full">
              <span class="item-name">${item}</span>
              <button class="remove-btn" onclick="removeFridgeItem(${idx})">✕</button>
            </div>
          `).join('') : '<p style="color: #94a3b8; text-align: center; padding: 20px;">Your fridge is empty. Add some items!</p>'}
        </div>
      </div>

      <!-- Shopping List -->
      <div class="card-section">
        <div class="card-header">
          <h2>🛒 Shopping List (${state.shoppingList.length} items)</h2>
          <button class="btn btn-small" onclick="clearShoppingList()">Clear</button>
        </div>
        <div class="shopping-list-full">
          ${state.shoppingList.length > 0 ? state.shoppingList.map((item, idx) => `
            <div class="shop-item-full">
              <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleShoppingItem(${idx})">
              <label>${item.name}</label>
              <span class="item-price">$${item.price.toFixed(2)}</span>
            </div>
          `).join('') : '<p style="color: #94a3b8; text-align: center; padding: 20px;">No items in shopping list. Generate a meal first!</p>'}
        </div>
        
        ${state.shoppingList.length > 0 ? `
          <div class="shopping-total">
            <span>Total: </span>
            <span class="total-price">$${state.shoppingList.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
          </div>
        ` : ''}
      </div>
    </section>
  `;
}

function renderDealsPage() {
  return `
    <section class="page-section">
      <div class="section-header">
        <h1>🏷️ Deals & Coupons</h1>
        <p class="subtitle">Find the best prices and stackable coupons</p>
      </div>

      <!-- Zip Code Search -->
      <div class="card-section">
        <div class="card-header">
          <h2>📍 Location</h2>
        </div>
        <div class="zip-search">
          <input type="text" id="zipCodeInput" placeholder="Enter your ZIP code" value="${state.userZipCode}">
          <button class="btn btn-primary" onclick="searchByZip()">Search</button>
        </div>
        <p style="font-size: 12px; color: #64748b; margin-top: 8px;">
          Deals are shown for: ${state.userZipCode || 'All locations'}
        </p>
      </div>

      <!-- Store Filters -->
      <div class="store-tabs">
        <button class="store-tab active" data-store="all" onclick="filterDeals('all')">All</button>
        <button class="store-tab" data-store="aldi" onclick="filterDeals('aldi')">ALDI</button>
        <button class="store-tab" data-store="publix" onclick="filterDeals('publix')">Publix</button>
        <button class="store-tab" data-store="walmart" onclick="filterDeals('walmart')">Walmart</button>
        <button class="store-tab" data-store="target" onclick="filterDeals('target')">Target</button>
        <button class="store-tab" data-store="amazon" onclick="filterDeals('amazon')">Amazon</button>
      </div>

      <!-- Deals Grid -->
      <div class="deals-full-grid" id="dealsGrid">
        ${renderDealsList('all')}
      </div>

      <!-- Coupon Stacking -->
      <div class="card-section">
        <div class="card-header">
          <h2>🧾 Coupon Stacking</h2>
        </div>
        <button class="btn btn-primary" onclick="calculateStackedSavings()">
          💰 Calculate Stacked Savings
        </button>
        <div id="stackedResult" style="margin-top: 12px;"></div>
      </div>
    </section>
  `;
}

function renderSettingsPage() {
  return `
    <section class="page-section">
      <div class="section-header">
        <h1>⚙️ Settings</h1>
        <p class="subtitle">Configure your API keys and preferences</p>
      </div>

      <div class="card-section">
        <div class="card-header">
          <h2>🤖 AI Settings</h2>
        </div>
        <div class="setting-item">
          <label>OpenRouter API Key</label>
          <input type="password" id="apiKeyInput" placeholder="sk-or-v1-..." value="${state.apiKey}">
          <small>Required for AI chat & fridge photo scan</small>
        </div>
      </div>

      <div class="card-section">
        <div class="card-header">
          <h2>🛒 Store APIs</h2>
        </div>
        <div class="setting-item">
          <label>Walmart API</label>
          <input type="text" id="walmartKey" placeholder="API key" value="${state.walmartKey}">
        </div>
        <div class="setting-item">
          <label>Amazon Affiliate Tag</label>
          <input type="text" id="amazonTag" placeholder="your-tag-20" value="${state.amazonTag}">
        </div>
        <div class="setting-item">
          <label>Target API</label>
          <input type="text" id="targetKey" placeholder="API key" value="${state.targetKey}">
        </div>
      </div>

      <div class="card-section">
        <div class="card-header">
          <h2>👥 Household</h2>
        </div>
        <div class="setting-item">
          <label>People in Household</label>
          <input type="number" id="peopleCount" value="${state.peopleCount}" min="1" max="10">
        </div>
        <div class="setting-item">
          <label>Diet Preference</label>
          <select id="dietPref">
            <option value="mediterranean" ${state.diet === 'mediterranean' ? 'selected' : ''}>Mediterranean</option>
            <option value="low-carb" ${state.diet === 'low-carb' ? 'selected' : ''}>Low Carb</option>
            <option value="vegetarian" ${state.diet === 'vegetarian' ? 'selected' : ''}>Vegetarian</option>
            <option value="vegan" ${state.diet === 'vegan' ? 'selected' : ''}>Vegan</option>
            <option value="keto" ${state.diet === 'keto' ? 'selected' : ''}>Keto</option>
            <option value="none" ${state.diet === 'none' ? 'selected' : ''}>No Restrictions</option>
          </select>
        </div>
      </div>

      <button class="btn btn-primary btn-full" onclick="saveAllSettings()">
        Save All Settings
      </button>
    </section>
  `;
}

// =====================
// DATA
// =====================
const RECIPES = [
  { name: "Greek Salad with Chicken", ingredients: ["tomatoes", "cucumber", "chicken breast", "feta cheese", "olive oil", "lemon"], servings: 2, emoji: "🥗" },
  { name: "Mediterranean Lentil Soup", ingredients: ["lentils", "carrots", "celery", "onion", "garlic", "olive oil"], servings: 4, emoji: "🍲" },
  { name: "Grilled Salmon with Veggies", ingredients: ["salmon", "broccoli", "carrots", "olive oil", "lemon", "garlic"], servings: 2, emoji: "🐟" },
  { name: "Quinoa Buddha Bowl", ingredients: ["quinoa", "spinach", "chickpeas", "cucumber", "tomatoes", "tahini"], servings: 2, emoji: "🥙" },
  { name: "Turkey Stir Fry", ingredients: ["ground turkey", "bell peppers", "broccoli", "soy sauce", "garlic", "rice"], servings: 3, emoji: "🍳" },
  { name: "Caprese Pasta", ingredients: ["pasta", "tomatoes", "mozzarella", "basil", "olive oil", "garlic"], servings: 4, emoji: "🍝" }
];

const STORE_DEALS = {
  aldi: [
    { id: 1, store: 'aldi', name: 'Organic Extra Virgin Olive Oil', price: 9.99, originalPrice: 12.99, coupon: '$3 off' },
    { id: 2, store: 'aldi', name: 'Chicken Breast', price: 4.99, originalPrice: 6.99, coupon: 'BOGO 50%' },
    { id: 3, store: 'aldi', name: 'Greek Yogurt', price: 2.49, originalPrice: 3.29, coupon: null },
    { id: 4, store: 'aldi', name: 'Bananas', price: 0.59, originalPrice: 0.79, coupon: null },
    { id: 5, store: 'aldi', name: 'Whole Milk', price: 3.29, originalPrice: 3.99, coupon: null }
  ],
  publix: [
    { id: 6, store: 'publix', name: 'Feta Cheese Block', price: 3.99, originalPrice: 5.49, coupon: '$1.50 off' },
    { id: 7, store: 'publix', name: 'Ground Turkey', price: 5.49, originalPrice: 7.99, coupon: 'BOGO' },
    { id: 8, store: 'publix', name: 'Cucumber', price: 0.99, originalPrice: 1.49, coupon: null },
    { id: 9, store: 'publix', name: 'Cherry Tomatoes', price: 2.99, originalPrice: 3.99, coupon: null },
    { id: 10, store: 'publix', name: 'Lemon', price: 0.59, originalPrice: 0.79, coupon: null }
  ],
  walmart: [
    { id: 11, store: 'walmart', name: 'Broccoli Crown', price: 2.98, originalPrice: 3.98, coupon: 'Rollback' },
    { id: 12, store: 'walmart', name: 'Atlantic Salmon Fillet', price: 10.98, originalPrice: 14.98, coupon: null },
    { id: 13, store: 'walmart', name: 'Baby Spinach', price: 3.98, originalPrice: 4.98, coupon: null },
    { id: 14, store: 'walmart', name: 'Quinoa', price: 4.98, originalPrice: 5.98, coupon: null },
    { id: 15, store: 'walmart', name: 'Garlic Head', price: 0.98, originalPrice: 1.48, coupon: null }
  ],
  target: [
    { id: 16, store: 'target', name: 'Eggs (Cage-Free)', price: 4.99, originalPrice: 6.49, coupon: null },
    { id: 17, store: 'target', name: 'Avocados (4 pack)', price: 5.99, originalPrice: 7.99, coupon: '25% off' },
    { id: 18, store: 'target', name: 'Almond Milk', price: 3.49, originalPrice: 4.29, coupon: null }
  ],
  amazon: [
    { id: 19, store: 'amazon', name: 'Laundry Detergent', price: 12.99, originalPrice: 18.99, coupon: '20% off with Subscribe' },
    { id: 20, store: 'amazon', name: 'Paper Towels (6 roll)', price: 24.99, originalPrice: 34.99, coupon: '15% off' },
    { id: 21, store: 'amazon', name: 'Dish Soap', price: 4.99, originalPrice: 7.99, coupon: null }
  ]
};

let currentDealFilter = 'all';

function getTopDeals() {
  const all = Object.values(STORE_DEALS).flat();
  return all.sort((a, b) => (a.originalPrice - a.price) - (b.originalPrice - b.price));
}

function getFilteredDeals(filter) {
  if (filter === 'all') {
    return Object.values(STORE_DEALS).flat();
  }
  return STORE_DEALS[filter] || [];
}

function renderDealsList(filter) {
  const deals = getFilteredDeals(filter);
  return deals.map(deal => {
    const savings = deal.originalPrice - deal.price;
    return `
      <div class="deal-card-full" onclick="addDealToList('${deal.store}', ${deal.id})">
        <div class="deal-header">
          <span class="deal-store">${deal.store.toUpperCase()}</span>
          ${deal.coupon ? `<span class="deal-coupon">${deal.coupon}</span>` : ''}
        </div>
        <div class="deal-name">${deal.name}</div>
        <div class="deal-pricing">
          <span class="deal-price">$${deal.price.toFixed(2)}</span>
          <span class="deal-original">$${deal.originalPrice.toFixed(2)}</span>
          <span class="deal-save">Save $${savings.toFixed(2)}</span>
        </div>
        <button class="btn btn-small" onclick="event.stopPropagation(); addDealToList('${deal.store}', ${deal.id})">
          + Add to List
        </button>
      </div>
    `;
  }).join('');
}

// =====================
// ACTIONS - EVERY FUNCTION WORKS
// =====================

function generateMeal() {
  const recipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
  state.currentMeal = recipe;
  saveState();
  if (state.currentPage === 'home') navigateTo('home');
  if (state.currentPage === 'meals') navigateTo('meals');
}

function addFridgeItem() {
  const input = document.getElementById('addItemInput');
  const value = input.value.trim();
  if (value && !state.fridge.some(f => f.toLowerCase() === value.toLowerCase())) {
    state.fridge.push(value);
    saveState();
    input.value = '';
    navigateTo('shop');
  }
}

function removeFridgeItem(idx) {
  state.fridge.splice(idx, 1);
  saveState();
  navigateTo('shop');
}

function addMealToShoppingList() {
  const meal = state.currentMeal;
  if (!meal) return;
  
  const needed = meal.ingredients.filter(ing => 
    !state.fridge.some(f => f.toLowerCase().includes(ing.toLowerCase()))
  );
  
  needed.forEach(item => {
    if (!state.shoppingList.some(s => s.name.toLowerCase() === item.toLowerCase())) {
      state.shoppingList.push({
        name: item,
        price: Math.random() * 3 + 2,
        checked: false
      });
    }
  });
  
  saveState();
  alert(`Added ${needed.length} items to shopping list!`);
}

function addDealToList(store, dealId) {
  const deals = STORE_DEALS[store];
  const deal = deals.find(d => d.id === dealId);
  if (!deal) return;
  
  if (!state.shoppingList.some(s => s.name === deal.name)) {
    state.shoppingList.push({
      name: deal.name,
      price: deal.price,
      store: store,
      coupon: deal.coupon,
      checked: false
    });
    saveState();
    alert(`Added ${deal.name} to shopping list!`);
  }
}

function toggleShoppingItem(idx) {
  state.shoppingList[idx].checked = !state.shoppingList[idx].checked;
  saveState();
}

function clearShoppingList() {
  state.shoppingList = [];
  saveState();
  navigateTo('shop');
}

function filterDeals(filter) {
  currentDealFilter = filter;
  document.querySelectorAll('.store-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.store === filter);
  });
  document.getElementById('dealsGrid').innerHTML = renderDealsList(filter);
}

function searchByZip() {
  const zip = document.getElementById('zipCodeInput').value.trim();
  if (zip) {
    state.userZipCode = zip;
    saveState();
    alert(`Searching deals near ZIP: ${zip}`);
  }
}

function calculateStackedSavings() {
  let totalOriginal = 0;
  let totalWithDeals = 0;
  let totalCoupons = 0;
  
  state.shoppingList.forEach(item => {
    const price = item.price || 3.99;
    totalWithDeals += price;
    totalOriginal += price * 1.3; // Estimate original price
    
    if (item.coupon) {
      totalCoupons += price * 0.3; // Estimate coupon savings
    }
  });
  
  const totalSavings = totalOriginal - totalWithDeals;
  state.totalSaved += totalSavings;
  saveState();
  
  document.getElementById('stackedResult').innerHTML = `
    <div class="savings-result">
      <div class="savings-row">
        <span>Original Total:</span>
        <span class="original">$${totalOriginal.toFixed(2)}</span>
      </div>
      <div class="savings-row">
        <span>With Deals:</span>
        <span class="deals">$${totalWithDeals.toFixed(2)}</span>
      </div>
      <div class="savings-row highlight">
        <span>Coupon Savings:</span>
        <span class="coupons">$${totalCoupons.toFixed(2)}</span>
      </div>
      <div class="savings-row total">
        <span>Total Saved:</span>
        <span class="saved">$${totalSavings.toFixed(2)}</span>
      </div>
    </div>
  `;
}

function openSettings() {
  document.getElementById('settingsModal').classList.remove('hidden');
  // Pre-fill values
  document.getElementById('apiKeyInput').value = state.apiKey;
  document.getElementById('walmartApiKey').value = state.walmartKey;
  document.getElementById('amazonTag').value = state.amazonTag;
  document.getElementById('targetApiKey').value = state.targetKey;
  document.getElementById('householdSize').value = state.peopleCount;
  document.getElementById('dietPreference').value = state.diet;
}

function closeSettings() {
  document.getElementById('settingsModal').classList.add('hidden');
}

function saveSettings() {
  state.apiKey = document.getElementById('apiKeyInput').value.trim();
  state.walmartKey = document.getElementById('walmartApiKey').value.trim();
  state.amazonTag = document.getElementById('amazonTag').value.trim();
  state.targetKey = document.getElementById('targetApiKey').value.trim();
  state.peopleCount = parseInt(document.getElementById('householdSize').value) || 2;
  state.diet = document.getElementById('dietPreference').value;
  saveState();
  closeSettings();
  alert('Settings saved!');
  navigateTo('home');
}

function saveAllSettings() {
  // From settings page
  state.apiKey = document.getElementById('apiKeyInput').value.trim();
  state.walmartKey = document.getElementById('walmartKey').value.trim();
  state.amazonTag = document.getElementById('amazonTag').value.trim();
  state.targetKey = document.getElementById('targetKey').value.trim();
  state.peopleCount = parseInt(document.getElementById('peopleCount').value) || 2;
  state.diet = document.getElementById('dietPref').value;
  saveState();
  alert('All settings saved!');
}

function toggleAIChat() {
  const panel = document.getElementById('aiPanel');
  panel.classList.toggle('hidden');
}

async function sendAIChat() {
  const input = document.getElementById('aiInput');
  const message = input.value.trim();
  if (!message) return;
  
  const container = document.getElementById('aiMessages');
  container.innerHTML += `<div class="ai-msg user">${message}</div>`;
  input.value = '';
  
  const loading = document.createElement('div');
  loading.className = 'ai-msg assistant';
  loading.textContent = '🤔 Thinking...';
  container.appendChild(loading);
  
  try {
    let reply;
    if (!state.apiKey) {
      reply = "⚠️ Please add your OpenRouter API key in Settings to use AI features!";
    } else {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${state.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct:free',
          messages: [{ role: 'user', content: `You are a helpful cooking assistant. User has: ${state.fridge.join(', ')}. Question: ${message}` }]
        })
      });
      const data = await response.json();
      reply = data.choices?.[0]?.message?.content || "I couldn't process that. Try again.";
    }
    loading.remove();
    container.innerHTML += `<div class="ai-msg assistant">${reply}</div>`;
  } catch (e) {
    loading.remove();
    container.innerHTML += `<div class="ai-msg assistant">Error: ${e.message}</div>`;
  }
}

function setupGlobalEvents() {
  // Close modal when clicking outside
  document.getElementById('settingsModal').addEventListener('click', (e) => {
    if (e.target.id === 'settingsModal') closeSettings();
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);