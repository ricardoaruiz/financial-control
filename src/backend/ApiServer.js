import { Server } from 'miragejs';

/**
 * Check if has queryparams on request
 * @param {*} request 
 */
const hasQueryParams = request => {
    const queryParams = request.queryParams;
    for(var prop in queryParams) {
        if (queryParams.hasOwnProperty(prop)) {
            return true
        }
    }
    return false;
} 

export const startApiServer = () => {
    const server = new Server({
        routes() {
            this.namespace = 'api';
    
            this.get('/expense-type', (schema, request) => {
                const filter = request.queryParams;

                return hasQueryParams(request) 
                    ? schema.db.expenseType.where(reg => {
                        return (filter['id'] ? reg.id === filter.id : true) 
                            && (filter['name'] ? reg.name.toLowerCase().includes(filter.name.toLowerCase()) : true)
                            && (filter['description'] ? reg.description.toLowerCase().includes(filter.description.toLowerCase()) : true)
                            && (filter['active'] ? '' + reg.active === filter.active : true)
                    })
                    : schema.db.expenseType;
            });

            this.get('/expense-type/:id', (schema, request) => {
                return schema.db.expenseType.find(request.params.id);
            });

            this.post('/expense-type', (schema, request) => {
                const expenseType = JSON.parse(request.requestBody);
                return schema.db.expenseType.insert(expenseType);
            });

            this.put('/expense-type/:id', (schema, request) => {
                const expenseId = request.params.id;
                const expense = JSON.parse(request.requestBody);
                schema.db.expenseType.update(expenseId, expense);
            })

            this.delete('/expense-type/:id', (schema, request) => {
                return schema.db.expenseType.remove(request.params.id);
            })
        }
    });

    server.db.loadData({
        expenseType: [
            { id: 1, name: 'Educação', description: 'Escola, cursos e etc', active: true},
            { id: 2, name: 'Luz', description: 'Gasto com eletricidade', active: false},
            { id: 3, name: 'Água', description: 'Gasto com água', active: true}
        ]
    })
}