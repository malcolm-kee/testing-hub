export const registerSw = () =>
  new Promise((resolve, reject) => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(registration => {
            if (registration.waiting) {
              resolve({
                supportSw: true,
                waiting: true
              });
            }
          })
          .catch(registrationError => {
            reject(registrationError);
          });
      });
    } else {
      resolve({
        supportSw: false
      });
    }
  });

export default registerSw;
