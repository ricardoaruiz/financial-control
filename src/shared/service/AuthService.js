export default class AuthService {

    static login() {
        localStorage.setItem('token', '123456');
        return '123456';
    }

    static logout() {
        localStorage.removeItem('token');
    }

    static getLocalToken() {
        return AuthService.isLogged() 
            ? localStorage.getItem('token')
            : undefined;
    }

    static isLogged() {
        const token = localStorage.getItem('token');
        return token !== null && token !== undefined;
    }

}