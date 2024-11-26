<script>
import AuthService from "@/services/auth/auth.service";
import {mapActions, mapState} from "vuex";

export default {
  name: "UserProfile",
  data(){
    return{
      userData: {},
      activeModalProducts: [],
      orderCost: null,
      role: localStorage.getItem('role'),
    }
  },
  computed:{
    ...mapState('order', ['orders'])
  },
  methods:{
    ...mapActions('order', ['getOrders']),
    openModal(order_id){
      this.activeModalProducts = this.orders.find(i => i.order_id == order_id).products
    },
    closeModal(){
      this.activeModalProducts = []
    }
  },
  async mounted() {
    this.userData = await AuthService.me(localStorage.getItem('access_token'))
    await this.getOrders()
    for(let order of this.orders) {
      order.sumCost = 0
      for(let product of order.products) {
        order.sumCost += product.product_price * product.ordered_quantity
      }
    }
  }
}
</script>

<template>
  <div class="mt-5">
    <div>
      <h2>ФИО: {{userData.last_name_doc}} {{userData.first_name_doc}}</h2>
      <h5>Phone: {{userData.phone_number}}</h5>
      <h5>Email: {{userData.email}}</h5>
      <h5>Address: {{userData.address}}</h5>
    </div>
    <div v-if="['admin'].includes(role)" class="d-flex justify-content-center">
      <router-link :to="`/admin/admin-products`">
        <button type="button" class="btn btn-primary">Admin Panel</button>
      </router-link>
    </div>
    <div v-else class="my-3">
      <h3>Заказы:</h3>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Uniq Number</th>
          <th scope="col">Date Buy</th>
          <th scope="col">Total Order Cost</th>
          <th scope="col">Products List</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in orders" :key="index">
          <th scope="row">{{index+1}}</th>
          <td>#{{item.order_id}}</td>
          <td>{{item.order_date}}</td>
          <td>{{item.sumCost}}</td>
          <td>
            <button @click="openModal(item.order_id)" type="button" class="btn btn-link"
                    data-bs-toggle="modal" data-bs-target="#exampleModal">List</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Ordered Products</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Sum Cost</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in activeModalProducts" :key="index">
              <th scope="row">{{index+1}}</th>
              <td>{{ item.product_name }}</td>
              <td>{{item.product_price}}&#36;</td>
              <td>{{item.ordered_quantity}}</td>
              <td>{{item.ordered_quantity*item.product_price}}&#36;</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>