/* ===================== DATA ===================== */
const products = [
  { id: 1, name: 'Vintage Leather Jacket', price: 2500, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&q=80&auto=format&fit=crop', category: 'fashion', condition: 'Excellent', seller: 'Fashion Lover' },
  { id: 2, name: 'iPhone 12 Pro', price: 45000, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=900&q=80&auto=format&fit=crop', category: 'electronics', condition: 'Good', seller: 'Tech Guru' },
  { id: 3, name: 'Coffee Table Books Set', price: 800, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80&auto=format&fit=crop', category: 'books', condition: 'Very Good', seller: 'Book Worm' },
  { id: 4, name: 'Gaming Chair', price: 8000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80&auto=format&fit=crop', category: 'furniture', condition: 'Excellent', seller: 'Gamer Pro' },
  { id: 5, name: 'Designer Handbag', price: 3500, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=80&auto=format&fit=crop', category: 'fashion', condition: 'Like New', seller: 'Style Icon' },
  { id: 6, name: 'Wireless Headphones', price: 4500, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80&auto=format&fit=crop', category: 'electronics', condition: 'Good', seller: 'Music Lover' },
  { id: 7, name: 'Yoga Mat & Blocks', price: 1200, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=80&auto=format&fit=crop', category: 'sports', condition: 'Very Good', seller: 'Fitness Freak' },
  { id: 8, name: 'Vintage Camera', price: 15000, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&q=80&auto=format&fit=crop', category: 'electronics', condition: 'Excellent', seller: 'Photo Artist' },
  { id: 9, name: 'Minimalist Desk Lamp', price: 1800, image: 'https://images.unsplash.com/photo-1543168256-41881157697e?q=80&w=900&auto=format&fit=crop', category: 'home', condition: 'Like New', seller: 'Modern Home' },
  { id: 10, name: 'Running Shoes (Size 10)', price: 2200, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900&auto=format&fit=crop', category: 'sports', condition: 'Good', seller: "Athlete's Corner" },
  { id: 11, name: 'Vintage Turntable', price: 12000, image: 'https://images.unsplash.com/photo-1563216898-0c65609653a1?q=80&w=900&auto=format&fit=crop', category: 'electronics', condition: 'Excellent', seller: 'Vinyl Fanatic' },
  { id: 12, name: 'Gardening Tool Set', price: 750, image: 'https://images.unsplash.com/photo-1510255956037-414436582a97?q=80&auto=format&fit=crop', category: 'home', condition: 'Good', seller: 'Green Thumb' },
  { id: 13, name: 'Demon Slayer Katana Replica', price: 3000, image: 'https://images.unsplash.com/photo-1628169641772-a75908323608?q=80&auto=format&fit=crop&w=900', category: 'anime', condition: 'Like New', seller: 'Anime Fan' },
  { id: 14, name: 'Gojo Satoru Hoodie (JJK)', price: 1500, image: 'https://images.unsplash.com/photo-1542060748-10c28b62716b?q=80&auto=format&fit=crop&w=900', category: 'anime', condition: 'Very Good', seller: 'Anime Threads' },
  { id: 15, name: 'Levi Ackerman Poster (AOT)', price: 400, image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&auto=format&fit=crop&w=900', category: 'anime', condition: 'New', seller: 'Poster Power' },
  { id: 16, name: 'Naruto Uzumaki Headband', price: 650, image: 'https://images.unsplash.com/photo-1617902129820-43f7f2c027a1?q=80&auto=format&fit=crop&w=900', category: 'anime', condition: 'Excellent', seller: 'Cosplay Central' },
];
let cart = [];
let isLoggedIn = false;
let currentUser = null;

/* ===================== HELPERS ===================== */
const rupee = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Theme persistence
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('ecofinds_theme', theme);
  const label = theme === 'dark' ? 'Dark' : 'Light';
  $('#themeLabel').textContent = label;
  $('#themeToggle').innerHTML = theme === 'dark' ? '<i class="fas fa-moon"></i> <span class="ml-2 hidden sm:inline" id="themeLabel">Dark</span>' : '<i class="fas fa-sun"></i> <span class="ml-2 hidden sm:inline" id="themeLabel">Light</span>';
  // update meta theme-color for mobile UI
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b0d12' : '#ffffff');
}

function initTheme() {
  const saved = localStorage.getItem('ecofinds_theme');
  setTheme(saved || 'light'); // Light-first as requested
  $('#themeToggle').addEventListener(
    'click',
    () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(current === 'light' ? 'dark' : 'light');
    },
    { passive: true }
  );
}

// Fallback image (handles broken links)
const PLACEHOLDER = 'data:image/svg+xml;base64,' + btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="600">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#dbeafe"/>
        <stop offset="100%" stop-color="#dcfce7"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <g fill="#0b1220" fill-opacity="0.5">
      <text x="50%" y="48%" font-family="Inter, Arial" font-size="28" text-anchor="middle">Image unavailable</text>
      <text x="50%" y="58%" font-family="Inter, Arial" font-size="16" text-anchor="middle">EcoFinds</text>
    </g>
  </svg>
`);
function fallbackImage(img) {
  if (!img || img.dataset.fallback) return;
  img.dataset.fallback = '1';
  img.src = PLACEHOLDER;
  img.removeAttribute('srcset');
  img.style.objectFit = 'cover';
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (s) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;' }[s]));
}

/* ===================== INIT ===================== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  restoreCart();
  restoreAuth();
  mountReveals();
  initParallaxSpotlight();
  renderProducts(products);
  updateCartBadge();
  initCanvasParticles();
  wireGlobalEvents();
  initAuthTabs();
});

/* ===================== EVENTS / UX ===================== */
function wireGlobalEvents() {
  // ESC to close modals
  document.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape') {
        ['searchModal', 'cartModal', 'profileModal'].forEach((id) => document.getElementById(id).classList.add('hidden'));
      }
    },
    { passive: true }
  );

  // Smooth anchors
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener(
      'click',
      (e) => {
        e.preventDefault();
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      },
      { passive: true }
    );
  });

  // Click backdrop to close
  document.addEventListener(
    'click',
    (e) => {
      ['searchModal', 'cartModal', 'profileModal'].forEach((mid) => {
        const m = document.getElementById(mid);
        if (!m.classList.contains('hidden') && e.target === m) m.classList.add('hidden');
      });
    },
    { passive: true }
  );

  // Search enter
  const si = document.getElementById('searchInput');
  if (si) {
    si.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch();
    });
  }
}

/* ===================== REVEAL ===================== */
function mountReveals() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
  );
  $$('.reveal').forEach((el) => obs.observe(el));
}

/* ===================== PARALLAX ===================== */
function initParallaxSpotlight() {
  const media = document.querySelector('.spotlight-media');
  if (!media || prefersReducedMotion) return;
  let raf = null;
  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const rect = media.getBoundingClientRect();
      const center = window.innerHeight / 2;
      const delta = rect.top + rect.height / 2 - center;
      const progress = Math.max(-1, Math.min(1, -delta / center));
      const scale = 1 + Math.abs(progress) * 0.05;
      const blur = Math.abs(progress) * 3;
      media.style.transform = `scale(${scale}) translateZ(0)`;
      media.style.filter = `saturate(${1 + Math.abs(progress) * 0.15}) brightness(${1 + Math.abs(progress) * 0.03}) blur(${blur}px)`;
      raf = null;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ===================== CANVAS PARTICLES ===================== */
function initCanvasParticles() {
  if (prefersReducedMotion) return;
  const canvas = document.getElementById('fxCanvas');
  const ctx = canvas.getContext('2d', { alpha: true });
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const count = Math.min(180, Math.floor((width * height) / 16000));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      hue: Math.random() * 360,
    });
  }
  window.addEventListener(
    'resize',
    () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    },
    { passive: true }
  );

  (function tick() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.hue += 0.08;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      grad.addColorStop(0, `hsla(${p.hue}, 70%, 60%, 0.6)`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  })();
}

/* ===================== PRODUCTS ===================== */
function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';
  list.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card glass p-4 reveal';
    card.style.transitionDelay = `${Math.min(index * 60, 360)}ms`;
    card.innerHTML = `
      <div class="relative overflow-hidden rounded-lg mb-4">
        <img src="${product.image}" alt="${escapeHtml(product.name)}" class="w-full h-48 object-cover rounded-lg"
          referrerpolicy="no-referrer" loading="lazy" decoding="async" onerror="fallbackImage(this)" />
        <div class="absolute top-2 right-2 chip">${escapeHtml(product.condition)}</div>
      </div>
      <h3 class="text-lg font-bold mb-1">${escapeHtml(product.name)}</h3>
      <p style="color:var(--muted-2)" class="text-sm mb-2">by ${escapeHtml(product.seller)}</p>
      <p class="currency text-2xl font-extrabold mb-4">${rupee(product.price)}</p>
      <button class="btn-primary w-full py-2 hover-scale" aria-label="Add ${escapeHtml(product.name)} to cart" onclick="addToCart(${product.id})">
        <i class="fas fa-cart-plus mr-2"></i> Add to Cart
      </button>
    `;
    grid.appendChild(card);
  });
  setTimeout(mountReveals, 0);
}

function displaySearchResults(filtered) {
  const grid = document.getElementById('productsGrid');
  if (filtered.length === 0) {
    grid.innerHTML = '<div class="col-span-full text-center text-xl" style="color:var(--muted)">No products found</div>';
    return;
  }
  renderProducts(filtered);
}

/* ===================== CART ===================== */
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;
  const existing = cart.find((i) => i.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  persistCart();
  updateCartBadge();
  showToast('Added to cart!');
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? 'flex' : 'none';
}

function loadCartItems() {
  const container = document.getElementById('cartItems');
  const totalElement = document.getElementById('cartTotal');
  if (cart.length === 0) {
    container.innerHTML = '<p class="text-center py-8" style="color:var(--muted)">Your cart is empty</p>';
    totalElement.textContent = '₹0';
    return;
  }
  container.innerHTML = '';
  let total = 0;
  cart.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'glass-dark p-4 rounded-lg flex items-center space-x-4';
    el.innerHTML = `
      <img src="${item.image}" alt="${escapeHtml(item.name)}" class="w-16 h-16 object-cover rounded-lg" loading="lazy" decoding="async" onerror="fallbackImage(this)" />
      <div class="flex-1">
        <h4 class="font-bold">${escapeHtml(item.name)}</h4>
        <p style="color:var(--muted)">${rupee(item.price)}</p>
      </div>
      <div class="flex items-center space-x-2">
        <button onclick="updateQuantity(${item.id}, -1)" class="glass w-8 h-8 rounded-full">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${item.id}, 1)" class="glass w-8 h-8 rounded-full">+</button>
      </div>
      <button onclick="removeFromCart(${item.id})" class="hover-scale" aria-label="Remove from cart" title="Remove">
        <i class="fas fa-trash" style="color:#ef4444"></i>
      </button>
    `;
    container.appendChild(el);
    total += item.price * item.quantity;
  });
  totalElement.textContent = rupee(total);
}

function updateQuantity(productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter((i) => i.id !== productId);
  }
  persistCart();
  updateCartBadge();
  loadCartItems();
}

function removeFromCart(productId) {
  cart = cart.filter((i) => i.id !== productId);
  persistCart();
  updateCartBadge();
  loadCartItems();
  showToast('Item removed from cart');
}

function checkout() {
  if (cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }
  if (!isLoggedIn) {
    showToast('Please login to checkout');
    toggleCart();
    toggleProfile();
    return;
  }
  if (confirm('Proceed to checkout?')) {
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    // Save a simple order record
    const orders = JSON.parse(localStorage.getItem('ecofinds_orders') || '[]');
    orders.push({ id: 'ORD-' + Date.now(), items: cart, total, date: new Date().toISOString() });
    localStorage.setItem('ecofinds_orders', JSON.stringify(orders));
    cart = [];
    persistCart();
    updateCartBadge();
    toggleCart();
    showToast(`Order placed! Total: ${rupee(total)}`);
  } else {
    showToast('Checkout cancelled.');
  }
}

function persistCart() {
  try {
    localStorage.setItem('ecofinds_cart', JSON.stringify(cart));
  } catch (e) {}
}
function restoreCart() {
  try {
    const data = localStorage.getItem('ecofinds_cart');
    if (data) cart = JSON.parse(data) || [];
  } catch {
    cart = [];
  }
}

/* ===================== AUTH ===================== */
function initAuthTabs() {
  const tabLogin = $('#tabLogin');
  const tabRegister = $('#tabRegister');
  const loginForm = $('#loginForm');
  const registerForm = $('#registerForm');

  function activate(tab) {
    if (tab === 'login') {
      tabLogin.classList.add('btn-ghost');
      tabRegister.classList.remove('btn-ghost');
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
    } else {
      tabRegister.classList.add('btn-ghost');
      tabLogin.classList.remove('btn-ghost');
      registerForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
    }
  }
  tabLogin.addEventListener('click', () => activate('login'));
  tabRegister.addEventListener('click', () => activate('register'));
  activate('login');
}

function submitLogin(e) {
  e.preventDefault();
  const email = $('#loginEmail').value.trim().toLowerCase();
  const pass = $('#loginPassword').value;
  if (!email.endsWith('@gmail.com')) {
    showToast('Please use a valid Gmail address');
    return;
  }
  const users = JSON.parse(localStorage.getItem('ecofinds_users') || '[]');
  const found = users.find((u) => u.email === email && u.password === hash(pass));
  if (!found) {
    showToast('Invalid credentials');
    return;
  }
  signIn(found, $('#rememberMe').checked);
  showToast('Welcome back!');
  renderUserSection();
}

function submitRegister(e) {
  e.preventDefault();
  const name = $('#regName').value.trim();
  const email = $('#regEmail').value.trim().toLowerCase();
  const pass = $('#regPassword').value;
  const conf = $('#regConfirm').value;

  if (!email.endsWith('@gmail.com')) {
    showToast('Use a Gmail address (e.g., you@gmail.com)');
    return;
  }
  if (pass.length < 6) {
    showToast('Password must be at least 6 characters');
    return;
  }
  if (pass !== conf) {
    showToast('Passwords do not match');
    return;
  }

  const users = JSON.parse(localStorage.getItem('ecofinds_users') || '[]');
  if (users.some((u) => u.email === email)) {
    showToast('Account already exists. Please login.');
    return;
  }

  const newUser = { name, email, password: hash(pass), since: new Date().toISOString() };
  users.push(newUser);
  localStorage.setItem('ecofinds_users', JSON.stringify(users));
  signIn(newUser, true);
  showToast('Account created! You are now logged in.');
  renderUserSection();
}

// ultra-simple "hash" (not secure—demo only)
const hash = (s) => btoa(unescape(encodeURIComponent(s)));

function signIn(user, remember) {
  isLoggedIn = true;
  currentUser = { name: user.name, email: user.email, since: user.since || new Date().toISOString() };
  const sessionKey = remember ? 'ecofinds_auth' : 'ecofinds_auth_session';
  localStorage.setItem(sessionKey, JSON.stringify(currentUser));
  // Clear the other location
  if (remember) localStorage.removeItem('ecofinds_auth_session');
  else localStorage.removeItem('ecofinds_auth');
  // switch UI
  $('#authSection').classList.add('hidden');
  $('#userSection').classList.remove('hidden');
  $('#profileTitle').textContent = 'Your Account';
  updateUserBadges();
}

function restoreAuth() {
  const stored = localStorage.getItem('ecofinds_auth') || localStorage.getItem('ecofinds_auth_session');
  if (stored) {
    try {
      const user = JSON.parse(stored);
      isLoggedIn = true;
      currentUser = user;
      updateUserBadges();
    } catch {}
  }
  renderUserSection();
}

function updateUserBadges() {
  if (!currentUser) return;
  $('#userName').textContent = currentUser.name || 'Eco Warrior';
  $('#userEmail').textContent = currentUser.email || 'eco@ecofinds.com';
  const since = new Date(currentUser.since || Date.now());
  $('#memberSince').textContent = 'Member since ' + since.toLocaleDateString();
}

function renderUserSection() {
  if (isLoggedIn) {
    $('#authSection').classList.add('hidden');
    $('#userSection').classList.remove('hidden');
  } else {
    $('#userSection').classList.add('hidden');
    $('#authSection').classList.remove('hidden');
  }
}

function logout() {
  isLoggedIn = false;
  currentUser = null;
  localStorage.removeItem('ecofinds_auth');
  localStorage.removeItem('ecofinds_auth_session');
  renderUserSection();
  toggleProfile();
  showToast('You have been logged out');
}

function showOrderHistory() {
  if (!isLoggedIn) {
    showToast('Please login to view order history');
    toggleProfile();
    return;
  }
  const orders = JSON.parse(localStorage.getItem('ecofinds_orders') || '[]');
  if (orders.length === 0) {
    showToast('No orders yet');
    return;
  }
  const latest = orders[orders.length - 1];
  showToast(`Latest: ${latest.id} — ${rupee(latest.total)}`);
}

/* ===================== SEARCH ===================== */
function performSearch() {
  const q = ($('#searchInput').value || '').toLowerCase().trim();
  const filtered = products.filter((p) => p.name.toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q));
  displaySearchResults(filtered);
  toggleSearch(); // close exactly once (fixed double-toggle bug)
}
function searchCategory(category) {
  const filtered = products.filter((p) => (p.category || '').toLowerCase() === category.toLowerCase());
  displaySearchResults(filtered);
  toggleSearch();
}

/* ===================== UI HELPERS ===================== */
function toggleSearch() {
  const m = document.getElementById('searchModal');
  m.classList.toggle('hidden');
  if (!m.classList.contains('hidden')) setTimeout(() => document.getElementById('searchInput').focus(), 10);
}
function toggleCart() {
  const m = document.getElementById('cartModal');
  m.classList.toggle('hidden');
  if (!m.classList.contains('hidden')) loadCartItems();
}
function toggleProfile() {
  const m = document.getElementById('profileModal');
  m.classList.toggle('hidden');
}

function showToast(message) {
  const toast = document.getElementById('successToast');
  const msg = document.getElementById('toastMessage');
  msg.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2600);
}

function showProducts() {
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
function showSellForm() {
  showToast('Sell feature coming soon!');
}
function loadMoreProducts() {
  showToast('More amazing products coming soon!');
}