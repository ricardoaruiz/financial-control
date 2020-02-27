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

const removerAcentos = (s) => {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

export const startApiServer = () => {
    const server = new Server({
        routes() {
            this.namespace = 'api';
    
            this.get('/expense-type', (schema, request) => {

                const filter = request.queryParams;

                const resultData = hasQueryParams(request) 
                    ? schema.db.expenseType.where(reg => {
                        return (filter['id'] ? reg.id === filter.id : true) 
                            && (filter['name'] ? reg.name.toLowerCase().includes(filter.name.toLowerCase()) : true)
                            && (filter['description'] ? reg.description.toLowerCase().includes(filter.description.toLowerCase()) : true)
                            && (filter['active'] ? '' + reg.active === filter.active : true)
                    })
                    : schema.db.expenseType;

                const orderedResult = resultData.sort((a,b) => {
                    if (removerAcentos(a.name) > removerAcentos(b.name)) return 1;
                    if (removerAcentos(a.name) < removerAcentos(b.name)) return -1;
                    return 0;
                });

                const currentPage = filter['currentPage'] ? filter.currentPage : 0;
                const regsPerPage = filter['regsPerPage'] ? filter.regsPerPage : 5;
                const firstReg = (currentPage -1) * regsPerPage
                const lastReg = firstReg + regsPerPage;

                const result = {
                    pagination: {
                        currentPage,
                        regsPerPage,
                        totalPages: Math.ceil(orderedResult.length / regsPerPage),
                        totalRegs: orderedResult.length
                    },
                    data: currentPage ? orderedResult.slice(firstReg, lastReg) : orderedResult
                };

                return result;
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
            { id: 3, name: 'Água', description: 'Gasto com água', active: true},
            { id: 4, name: 'TV a cabo', description: 'Gasto assinatura de TV', active: true},
            { id: 5, name: 'Internet', description: 'Gasto com assinatura de internet', active: true},
            { id: 6, name: 'Serviços de stream', description: 'Gasto com serviços de stream', active: true},
            { id: 7, name: 'Alimentação', description: 'Gasto com alimentação', active: true},
            { id: 8, name: 'Lazer', description: 'Gasto com lazer', active: true},
            { id: 9, name: 'Carro', description: 'Gasto com manutenções no carro', active: true},
            { id: 10, name: 'Casa', description: 'Gasto com manutenções na casa', active: true},
            { id: 11, name: 'Impostos', description: 'Gasto com Impostos (IPVA, IPTU e etc)', active: true},
            { id: 12, name: 'Diversos', description: 'Outros gastos', active: true},
        ]
    })
}