import axios from 'axios';
import { getToken } from './authenticationService';

function getOne({ id, url }) {
  return new Promise((resolve, reject) => {
    const apiTarget = id ? `/api/sprint/id/${id}` : `/api/sprint/url/${url}`;
    axios
      .get(apiTarget)
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
}

function create({ name, url, desc, sprintItems }) {
  return new Promise((resolve, reject) => {
    getToken()
      .then(token => {
        axios
          .post(
            '/api/sprint',
            {
              name,
              url,
              desc,
              sprintItems
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(response => {
            if (response.status === 200) {
              resolve(response.data.sprints[0]);
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
      })
      .catch(err => {
        reject(err);
      });
  });
}

function update({ id, name, url, desc, sprintItems }) {
  return new Promise((resolve, reject) => {
    getToken()
      .then(token => {
        axios
          .put(
            `/api/sprint/id/${id}`,
            {
              name,
              url,
              desc,
              sprintItems
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(response => {
            if (response.status === 200) {
              resolve(response.data.sprints[0]);
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
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateItemStatus({ id, itemId, status }) {
  return new Promise((resolve, reject) => {
    getToken()
      .then(token => {
        axios
          .put(
            `/api/sprint/id/${id}/item/${itemId}`,
            {
              status
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
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
      })
      .catch(err => {
        reject(err);
      });
  });
}

function remove({ id }) {
  return new Promise((resolve, reject) => {
    getToken()
      .then(token => {
        axios
          .delete(`/api/sprint/id/${id}`, {
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
}

export default { getOne, create, update, updateItemStatus, remove };
