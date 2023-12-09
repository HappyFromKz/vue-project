import httpClient from "@/services/http.service";

const product = {
    namespaced: true,
    actions: {
        async getProducts({commit}) {
            try {
                const {data, status} = await httpClient.get('product');
                if (status == 200) {
                    console.log(data)
                    commit('set_products', data)
                }
            } catch (e) {
                console.log(e)
            }
        },
        async getProduct({commit}, id) {
            try {
                const {data, status} = await httpClient.get(`product/${id}`);
                if (status == 200) {
                    console.log(data)
                    commit('set_product', data)
                }
            } catch (e) {
                console.log(e)
            }
        },
        async postCreateProduct({commit}, form) {
            try {
                const {status} = await httpClient.post('product', form);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async putUpdateProduct({commit}, data) {
            try {
                const {status} = await httpClient.put(`product/${data.id}`, data);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async destroyDeleteProduct({commit}, id) {
            try {
                const {status} = await httpClient.delete(`product/${id}`);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
    },
    mutations: {
        set_products(state, data){
            state.products = data
        },
        set_product(state, data){
            state.product = data
        }
    },
    state: {
        products: [],
        product: {}
    },
}

export default product
