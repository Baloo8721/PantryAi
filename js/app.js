/* ========================================
   FreshCart/PantryAi - Main App Logic
   ======================================== */

// =====================
// STATE
// =====================
const state = {
  fridge: [],
  shoppingList: [],
  currentMeal: null,
  deals: [],
  apiKey: '',
  krogerClientId: '',
  krogerClientSecret: '',
  krogerToken: '',
  peopleCount: 2,
  diet: 'mediterranean',
  currentStoreFilter: 'all'
};

// =====================
// RECIPES DATA
// =====================
const RECIPES = [
  { name: "Greek Salad with Chicken", ingredients: ["tomatoes", "cucumber", "chicken breast", "feta cheese", "olive oil", "lemon"], servings: 2, emoji: "🥗" },
  { name: "Mediterranean Lentil Soup", ingredients: ["lentils", "carrots", "celery", "onion", "garlic", "olive oil"], servings: 4, emoji: "🍲" },
  { name: "Grilled Salmon with Veggies", ingredients: ["salmon", "broccoli", "carrots", "olive oil", "lemon", "garlic"], servings: 2, emoji: "🐟" },
  { name: "Quinoa Buddha Bowl", ingredients: ["quinoa", "spinach", "chickpeas", "cucumber", "tomatoes", "tahini"], servings: 2, emoji: "🥙" },
  { name: "Turkey Stir Fry", ingredients: ["ground turkey", "bell peppers", "broccoli", "soy sauce", "garlic", "rice"], servings: 3, emoji: "🍳" },
  { name: "Caprese Pasta", ingredients: ["pasta", "tomatoes", "mozzarella", "basil", "olive oil", "garlic"], servings: 4, emoji: "🍝" }
];

// =====================
// DEALS DATA (Mock - will connect to real APIs later)
// =====================
const STORE_DEALS = {
  aldi: [
    { id: 1, store: 'aldi', name: 'Organic Extra Virgin Olive Oil', price: 9.99, originalPrice: 12.99, unit: '500ml', image: 'https://images.openfoodfacts.org/placeholder.jpg', coupon: '$3 off' },
    { id: 2, store: 'aldi', name: 'Chicken Breast', price: 4.99, originalPrice: 6.99, unit: 'lb', image: '', coupon: 'BOGO 50%' },
    { id: 3, store: 'aldi', name: 'Greek Yogurt', price: 2.49, originalPrice: 3.29, unit: '32oz', image: '', coupon: null },
    { id: 4, store: 'aldi', name: 'Bananas', price: 0.59, originalPrice: 0.79, unit: 'lb', image: '', coupon: null },
    { id: 5, store: 'aldi', name: 'Whole Milk', price: 3.29, originalPrice: 3.99, unit: 'gallon', image: '', coupon: null }
  ],
  publix: [
    { id: 6, store: 'publix', name: 'Feta Cheese Block', price: 3.99, originalPrice: 5.49, unit: '8oz', image: '', coupon: '$1.50 off' },
    { id: 7, store: 'publix', name: 'Ground Turkey', price: 5.49, originalPrice: 7.99, unit: 'lb', image: '', coupon: 'BOGO' },
    { id: 8, store: 'publix', name: 'Cucumber', price: 0.99, originalPrice: 1.49, unit: 'each', image: '', coupon: null },
    { id: 9, store: 'publix', name: 'Cherry Tomatoes', price: 2.99, originalPrice: 3.99, unit: 'pint', image: '', coupon: null },
    { id: 10, store: 'publix', name: 'Lemon', price: 0.59, originalPrice: 0.79, unit: 'each', image: '', null }
  ],
  walmart: [
    { id: 11, store: 'walmart', name: 'Broccoli Crown', price: 2.98, originalPrice: 3.98, unit: 'lb', image: '', coupon: 'Rollback' },
    { id: 12, store: 'walmart', name: 'Atlantic Salmon Fillet', price: 10.98, originalPrice: 14.98, unit: 'lb', image: '', coupon: null },
    { id: 13, store: 'walmart', name: 'Baby Spinach', price: 3.98, originalPrice: 4.98, unit: '5oz', image: '', coupon: null },
    { id: 14, store: 'walmart', name: 'Quinoa', price: 4.98, originalPrice: 5.98, unit: '32oz', image: '', coupon: null },
    { id: 15, store: 'walmart', name: 'Garlic Head', price: 0.98, originalPrice: 1.48, unit: 'each', image: '', coupon: null }
  ],
  kroger: [
    { id: 16, store: 'kroger', name: 'Chickpeas (Canned)', price: 1.49, originalPrice: 1.99, unit: '15oz', image: '', coupon: null },
    { id: 17, store: 'kroger', name: 'Tahini', price: 6.99, originalPrice: 8.99, unit: '16oz', image: '', coupon: '$2 off' },
    { id: 18, store: 'kroger', name: 'Bell Peppers Mix', price: 2.99, originalPrice: 3.99, unit: '3 pack', image: '', coupon: null },
    { id: 19, store: 'kroger', name: 'Brown Rice', price: 3.49, originalPrice: 4.29, unit: '2lb', image: '', coupon: null },
    { id: 20, store: 'kroger', name: 'Mozzarella Shredded', price: 4.29, originalPrice: 5.49, unit: '8oz', image: '', coupon: null }
  ]
};

