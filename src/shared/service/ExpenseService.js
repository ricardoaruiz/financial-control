import BaseService from './BaseService';

const EXPENSE_TYPE_BASE_URL = '/expense-type';

export default class ExpenseService {

    static search(filter) {
        let params = '';
        for(let prop in filter) {
            if (prop === 'active') {
                params += `active=${filter.active}&`;
            }
            else if (filter[prop]) {
                params += `${prop}=${filter[prop]}&`;
            }
        }
        params = params.substr(0, params.length-1)
    
        const url = `${EXPENSE_TYPE_BASE_URL}${params ? `?${params}` : ''}`
    
        return BaseService.http.get(url)
            .then(response => response.data)
            .catch(error => console.log('error', error))        
    }

    static load(id) {
        return BaseService.http.get(`${EXPENSE_TYPE_BASE_URL}/${id}`)
            .then(response => response.data)
            .catch(error => console.log(error));
    }

    static add(expense) {
        return BaseService.http.post(EXPENSE_TYPE_BASE_URL, { ...expense })
            .then(response => response.data)
            .catch(error => console.log('error', error));
    }

    static update(id, expense) {
        return BaseService.http.put(`${EXPENSE_TYPE_BASE_URL}/${id}`, { ...expense })
            .then(response => response.data)
            .catch(error => console.log('error', error));
    }

    static delete(id) {
        return BaseService.http.delete(`${EXPENSE_TYPE_BASE_URL}/${id}`)
            .then(response => response.data)
            .catch(error => console.log(error));
    }

}