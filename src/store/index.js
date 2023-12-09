import { createStore } from 'vuex'
import category from "@/store/models/category/category";
import product from "@/store/models/product/product";
import order from "@/store/models/order/order";

export default createStore({
  modules: {
    category,
    product,
    order
  },
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
})
