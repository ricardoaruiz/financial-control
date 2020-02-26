import axios from 'axios';

export default class BaseService {

    static _http = null;

    static get http() {
        if (!BaseService._http) {
            BaseService._http = axios.create({
                baseURL: 'http://localhost:3000/api'
            });
        }
        return BaseService._http;
    }

}