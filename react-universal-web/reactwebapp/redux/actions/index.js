import axios from 'axios';
import history from '../../utils/history';
import { AUTH_USER, UNAUTH_USER, GOOGLE_AUTH_USER, AUTH_ERROR, FETCH_USER, ADMIN_USER, FETCH_USERS, DELETE_USER } from './types';

const ROOT_URL = process.env.PORT || 'http://localhost:3005';

export function signinUser({ email, password }) {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${ROOT_URL}/signin`, { email, password } )
            let token = response.data.token;
            // update state to indicate user is authenticated
            dispatch({ type: AUTH_USER });
            // save the JWT token
            localStorage.setItem('token', token);
            // redirect to the route that is protected
            history.push('/profile');
        } catch(error) {
            dispatch(authError('We did not recognize that email or password. Try again'));
        }
    }
}

export function signupUser({ email, password }) {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${ROOT_URL}/signup`, { email, password } )
            let token = response.data.token;
            // update state to indicate user is authenticated
            dispatch({ type: AUTH_USER });
            // save the JWT token
            localStorage.setItem('token', token);
            // redirect to the route that is protected
            history.push('/profile');
        } catch(error) {
            dispatch(authError(error.response.data.error));
        }
    }
}

export function authError(err) {
    return {
        type: AUTH_ERROR,
        payload: err,
    }
}

export function signoutUser() {
    localStorage.removeItem('token')
    return {
        type: UNAUTH_USER,
    }
}

export function fetchUser() {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${ROOT_URL}/user`, {
                // pass in headers as option of request
                headers: { authorization: localStorage.getItem('token')}
            });
            dispatch({
                type: FETCH_USER,
                payload: response.data.user
            })
        } catch(error) {

        }
    }
}

export function isAdmin() {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${ROOT_URL}/admin`, {
                // pass in headers as option of request
                headers: { authorization: localStorage.getItem('token')}
            });
            dispatch({
                type: ADMIN_USER,
                payload: response.data.role
            })
        } catch(error) {

        }
    }
}

export function fetchUsers() {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${ROOT_URL}/users`, {
                // pass in headers as option of request
                headers: { authorization: localStorage.getItem('token')}
            });
            dispatch({
                type: FETCH_USERS,
                payload: response.data.users
            })
        } catch(error) {

        }
    }
}

export function deleteUser() {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${ROOT_URL}/user`, {
                // pass in headers as option of request
                headers: { authorization: localStorage.getItem('token')}
            });
            dispatch({
                type: DELETE_USER,
                payload: response.data.response
            })
            localStorage.removeItem('token')
            history.push('/');
            return {
                type: UNAUTH_USER,
            }
        } catch(error) {

        }
    }
}

export function googleSigninUser() {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${ROOT_URL}/oauth/google` )
            console.log("work damn it")
            let token = response.data.token;
            // update state to indicate user is authenticated
            dispatch({ type: GOOGLE_AUTH_USER });
            // save the JWT token
            localStorage.setItem('token', token);
            // redirect to the route that is protected
            history.push('/profile');
        } catch(error) {
            dispatch(authError('Hmm, looks like we are having trouble signing you in through Google'));
        }
    }
}