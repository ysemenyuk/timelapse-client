export default function serviceWorker() {
  let swUrl = `http://localhost:3000/sw.js`;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.warn('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.warn('SW registration failed: ', registrationError);
        });
    });
  }
}
