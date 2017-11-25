import { SET_LOGIN_STATUS, SET_USER_NAME } from './constants/actions';

export function setLoginStatus({ loggedIn, userName, isAdmin }) {
	return { type: SET_LOGIN_STATUS, payload: { loggedIn, userName, isAdmin } };
}

export function setUserName(userName) {
	return { type: SET_USER_NAME, payload: userName };
}
