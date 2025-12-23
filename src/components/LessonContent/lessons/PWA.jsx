import { useState } from 'react';

function PWA() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">PWA</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Progressive Web Apps (PWA)</h3>
        <p className="text-blue-800 mb-2">
          Progressive Web Apps (PWAs) are web applications that use modern web capabilities to provide a native app-like experience. 
          PWAs are installable, work offline, can send push notifications, and provide a seamless user experience across devices. 
          They combine the best of web and native apps.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Service Workers:</strong> Background scripts enabling offline functionality</li>
            <li><strong>Web App Manifest:</strong> JSON file defining app metadata and behavior</li>
            <li><strong>Offline Support:</strong> App works without internet connection</li>
            <li><strong>Installable:</strong> Can be installed on home screen</li>
            <li><strong>Push Notifications:</strong> Send notifications even when app is closed</li>
            <li><strong>Responsive:</strong> Works on all devices and screen sizes</li>
          </ul>
          <p className="mt-2"><strong>PWA Requirements:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>HTTPS (required for service workers)</li>
            <li>Web App Manifest file</li>
            <li>Service Worker for offline functionality</li>
            <li>Responsive design</li>
            <li>Fast loading times</li>
            <li>Works in all modern browsers</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Native app-like experience in the browser</li>
            <li>Works offline with cached content</li>
            <li>Installable without app stores</li>
            <li>Push notifications for user engagement</li>
            <li>Faster than traditional web apps</li>
            <li>Cross-platform (works on all devices)</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Workers</h3>
        <p className="text-gray-700 mb-4">
          Implement service workers for offline functionality.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}

// Service worker (sw.js)
const CACHE_NAME = 'my-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Workbox (recommended)
// npm install workbox-webpack-plugin

// webpack.config.js
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
};`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Offline Support</h3>
        <p className="text-gray-700 mb-4">
          Provide offline functionality for your app.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Check online status
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return isOnline;
}

// Offline fallback page
// Cache offline.html
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/offline.html'))
    );
  }
});

// Cache API responses
self.addEventListener('fetch', event => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.open('api-cache').then(cache => {
        return fetch(event.request)
          .then(response => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => cache.match(event.request));
      })
    );
  }
});

// Background sync
// Queue requests when offline
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

// IndexedDB for offline storage
import { openDB } from 'idb';

const db = await openDB('my-db', 1, {
  upgrade(db) {
    db.createObjectStore('data');
  }
});

// Store data
await db.put('data', { id: 1, value: 'data' }, 1);

// Retrieve data
const data = await db.get('data', 1);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Web App Manifest</h3>
        <p className="text-gray-700 mb-4">
          Create a manifest file for installable PWA.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// manifest.json
{
  "name": "My App",
  "short_name": "App",
  "description": "My Progressive Web App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["productivity", "utilities"],
  "screenshots": [
    {
      "src": "/screenshot-wide.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    }
  ]
}

// Link in HTML
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#000000" />

// Display modes
// "fullscreen" - Full screen
// "standalone" - App-like
// "minimal-ui" - Minimal browser UI
// "browser" - Normal browser`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Push Notifications</h3>
        <p className="text-gray-700 mb-4">
          Implement push notifications for user engagement.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Request notification permission
async function requestNotificationPermission() {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
}

// Show notification
function showNotification(title, options) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, options);
  }
}

// Push subscription
async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  });
  
  // Send subscription to server
  await fetch('/api/push/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription)
  });
}

// Handle push in service worker
self.addEventListener('push', event => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    vibrate: [200, 100, 200],
    tag: 'notification',
    actions: [
      {
        action: 'open',
        title: 'Open'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Cache Strategies</h3>
        <p className="text-gray-700 mb-4">
          Implement different caching strategies for optimal performance.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Cache First
// Good for: Static assets
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Network First
// Good for: API calls, dynamic content
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches.open('dynamic-cache').then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Stale While Revalidate
// Good for: Frequently updated content
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(response => {
          caches.open('cache-v1').then(cache => {
            cache.put(event.request, response.clone());
          });
          return response;
        });
        return cachedResponse || fetchPromise;
      })
  );
});

// Network Only
// Good for: Critical, always-fresh data
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});

// Cache Only
// Good for: Offline-only resources
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request));
});

// Workbox strategies
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

// Cache first for images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst()
);

// Network first for API
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst()
);

// Stale while revalidate for HTML
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new StaleWhileRevalidate()
);`}</pre>
        </div>
      </section>
    </div>
  );
}

export default PWA;

