/* ═══════════════════════════════════════════════════════
   KJSynthora PWA Install + Notification Manager — v1.2
   Fixed: message channel closed error + applyUpdate race condition
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Register Service Worker ────────────────────────────
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => {
          console.log('[PWA] Service Worker registered:', reg.scope);

          // ✅ null check for reg.installing
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (!newWorker) return;

            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                showUpdateBanner();
              }
            });
          });
        })
        .catch(err => console.warn('[PWA] SW registration failed:', err));

      // ✅ SW message listener — prevents "message channel closed" error
      navigator.serviceWorker.addEventListener('message', event => {
        if (!event.data) return;
        if (event.data.type === 'SKIP_WAITING') {
          window.location.reload();
        }
      });

      // ✅ controllerchange listener — reloads when new SW takes over
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    });
  }

  // ── Install Prompt (Add to Home Screen) ───────────────
  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner();
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    hideInstallBanner();
    showToast('✅ KJSynthora installed! Find it on your home screen.');
    if (typeof gtag !== 'undefined') gtag('event', 'pwa_installed');
  });

  function showInstallBanner() {
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    if (localStorage.getItem('pwa-dismissed') > Date.now() - 7*24*60*60*1000) return;
    const banner = document.getElementById('pwa-install-banner');
    if (banner) {
      banner.style.display = 'flex';
      setTimeout(() => banner.classList.add('pwa-show'), 100);
    }
  }

  function hideInstallBanner() {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) {
      banner.classList.remove('pwa-show');
      setTimeout(() => banner.style.display = 'none', 400);
    }
  }

  // Exposed globally so HTML buttons can call
  window.kjPWA = {

    install: async function () {
      if (!deferredPrompt) {
        showToast('ℹ️ Already installed or not supported on this browser.');
        return;
      }
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('🎉 Installing KJSynthora...');
      } else {
        localStorage.setItem('pwa-dismissed', Date.now());
      }
      deferredPrompt = null;
      hideInstallBanner();
    },

    dismissInstall: function () {
      localStorage.setItem('pwa-dismissed', Date.now());
      hideInstallBanner();
    },

    // ── Push Notifications ───────────────────────────────
    requestNotifications: async function () {
      if (!('Notification' in window)) {
        showToast('⚠️ Notifications not supported on this browser.');
        return;
      }
      if (Notification.permission === 'granted') {
        showToast('✅ Notifications already enabled!');
        return;
      }
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        showToast('🔔 Notifications enabled! You\'ll hear about new tools first.');
        subscribeToPush();
        if (typeof gtag !== 'undefined') gtag('event', 'push_notifications_enabled');
      } else {
        showToast('Notifications blocked. Enable in browser settings anytime.');
      }
    },

    // ✅ FIXED: reload is handled by controllerchange — no race condition
    applyUpdate: function () {
      navigator.serviceWorker.getRegistration().then(reg => {
        if (reg && reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          // controllerchange listener above will trigger reload
        } else {
          window.location.reload(); // fallback only
        }
      });
    }
  };

  async function subscribeToPush() {
    try {
      const reg = await navigator.serviceWorker.ready;
      const VAPID_PUBLIC_KEY = 'YOUR_VAPID_PUBLIC_KEY_HERE';
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });
      await fetch('/api/push-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub)
      });
      console.log('[PWA] Push subscription saved');
    } catch (err) {
      console.warn('[PWA] Push subscription failed:', err);
    }
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
  }

  // ── Update Banner ────────────────────────────────────────
  function showUpdateBanner() {
    const el = document.getElementById('pwa-update-banner');
    if (el) {
      el.style.display = 'flex';
      setTimeout(() => el.classList.add('pwa-show'), 100);
    }
  }

  // ── Toast helper ─────────────────────────────────────────
  function showToast(msg) {
    let t = document.getElementById('pwa-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'pwa-toast';
      t.style.cssText = `position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(30px);
        background:#13131a;border:1px solid #2a2a3d;color:#e8e8f0;
        padding:10px 20px;border-radius:10px;font-size:0.88rem;font-family:Syne,sans-serif;
        font-weight:600;z-index:9999;opacity:0;transition:all 0.4s;white-space:nowrap;
        box-shadow:0 8px 32px rgba(0,0,0,0.4);`;
      document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(() => {
      t.style.opacity = '1';
      t.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(-50%) translateY(30px)';
    }, 3500);
  }

  // ── Online/Offline status indicator ─────────────────────
  function updateOnlineStatus() {
    const el = document.getElementById('pwa-online-status');
    if (!el) return;
    if (navigator.onLine) {
      el.textContent = '🟢 Online';
      el.style.color = '#4ade80';
    } else {
      el.textContent = '🔴 Offline';
      el.style.color = '#f76a8a';
    }
  }
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();

})();
