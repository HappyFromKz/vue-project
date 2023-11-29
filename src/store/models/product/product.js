import httpClient from "@/services/http.service";

const product = {
    namespaced: true,
    actions: {
        async getProducts({commit}) {
            try {
                const {data, status} = await httpClient.get('product', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                if (status == 200) {
                    console.log(data)
                    commit('set_products', data)
                }
            } catch (e) {
                console.log(e)
            }
        },
        async postCreateProduct({commit}, form) {
            try {
                const {status} = await httpClient.post('product', form, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async putUpdateProduct({commit}, data) {
            try {
                const {status} = await httpClient.put(`product/${data.id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async destroyDeleteProduct({commit}, id) {
            try {
                const {status} = await httpClient.delete(`product/${id}`, {
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
        set_products(state, data){
            state.products = data
        }
    },
    state: {
        products: []
    },
}

export default product
