self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  // We can't easily play audio from the SW directly, 
  // but the click event is a user gesture that can be used by the main page.
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Nouvelle notification';
  const options = {
    body: data.body || 'Cliquez pour écouter l\'audio.',
    icon: '/vite.svg',
    data: data.data || {}
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
