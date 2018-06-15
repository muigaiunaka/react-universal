import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_USER,
    ADMIN_USER,
    FETCH_USERS,
    DELETE_USER
} from '../actions/types'

export default function(state = {}, action) {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true };
        case UNAUTH_USER:
            return { ...state, error: '', authenticated: false };
        case AUTH_ERROR:
            return { ...state, error: action.payload}
        case FETCH_USER:
            return { ...state, user: action.payload }
        case ADMIN_USER:
            return { ...state, role: action.payload }
        case FETCH_USERS:
            return { ...state, users: action.payload }
        case DELETE_USER:
            return { response: action.payload }
        default: 
            return state;
    }

    return state;
}