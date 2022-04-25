console.warn('sw from public', this);

this.addEventListener('install', function (event) {
  console.warn('install');
  // simultaneously only one sw can be active
  // the new sw replaces the old one once it has no clients
  // this period is also known as the waiting phase
  // we want to skip it and be active immediately
  event.waitUntil(self.skipWaiting());
});

this.addEventListener('activate', (event) => {
  // page gets controlled when a request for it
  // was executed through a service worker
  // but we can always request control over uncontrolled clients
  event.waitUntil(self.clients.claim());
  console.warn('activate');
});

this.addEventListener('fetch', (event) => {
  // console.warn('url', event.request.url);

  if (event.request.url.includes('files')) {
    // const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // if (userInfo && userInfo.token) {
    const newRequest = new Request(event.request, {
      // headers: { Authorization: `Bearer ${userInfo.token}` },
      mode: 'cors',
    });
    event.respondWith(fetch(newRequest));
    // }
  }
});