// =====================
// FOOD EMOJIS FOR FRIDGE
// =====================
const FOOD_EMOJIS = {
  'tomatoes': '🍅', 'tomato': '🍅',
  'cucumber': '🥒', 'cucumbers': '🥒',
  'chicken': '🍗', 'chicken breast': '🍗',
  'feta': '🧀', 'feta cheese': '🧀',
  'olive oil': '🫒', 'oil': '🫒',
  'lemon': '🍋', 'lemons': '🍋',
  'garlic': '🧄',
  'onion': '🧅', 'onions': '🧅',
  'carrots': '🥕', 'carrot': '🥕',
  'celery': '🥬',
  'spinach': '🥬', 'spinach': '🥬',
  'broccoli': '🥦',
  'salmon': '🐟', 'fish': '🐟',
  'eggs': '🥚', 'egg': '🥚',
  'milk': '🥛',
  'cheese': '🧀',
  'bread': '🍞',
  'rice': '🍚',
  'pasta': '🍝',
  'quinoa': '🌾',
  'lettuce': '🥬',
  'avocado': '🥑',
  'banana': '🍌', 'bananas': '🍌',
  'apple': '🍎', 'apples': '🍎',
  'orange': '🍊', 'oranges': '🍊',
  'potato': '🥔', 'potatoes': '🥔',
  'pepper': '🫑', 'peppers': '🫑', 'bell pepper': '🫑',
  'mushroom': '🍄', 'mushrooms': '🍄',
  'corn': '🌽',
  'beans': '🫘', 'black beans': '🫘',
  'chickpeas': '🫘', 'chickpeas': '🫘',
  'lentils': '🫘',
  'yogurt': '🥛', 'greek yogurt': '🥛',
  'butter': '🧈',
  'bacon': '🥓',
  'steak': '🥩', 'beef': '🥩',
  'pork': '🥓',
  'shrimp': '🦐',
  'tofu': '🧈',
  'default': '🥦'
};

function getFoodEmoji(food) {
  const lower = food.toLowerCase();
  for (const [key, emoji] of Object.entries(FOOD_EMOJIS)) {
    if (lower.includes(key)) return emoji;
  }
  return FOOD_EMOJIS.default;
}

// =====================
// INITIALIZATION
// =====================
function init() {
  loadState();
  renderAll();
  setupEventListeners();
  generateMeal();
}

// =====================
// STATE MANAGEMENT
// =====================
function loadState() {
  state.fridge = JSON.parse(localStorage.getItem('pantryai_fridge') || '["tomatoes","cucumber","olive oil","feta cheese","chicken breast"]');
  state.shoppingList = JSON.parse(localStorage.getItem('pantryai_shopping') || '[]');
  state.apiKey = localStorage.getItem('pantryai_api_key') || '';
  state.krogerClientId = localStorage.getItem('pantryai_kroger_id') || '';
  state.krogerClientSecret = localStorage.getItem('pantryai_kroger_secret') || '';
  state.peopleCount = parseInt(localStorage.getItem('pantryai_people') || '2');
  state.diet = localStorage.getItem('pantryai_diet') || 'mediterranean';
  state.deals = Object.values(STORE_DEALS).flat();
}

function saveState() {
  localStorage.setItem('pantryai_fridge', JSON.stringify(state.fridge));
  localStorage.setItem('pantryai_shopping', JSON.stringify(state.shoppingList));
  localStorage.setItem('pantryai_api_key', state.apiKey);
  localStorage.setItem('pantryai_kroger_id', state.krogerClientId);
  localStorage.setItem('pantryai_kroger_secret', state.krogerClientSecret);
  localStorage.setItem('pantryai_people', state.peopleCount.toString());
  localStorage.setItem('pantryai_diet', state.diet);
}

