import httpClient from "@/services/http.service";

const order = {
    namespaced: true,
    actions: {
        async getOrders({commit}) {
            try {
                const {data, status} = await httpClient.get('order', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                if (status == 200) {
                    console.log(data.orders)
                    commit('set_orders', data.orders)
                }
            } catch (e) {
                console.log(e)
            }
        },
        async postCreateOrder({commit}, form) {
            try {
                const {status} = await httpClient.post('order', form, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async putUpdateOrder({commit}, data) {
            try {
                const {status} = await httpClient.put(`order/${data.order_id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async destroyDeleteOrder({commit}, id) {
            try {
                const {status} = await httpClient.delete(`order/${id}`, {
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
        set_orders(state, data){
            state.orders = data
        }
    },
    state: {
        orders: []
    },
}

export default order
