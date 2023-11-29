<template>
  <div class="container">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Product</th>
        <th scope="col">Category</th>
        <th scope="col">Client</th>
        <th scope="col">Date</th>
        <th scope="col" v-if="['moderator', 'admin'].includes(role)">Actions</th>
      </tr>
      </thead>
      <tbody v-if="clients.length > 0 && products.length > 0 && orders.length > 0">
      <tr v-for="(item, index) in orders" :key="index">
        <th scope="row">{{index+1}}</th>
        <td>{{item.products.product_name}}</td>
        <td>{{item.products.category.category_name}}</td>
        <td>{{item.client.client_name}}</td>
        <td>{{item.order_date}}</td>
        <td v-if="['moderator', 'admin'].includes(role)">
          <button v-if="['moderator', 'admin'].includes(role)" @click="openModal('Update', item.order_id)"
                  type="button" class="btn btn-success mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Change</button>
          <button v-if="['admin'].includes(role)" @click="deleteOrder(item.order_id)" type="button" class="btn btn-danger">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <button v-if="['moderator', 'admin'].includes(role)" @click="openModal('Create')"
            type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Create</button>
  </div>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{activeModalMethod}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label>Product</label>
          <select class="form-select" v-model="modalData.product_id">
            <option v-for="(product, index) in [{id: null, name:'Choose a product'}, ...products]"
                    :key="index"
                    :value="product.id">
              {{ product.name }}
            </option>
          </select>
          <label>Client</label>
          <select class="form-select" v-model="modalData.client_id">
            <option v-for="(client, index) in [{id: null, last_name_doc:'Choose a client'}, ...clients]"
                    :key="index"
                    :value="client.id">
              {{ client.last_name_doc }}
            </option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @clic="closeModal">Close</button>
          <button v-if="activeModalMethod === 'Create'" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                  class="btn btn-primary" @click="createOrder">Create</button>
          <button v-if="activeModalMethod === 'Update'" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                  class="btn btn-primary" @click="updateOrder">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "ProductsPage",
  data(){
    return {
      role: localStorage.getItem('role'),
      modalData: {},
      activeModalMethod: ''
    }
  },
  computed: {
    ...mapState('order', ['orders']),
    ...mapState('product', ['products']),
    ...mapState('client', ['clients'])
  },
  methods:{
    ...mapActions('order', ['getOrders', "postCreateOrder", "putUpdateOrder", "destroyDeleteOrder"]),
    ...mapActions('product', ['getProducts']),
    ...mapActions('client', ['getClients']),
    openModal(modalMethod, id = null){
      this.activeModalMethod = modalMethod
      if (id){
        let order = this.orders.find(i => i.order_id == id)
        console.log(order)
        this.modalData = {
          order_id: order.order_id,
          client_id: order.client.client_id,
          product_id: order.products.product_id
        }
      } else {
        this.modalData = {client_id: null, product_id: null}
      }
    },
    closeModal(){
      this.activeModalMethod = ''
      this.modalData = {}
    },
    async createOrder(){
      let createRes = await this.postCreateOrder(this.modalData)
      if (createRes){
        await this.getOrders()
      }
    },
    async deleteOrder(id){
      let deleteRes = await this.destroyDeleteOrder(id)
      if (deleteRes){
        await this.getOrders()
      }
    },
    async updateOrder(){
      let updateRes = await this.putUpdateOrder(this.modalData)
      if (updateRes){
        await this.getOrders()
      }
    }
  },
  async mounted() {
    await this.getOrders()
    await this.getProducts()
    await this.getClients()
  }
}
</script>

<style scoped>

</style>