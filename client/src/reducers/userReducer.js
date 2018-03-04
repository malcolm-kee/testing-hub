import { SET_LOGIN_STATUS, SET_USER_NAME } from './../constants/actions';

const DEFAULT_STATE = {
  loggedIn: null,
  userName: '',
  isAdmin: false
};

const setLoginStatus = (state, action) => Object.assign({}, state, action.payload);

const setUserName = (state, action) => Object.assign({}, state, { userName: action.payload });

export const userReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return setLoginStatus(state, action);
    case SET_USER_NAME:
      return setUserName(state, action);
    default:
      return state;
  }
};

export const getLoginState = state => state.loggedIn;
export const getUserName = state => state.userName;
export const getIsAdmin = state => state.isAdmin;