// =====================
// RENDER FUNCTIONS
// =====================
function renderAll() {
  renderFridge();
  renderShoppingList();
  renderDeals();
  updateShoppingSummary();
}

function renderFridge() {
  const container = document.getElementById('fridgeItems');
  const countEl = document.getElementById('fridgeCount');
  
  if (state.fridge.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="icon">❄️</div><p>Your fridge is empty</p></div>';
    countEl.textContent = '0 items';
    return;
  }
  
  container.innerHTML = state.fridge.map((item, idx) => `
    <div class="fridge-item">
      <span class="emoji">${getFoodEmoji(item)}</span>
      <span>${item}</span>
      <button class="remove-btn" onclick="removeFridgeItem(${idx})">✕</button>
    </div>
  `).join('');
  
  countEl.textContent = `${state.fridge.length} items`;
}

function renderShoppingList() {
  const container = document.getElementById('shoppingList');
  const savingsEl = document.getElementById('totalSavings');
  
  if (state.shoppingList.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="icon">🛒</div><p>Generate a meal to see items</p></div>';
    savingsEl.textContent = '$0.00';
    return;
  }
  
  let totalSavings = 0;
  
  container.innerHTML = state.shoppingList.map((item, idx) => {
    const savings = item.originalPrice ? (item.originalPrice - item.price) : 0;
    totalSavings += savings;
    
    return `
      <div class="shop-item">
        <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleItemCheck(${idx})">
        <div class="item-info">
          <div class="item-name">${item.name}</div>
          <div class="item-stores">${item.stores || 'Any store'}</div>
        </div>
        <div>
          <div class="item-price">$${item.price.toFixed(2)}</div>
          ${item.coupon ? `<span class="coupon-tag">${item.coupon}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');
  
  savingsEl.textContent = `$${totalSavings.toFixed(2)}`;
}

function renderDeals() {
  const container = document.getElementById('dealsGrid');
  let deals = state.deals;
  
  if (state.currentStoreFilter !== 'all') {
    deals = deals.filter(d => d.store === state.currentStoreFilter);
  }
  
  container.innerHTML = deals.map(deal => `
    <div class="deal-card" onclick="addDealToShoppingList(${deal.id})">
      <div class="store-name">${deal.store.toUpperCase()}</div>
      ${deal.image ? `<img class="product-image" src="${deal.image}" alt="${deal.name}" onerror="this.style.display='none'">` : ''}
      <div class="product-name">${deal.name}</div>
      <div class="price-row">
        <span class="original-price">$${deal.originalPrice.toFixed(2)}</span>
        <span class="sale-price">$${deal.price.toFixed(2)}</span>
        ${deal.coupon ? `<span class="coupon-badge">${deal.coupon}</span>` : ''}
      </div>
    </div>
  `).join('');
}

function updateShoppingSummary() {
  const meal = state.currentMeal;
  if (!meal) return;
  
  const needed = meal.ingredients.filter(ing => 
    !state.fridge.some(f => f.toLowerCase().includes(ing.toLowerCase()))
  );
  
  document.getElementById('shoppingSummary').innerHTML = `
    <span class="shopping-count">${needed.length} items to buy</span>
    <span class="shopping-estimate">$${(needed.length * 3.5).toFixed(2)} est.</span>
  `;
}

// =====================
// EVENT HANDLERS
// =====================
function setupEventListeners() {
  // File input for camera
  document.getElementById('cameraUploadArea').addEventListener('click', () => {
    document.getElementById('fileInput').click();
  });
  
  document.getElementById('fileInput').addEventListener('change', handleFileSelect);
  
  // Analyze button
  document.getElementById('analyzeBtn').addEventListener('click', analyzeFridgePhoto);
  
  // Add item
  document.getElementById('addItemBtn').addEventListener('click', addFridgeItem);
  document.getElementById('addItemInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addFridgeItem();
  });
  
  // Store filters
  document.querySelectorAll('.store-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.store-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentStoreFilter = btn.dataset.store;
      renderDeals();
    });
  });
  
  // Apply coupons
  document.getElementById('applyCoupons').addEventListener('click', applyCouponStacking);
  
  // Regenerate meal
  document.getElementById('regenerateMeal').addEventListener('click', generateMeal);
  
  // Settings
  document.getElementById('settingsBtn').addEventListener('click', () => {
    document.getElementById('settingsModal').classList.remove('hidden');
  });
  
  document.getElementById('closeSettings').addEventListener('click', () => {
    document.getElementById('settingsModal').classList.add('hidden');
  });
  
  document.getElementById('saveSettings').addEventListener('click', saveSettings);
  
  // AI Chat
  document.getElementById('aiFab').addEventListener('click', () => {
    document.getElementById('aiPanel').classList.toggle('hidden');
  });
  
  document.getElementById('closeAiPanel').addEventListener('click', () => {
    document.getElementById('aiPanel').classList.add('hidden');
  });
  
  document.getElementById('sendAi').addEventListener('click', sendAIChat);
  document.getElementById('aiInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendAIChat();
  });
  
  // Bottom nav
  document.querySelectorAll('.nav-item').forEach(nav => {
    nav.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      nav.classList.add('active');
    });
  });
}

