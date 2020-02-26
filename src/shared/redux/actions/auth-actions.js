import { AuthService } from "../../service";

const AUTH_ACTIONS = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
}

const login = () => {
    const token = AuthService.login();
    return {
        type: AUTH_ACTIONS.LOGIN,
        payload: { isLogged: true, token }
    }
}

const logout = () => {
    AuthService.logout();
    return {
        type: AUTH_ACTIONS.LOGOUT,
    }
}

const updateToken = () => {
    const token = AuthService.getLocalToken();
    return {
        type: AUTH_ACTIONS.LOGIN,
        payload: { isLogged: token ? true : false, token }
    }
}

export { AUTH_ACTIONS, login, logout, updateToken };