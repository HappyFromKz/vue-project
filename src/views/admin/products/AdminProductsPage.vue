<template>
  <div class="container">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Image</th>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Quantity</th>
        <th scope="col">Description</th>
        <th scope="col">Category</th>
        <th scope="col" v-if="['moderator', 'admin'].includes(role)">Actions</th>
      </tr>
      </thead>
      <tbody v-if="categories.length > 0 && products.length > 0">
      <tr v-for="(item, index) in products" :key="index">
        <th scope="row">{{index+1}}</th>
        <td><img width="100" height="100" :src="item.image" alt=""></td>
        <td>{{item.name}}</td>
        <td>{{item.price}}&#36;</td>
        <td>{{item.quantity}}</td>
        <td style="font-size: 12px">{{item.description}}</td>
        <td>{{categories.find(i => i.id == item.category_id).name}}</td>
        <td v-if="['moderator', 'admin'].includes(role)">
          <button v-if="['moderator', 'admin'].includes(role)" @click="openModal('Update', item.id)"
                  type="button" class="btn btn-success mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Change</button>
          <button v-if="['admin'].includes(role)" @click="deleteClient(item.id)" type="button" class="btn btn-danger">Delete</button>
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
          <label>Name</label>
          <input type="text" class="form-control mb-2" placeholder="Name" v-model="modalData.name">
          <label>Picture</label>
          <input type="text" class="form-control mb-2" placeholder="Name" v-model="modalData.image">
          <label>Price&#36;</label>
          <input type="number" class="form-control mb-2" placeholder="Price" v-model="modalData.price">
          <label>Quantity</label>
          <input type="number" class="form-control mb-2" placeholder="Price" v-model="modalData.quantity">
          <label>Description</label>
          <textarea type="text" class="form-control mb-2" placeholder="Quantity" v-model="modalData.description"></textarea>
          <label>Category</label>
          <select class="form-select" v-model="modalData.category_id">
            <option v-for="(category, index) in [{id: null, name:'Выберите категорию'}, ...categories]"
                    :key="index"
                    :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @clic="closeModal">Close</button>
          <button v-if="activeModalMethod === 'Create'" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                  class="btn btn-primary" @click="createClient">Create</button>
          <button v-if="activeModalMethod === 'Update'" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                  class="btn btn-primary" @click="updateClient">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "AdminProductsPage",
  data(){
    return {
      role: localStorage.getItem('role'),
      modalData: {},
      activeModalMethod: ''
    }
  },
  computed: {
    ...mapState('product', ['products']),
    ...mapState('category', ['categories'])
  },
  methods:{
    ...mapActions('product', ['getProducts', 'postCreateProduct', 'destroyDeleteProduct', 'putUpdateProduct']),
    ...mapActions('category', ['getCategories']),
    openModal(modalMethod, id = null){
      this.activeModalMethod = modalMethod
      id ? this.modalData = {...this.products.find(i => i.id == id)} : this.modalData = {name: '', price: null, quantity: null, category_id: null, image: '', description: ''}
    },
    closeModal(){
      this.activeModalMethod = ''
      this.modalData = {}
    },
    async createClient(){
      this.modalData.price = Number(this.modalData.price)
      let createRes = await this.postCreateProduct(this.modalData)
      if (createRes){
        await this.getProducts()
      }
    },
    async deleteClient(id){
      let deleteRes = await this.destroyDeleteProduct(id)
      if (deleteRes){
        await this.getProducts()
      }
    },
    async updateClient(){
      this.modalData.price = Number(this.modalData.price)
      let updateRes = await this.putUpdateProduct(this.modalData)
      if (updateRes){
        await this.getProducts()
      }
    }
  },
  async mounted() {
    await this.getProducts()
    await this.getCategories()
  }
}
</script>

<style scoped>

</style>