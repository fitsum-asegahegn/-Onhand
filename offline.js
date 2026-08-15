// ============================================================
// Onhand — offline support
//
// HOW IT WORKS (honest summary, worth reading once):
// - Whenever the shop's product list loads successfully, it's cached
//   in this device's localStorage. If a scan happens with no network,
//   we look the product up in that cache instead of failing outright.
// - If recording a sale (or a missed sale) fails because of no network,
//   it's saved to a local queue on THIS device and retried automatically
//   whenever the connection comes back (or every 20s while online, in
//   case the "online" event doesn't fire reliably on a flaky connection).
// - IMPORTANT LIMITATION: the queue lives only in this browser's local
//   storage, on this one device. It is NOT visible to the owner's
//   dashboard until it actually syncs. If a keeper's phone is lost,
//   reset, or has its browser data cleared before syncing, any queued
//   sales on it are lost. This is an acceptable v1 trade-off for a
//   pilot, not a guarantee — don't rely on it for long unsynced gaps.
// ============================================================

const OFFLINE_QUEUE_KEY = 'onhand_pending_writes';
const PRODUCT_CACHE_PREFIX = 'onhand_products_cache_';

function getQueue() {
  try {
    return JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function setQueue(queue) {
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  updateOfflineIndicator();
}

function queueWrite(table, payload) {
  const queue = getQueue();
  queue.push({
    id: 'q_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
    table,
    payload,
    createdAt: new Date().toISOString()
  });
  setQueue(queue);
}

async function syncQueue() {
  if (!navigator.onLine) return;
  let queue = getQueue();
  if (!queue.length) return;

  const remaining = [];
  for (const item of queue) {
    try {
      const { error } = await supabase.from(item.table).insert(item.payload);
      if (error) {
        // A real rejection (bad data, RLS, etc) — don't retry forever, but
        // don't silently discard it either. Keep it, since a human should
        // look at it rather than have it vanish.
        remaining.push(item);
      }
      // success: drop it from the queue by simply not pushing to `remaining`
    } catch (e) {
      // network-type failure — keep for the next retry
      remaining.push(item);
    }
  }
  setQueue(remaining);
}

function updateOfflineIndicator() {
  const banner = document.getElementById('offlineBanner');
  const countEl = document.getElementById('pendingCount');
  const queue = getQueue();
  if (!banner) return;

  if (!navigator.onLine || queue.length > 0) {
    banner.style.display = 'flex';
    if (countEl) {
      countEl.textContent = queue.length > 0 ? `${queue.length} ${t('pendingSync')}` : '';
    }
  } else {
    banner.style.display = 'none';
  }
}

// ---------- Product cache (per shop) ----------
function cacheProducts(ownerId, products) {
  try {
    localStorage.setItem(PRODUCT_CACHE_PREFIX + ownerId, JSON.stringify({
      updatedAt: new Date().toISOString(),
      products
    }));
  } catch (e) { /* storage full or unavailable — non-fatal, just no offline cache */ }
}

function getCachedProducts(ownerId) {
  try {
    const raw = localStorage.getItem(PRODUCT_CACHE_PREFIX + ownerId);
    if (!raw) return [];
    return JSON.parse(raw).products || [];
  } catch (e) {
    return [];
  }
}

// ---------- Wire up automatic sync ----------
window.addEventListener('online', () => { syncQueue(); updateOfflineIndicator(); });
window.addEventListener('offline', updateOfflineIndicator);
setInterval(() => { if (navigator.onLine) syncQueue(); }, 20000);
document.addEventListener('DOMContentLoaded', () => {
  updateOfflineIndicator();
  if (navigator.onLine) syncQueue();
});
