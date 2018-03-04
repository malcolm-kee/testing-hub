import axios from 'axios';
import authenticationService from '../service/authenticationService';

import { SET_FEATURES, ADD_FEATURE, UPDATE_FEATURE, DELETE_FEATURE } from '../constants/actions';

export const setFeatures = ({ features }) => ({ type: SET_FEATURES, payload: features });

export const addFeature = ({ feature }) => ({ type: ADD_FEATURE, payload: feature });

export const updateFeature = ({ feature }) => ({ type: UPDATE_FEATURE, payload: feature });

export const deleteFeature = ({ id }) => ({ type: DELETE_FEATURE, payload: id });

/*
* Thunk Actions
*/
export const getFeaturesFromApi = () => dispatch => {
  authenticationService
    .getToken()
    .then(token => {
      axios
        .get('/api/featureAll', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          dispatch(setFeatures({ features: response.data }));
        })
        .catch(err => {
          console.error('error in getFeaturesFromApi', err); // eslint-disable-line no-console
        });
    })
    .catch(err => {
      console.error('error in getToken', err); // eslint-disable-line no-console
    });
};
