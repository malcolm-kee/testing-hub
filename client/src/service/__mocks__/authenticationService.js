let tokenStore = '';

export const saveToken = token =>
  new Promise((resolve, reject) => {
    try {
      tokenStore = token;
      setTimeout(() => {
        resolve();
      }, 50);
    } catch (err) {
      reject(err);
    }
  });

export const getToken = () =>
  new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(tokenStore);
      }, 50);
    } catch (err) {
      reject(err);
    }
  });

export const removeToken = () =>
  new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        tokenStore = '';
        resolve();
      }, 50);
    } catch (err) {
      reject(err);
    }
  });

export const register = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 50);
  });

export const verify = () =>
  new Promise((resolve, reject) => {
    const token = '123';
    saveToken(token)
      .then(() => {
        resolve({
          email: 'malcolm@gmail.com',
          name: 'Malcolm Kee',
          isAdmin: true
        });
      })
      .catch(() => {
        reject();
      });
  });

export const login = ({ email }) =>
  new Promise((resolve, reject) => {
    const token = '12312asdf';
    saveToken(token)
      .then(() => {
        resolve({
          email,
          name: 'Malcolm Kee',
          isAdmin: true
        });
      })
      .catch(() => {
        reject();
      });
  });

export function logout() {
  return removeToken();
}

export function getLoginStatus() {
  return new Promise((resolve, reject) => {
    getToken()
      .then(token => {
        if (token) {
          const payload = JSON.parse(window.atob(token.split('.')[1]));
          const loggedIn = payload.exp > Date.now() / 1000;
          resolve(loggedIn);
        } else {
          reject();
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    getLoginStatus()
      .then(loggedIn => {
        if (loggedIn) {
          getToken()
            .then(token => {
              const payload = JSON.parse(window.atob(token.split('.')[1]));
              resolve({
                email: payload.email,
                name: payload.name,
                isAdmin: payload.isAdmin
              });
            })
            .catch(err => {
              reject(err);
            });
        } else {
          reject();
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default { getToken, register, verify, login, logout, getLoginStatus, getCurrentUser };
