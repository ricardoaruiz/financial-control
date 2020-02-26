import { AUTH_ACTIONS } from '../actions/auth-actions';

const INITIAL_STATE = {
    isLogged: false,
    token: undefined
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN:
            return { ...state, ...action.payload }    
        case AUTH_ACTIONS.LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
}