export const registerSw = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
          if (registration.active) {
            console.log(registration.active.state);
            console.log(registration.waiting);
          }
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

export default registerSw;
