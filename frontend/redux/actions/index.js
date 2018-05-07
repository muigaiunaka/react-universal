import axios from 'axios';
import history from '../../utils/history';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_USER } from './types';

const ROOT_URL = 'http://localhost:3005';

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
            dispatch(authError('Bad Sign in Info'));
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
            const response = await axios.get(`${ROOT_URL}`, {
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