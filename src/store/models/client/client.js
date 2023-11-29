import httpClient from "@/services/http.service";

const client = {
    namespaced: true,
    actions: {
        async getClients({commit}) {
            try {
                const {data, status} = await httpClient.get('client', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                if (status == 200) {
                    console.log(data)
                    commit('set_clients', data)
                }
            } catch (e) {
                console.log(e)
            }
        },
        async postCreateClient({commit}, form) {
            try {
                const {status} = await httpClient.post('client', form, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async putUpdateClient({commit}, data) {
            try {
                const {status} = await httpClient.put(`client/${data.id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async destroyDeleteClient({commit}, id) {
            try {
                const {status} = await httpClient.delete(`client/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
    },
    mutations: {
        set_clients(state, data){
            state.clients = data
        }
    },
    state: {
        clients: []
    },
}

export default client