// =====================
// FRIDGE FUNCTIONS
// =====================
function handleFileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = document.getElementById('previewImage');
    img.src = e.target.result;
    img.classList.remove('hidden');
    document.getElementById('uploadPlaceholder').classList.add('hidden');
    document.getElementById('analyzeBtn').disabled = false;
  };
  reader.readAsDataURL(file);
}

async function analyzeFridgePhoto() {
  if (!state.apiKey) {
    alert('Please add your OpenRouter API key in Settings first!');
    document.getElementById('settingsModal').classList.remove('hidden');
    return;
  }
  
  const btn = document.getElementById('analyzeBtn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Analyzing...';
  
  const imageData = document.getElementById('previewImage').src;
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${state.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku:free',
        messages: [{
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Look at this photo of a fridge/pantry and list all the food items you can identify. Return ONLY a JSON array of item names like ["tomatoes", "chicken", "cheese"]. Do not include any other text.'
            },
            {
              type: 'image_url',
              image_url: { url: imageData }
            }
          ]
        }]
      })
    });
    
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '[]';
    
    // Parse JSON response
    let items = [];
    try {
      items = JSON.parse(content);
    } catch {
      // Try to extract array from text
      const match = content.match(/\[.*\]/);
      if (match) items = JSON.parse(match[0]);
    }
    
    if (items.length > 0) {
      showDetectedItems(items);
    } else {
      alert('No items detected. Try a clearer photo or add items manually.');
    }
    
  } catch (error) {
    console.error('AI analysis error:', error);
    alert('Failed to analyze image. Please add items manually.');
  }
  
  btn.disabled = false;
  btn.innerHTML = '🤖 Analyze Fridge';
}

function showDetectedItems(items) {
  const container = document.getElementById('detectedItems');
  
  container.innerHTML = `
    <div class="detected-items">
      <h4 style="margin-bottom: 8px; font-size: 14px; color: var(--text-secondary);">Confirm detected items:</h4>
      ${items.map(item => `
        <label class="confirm-item">
          <input type="checkbox" value="${item}" checked>
          <span class="emoji">${getFoodEmoji(item)}</span>
          <span>${item}</span>
        </label>
      `).join('')}
      <button class="btn btn-primary" onclick="addDetectedItems()" style="margin-top: 12px;">
        ✓ Add to Fridge
      </button>
    </div>
  `;
}

function addDetectedItems() {
  const checkboxes = document.querySelectorAll('#detectedItems input[type="checkbox"]:checked');
  checkboxes.forEach(cb => {
    const item = cb.value.toLowerCase();
    if (!state.fridge.some(f => f.toLowerCase() === item)) {
      state.fridge.push(cb.value);
    }
  });
  
  saveState();
  renderAll();
  document.getElementById('detectedItems').innerHTML = '';
  generateMeal();
}

function addFridgeItem() {
  const input = document.getElementById('addItemInput');
  const value = input.value.trim();
  
  if (value && !state.fridge.some(f => f.toLowerCase() === value.toLowerCase())) {
    state.fridge.push(value);
    saveState();
    renderFridge();
    input.value = '';
    generateMeal();
  }
}

function removeFridgeItem(idx) {
  state.fridge.splice(idx, 1);
  saveState();
  renderFridge();
  generateMeal();
}

