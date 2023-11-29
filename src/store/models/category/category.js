import httpClient from "@/services/http.service";

const category = {
    namespaced: true,
    actions: {
        async getCategories({commit}) {
            try {
                const {data, status} = await httpClient.get('category/categories', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                if (status == 200) {
                    console.log(data)
                    commit('set_categories', data)
                }
            } catch (e) {
                console.log(e)
            }
        },
        async postCreateCategory({commit}, form) {
            try {
                const {status} = await httpClient.post('category/store-Category', form, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async putUpdateCategory({commit}, data) {
            try {
                const {status} = await httpClient.put(`category/update-Category/${data.id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async destroyDeleteCategory({commit}, id) {
            try {
                const {status} = await httpClient.delete(`category/delete-Category/${id}`, {
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
        set_categories(state, data){
            state.categories = data
        }
    },
    state: {
        categories: []
    },
}

export default category
