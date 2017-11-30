import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import featureReducer from './featureReducer';

const rootReducer = combineReducers({
  form: formReducer,
  features: featureReducer
});

export default rootReducer;
