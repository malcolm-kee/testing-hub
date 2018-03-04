import axios from 'axios';
import { getToken } from './authenticationService';

export const getPublic = () =>
  new Promise((resolve, reject) => {
    axios
      .get('/api/feature')
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  });

export const getAll = () =>
  new Promise((resolve, reject) => {
    getToken().then(token => {
      axios
        .get('/api/featureAll', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(err => reject(err));
    });
  });

export const getOne = ({ id }) =>
  new Promise((resolve, reject) => {
    axios
      .get(`/api/feature/id/${id}`)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data.sprints[0]);
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  });

export const create = ({ name, requireLogin, links }) =>
  new Promise((resolve, reject) => {
    getToken()
      .then(token => {
        axios
          .post(
            '/api/feature',
            {
              name,
              requireLogin,
              links
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(response => {
            if (response.status === 200) {
              const { features } = response.data;
              const { id } = features[0];

              resolve({ id, name, links, requireLogin });
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          });
      })
      .catch(err => {
        reject(err);
      });
  });

export const update = ({ id, name, requireLogin, links }) =>
  new Promise((resolve, reject) => {
    getToken()
      .then(token => {
        axios
          .put(
            `/api/feature/id/${id}`,
            {
              name,
              requireLogin,
              links
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(response => {
            if (response.status === 200) {
              resolve();
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          });
      })
      .catch(err => {
        reject(err);
      });
  });

export const remove = ({ id }) =>
  new Promise((resolve, reject) => {
    getToken()
      .then(token => {
        axios
          .delete(`/api/feature/id/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            if (response.status === 200) {
              resolve();
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          });
      })
      .catch(err => {
        reject(err);
      });
  });

export default { getPublic, getOne, create, update, remove };
