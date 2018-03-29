export const registerSw = () =>
  new Promise((resolve, reject) => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(registration => {
            console.log('done register sw in registerSw.js');
            if (registration.waiting) {
              resolve({
                supportSw: true,
                waiting: true
              });
            } else {
              resolve({
                supportSw: true,
                waiting: false
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
