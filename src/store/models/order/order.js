import httpClient from "@/services/http.service";

const order = {
    namespaced: true,
    actions: {
        async getOrders({commit}) {
            try {
                const {data, status} = await httpClient.get('order');
                if (status == 200) {
                    console.log(data)
                    commit('set_orders', data)
                }
            } catch (e) {
                console.log(e)
            }
        },
        async createOrder({commit},products){
            try {
                const {status} = await httpClient.post('order', products);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
    },
    mutations: {
        set_orders(state, data){
            state.orders = data
        }
    },
    state: {
        orders: []
    },
}

export default order
