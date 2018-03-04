import axios from 'axios';
import { getToken } from '../service/authenticationService';
import { SET_SPRINTS, ADD_SPRINT, UPDATE_SPRINT, DELETE_SPRINT } from '../constants/actions';

export const setSprints = ({ sprints }) => ({ type: SET_SPRINTS, payload: sprints });

export const getSprintsFromApi = () => dispatch => {
  getToken()
    .then(token => {
      axios
        .get('/api/sprint', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          dispatch(setSprints({ sprints: response.data }));
        })
        .catch(err => {
          console.error('error in getSprintsFromApi', err); // eslint-disable-line no-console
        });
    })
    .catch(err => {
      console.error('error in getToken', err); // eslint-disable-line no-console
    });
};

export const addSprint = ({ sprint }) => ({ type: ADD_SPRINT, payload: sprint });

export const updateSprint = ({ sprint }) => ({ type: UPDATE_SPRINT, payload: sprint });

export const deleteSprint = ({ id }) => ({ type: DELETE_SPRINT, payload: id });