// =====================
// MEAL & SHOPPING FUNCTIONS
// =====================
function generateMeal() {
  const recipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
  state.currentMeal = recipe;
  
  document.getElementById('mealName').textContent = `${recipe.emoji} ${recipe.name}`;
  document.getElementById('mealIngredients').textContent = `${recipe.ingredients.join(', ')}`;
  
  // Generate shopping list from recipe
  const needed = recipe.ingredients.filter(ing => 
    !state.fridge.some(f => f.toLowerCase().includes(ing.toLowerCase()))
  );
  
  // Find deals for needed items
  state.shoppingList = needed.map(item => {
    const lowerItem = item.toLowerCase();
    let bestDeal = null;
    let bestPrice = null;
    
    // Find lowest price across stores
    Object.values(STORE_DEALS).forEach(storeDeals => {
      storeDeals.forEach(deal => {
        if (deal.name.toLowerCase().includes(lowerItem) || lowerItem.includes(deal.name.toLowerCase().split(' ')[0])) {
          if (!bestPrice || deal.price < bestPrice) {
            bestPrice = deal.price;
            bestDeal = deal;
          }
        }
      });
    });
    
    return {
      name: item.charAt(0).toUpperCase() + item.slice(1),
      price: bestPrice || 3.99,
      originalPrice: bestDeal?.originalPrice || null,
      coupon: bestDeal?.coupon || null,
      stores: bestDeal ? bestDeal.store : null,
      checked: false
    };
  });
  
  saveState();
  renderShoppingList();
  updateShoppingSummary();
}

function addDealToShoppingList(dealId) {
  const deal = state.deals.find(d => d.id === dealId);
  if (!deal) return;
  
  const exists = state.shoppingList.some(item => 
    item.name.toLowerCase().includes(deal.name.toLowerCase())
  );
  
  if (!exists) {
    state.shoppingList.push({
      name: deal.name,
      price: deal.price,
      originalPrice: deal.originalPrice,
      coupon: deal.coupon,
      stores: deal.store,
      checked: false
    });
    saveState();
    renderShoppingList();
  }
}

function toggleItemCheck(idx) {
  state.shoppingList[idx].checked = !state.shoppingList[idx].checked;
  saveState();
}

function applyCouponStacking() {
  let totalSavings = 0;
  
  state.shoppingList.forEach(item => {
    if (item.originalPrice && !item.coupon) {
      const savings = item.originalPrice - item.price;
      item.coupon = `Save $${savings.toFixed(2)}`;
      totalSavings += savings;
    }
  });
  
  saveState();
  renderShoppingList();
  
  if (totalSavings > 0) {
    alert(`🎉 You saved $${totalSavings.toFixed(2)} with coupon stacking!`);
  }
}

// =====================
// AI CHAT
// =====================
async function sendAIChat() {
  const input = document.getElementById('aiInput');
  const message = input.value.trim();
  if (!message) return;
  
  const container = document.getElementById('aiMessages');
  
  // Add user message
  container.innerHTML += `<div class="ai-msg user">${message}</div>`;
  input.value = '';
  container.scrollTop = container.scrollHeight;
  
  // Show loading
  const loading = document.createElement('div');
  loading.className = 'ai-msg assistant';
  loading.textContent = '🤔 Thinking...';
  container.appendChild(loading);
  container.scrollTop = container.scrollHeight;
  
  try {
    let reply;
    
    if (!state.apiKey) {
      reply = "⚠️ Please add your OpenRouter API key in Settings to use AI features. Get a free key at openrouter.ai/keys";
    } else {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${state.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct:free',
          messages: [{
            role: 'user',
            content: `You are a helpful cooking assistant. The user has these items in their fridge: ${state.fridge.join(', ')}. Current meal: ${state.currentMeal?.name || 'none'}. User question: ${message}`
          }]
        })
      });
      
      const data = await response.json();
      reply = data.choices?.[0]?.message?.content || "I'm not sure how to help with that.";
    }
    
    loading.remove();
    container.innerHTML += `<div class="ai-msg assistant">${reply}</div>`;
    container.scrollTop = container.scrollHeight;
    
  } catch (error) {
    loading.remove();
    container.innerHTML += `<div class="ai-msg assistant">Sorry, I encountered an error. Please check your API key.</div>`;
  }
}

// =====================
// SETTINGS
// =====================
function saveSettings() {
  state.apiKey = document.getElementById('apiKeyInput').value.trim();
  state.krogerClientId = document.getElementById('krogerClientId').value.trim();
  state.krogerClientSecret = document.getElementById('krogerClientSecret').value.trim();
  state.peopleCount = parseInt(document.getElementById('householdSize').value) || 2;
  state.diet = document.getElementById('dietPreference').value;
  
  saveState();
  document.getElementById('settingsModal').classList.add('hidden');
  
  alert('✅ Settings saved!');
}

// =====================
// INIT
// =====================
document.addEventListener('DOMContentLoaded', init);