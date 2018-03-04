import axios from 'axios';
// import idbKeyval from 'idb-keyval';
// dono why the library doesn't work

export const saveToken = token =>
  new Promise((resolve, reject) => {
    try {
      window.localStorage.setItem('token', token);
      resolve();
    } catch (err) {
      reject(err);
    }
  });

export const getToken = () =>
  new Promise((resolve, reject) => {
    try {
      const token = window.localStorage.getItem('token');
      resolve(token);
    } catch (err) {
      reject(err);
    }
  });

export const removeToken = () =>
  new Promise((resolve, reject) => {
    try {
      window.localStorage.removeItem('token');
      resolve();
    } catch (err) {
      reject(err);
    }
  });

export const register = ({ name, email, isAdmin, password }) =>
  new Promise((resolve, reject) => {
    axios
      .post('/api/register', { name, email, isAdmin, password })
      .then(response => {
        if (response.status === 200) {
          resolve();
        } else {
          reject();
        }
      })
      .catch(error => {
        if (error.response) {
          reject({
            message: error.response.data.message
          });
        } else {
          reject();
        }
      });
  });

export const verify = ({ code }) =>
  new Promise((resolve, reject) => {
    axios
      .post('/api/verify', { code })
      .then(response => {
        if (response.status === 200) {
          const token = response.data.token;
          saveToken(token)
            .then(() => {
              const payload = JSON.parse(window.atob(token.split('.')[1]));
              resolve({
                email: payload.email,
                name: payload.name,
                isAdmin: payload.isAdmin
              });
            })
            .catch(() => {
              reject();
            });
        } else {
          reject();
        }
      })
      .catch(error => {
        if (error.response) {
          reject({
            message: error.response.data.message
          });
        } else {
          reject();
        }
      });
  });

export const login = ({ email, password }) =>
  new Promise((resolve, reject) => {
    axios
      .post('/api/login', { email, password })
      .then(response => {
        if (response.status === 200) {
          const token = response.data.token;
          saveToken(token)
            .then(() => {
              const payload = JSON.parse(window.atob(token.split('.')[1]));
              resolve({
                email: payload.email,
                name: payload.name,
                isAdmin: payload.isAdmin
              });
            })
            .catch(() => {
              reject();
            });
        } else {
          reject();
        }
      })
      .catch(error => {
        if (error.response) {
          reject({
            message: error.response.data.message
          });
        } else {
          reject();
        }
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
