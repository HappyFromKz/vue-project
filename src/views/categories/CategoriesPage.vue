<template>
  <div class="container">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col" v-if="['moderator', 'admin'].includes(role)">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in categories" :key="index">
        <th scope="row">{{index+1}}</th>
        <td>{{item.name}}</td>
        <td v-if="['moderator', 'admin'].includes(role)">
          <button v-if="['moderator', 'admin'].includes(role)" @click="openModal('Update', item.id)"
                  type="button" class="btn btn-success mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Change</button>
          <button v-if="['admin'].includes(role)" @click="deleteCategory(item.id)" type="button" class="btn btn-danger">Delete</button>
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
          <label>Lastname</label>
          <input type="text" class="form-control mb-2" placeholder="Lastname" v-model="modalData.name">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @clic="closeModal">Close</button>
          <button v-if="activeModalMethod === 'Create'" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                  class="btn btn-primary" @click="createCategory">Create</button>
          <button v-if="activeModalMethod === 'Update'" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                  class="btn btn-primary" @click="updateCategory">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "CategoriesPage",
  data(){
    return {
      role: localStorage.getItem('role'),
      modalData: {},
      activeModalMethod: ''
    }
  },
  computed: {
    ...mapState('category', ['categories'])
  },
  methods: {
    ...mapActions('category', ['getCategories', 'putUpdateCategory', 'destroyDeleteCategory', 'postCreateCategory']),
    openModal(modalMethod, id = null){
      this.activeModalMethod = modalMethod
      id ? this.modalData = {...this.categories.find(i => i.id == id)} : this.modalData = {name: ''}
    },
    closeModal(){
      this.activeModalMethod = ''
      this.modalData = {}
    },
    async createCategory(){
      let createRes = await this.postCreateCategory(this.modalData)
      if (createRes){
        await this.getCategories()
      }
    },
    async deleteCategory(id){
      let deleteRes = await this.destroyDeleteCategory(id)
      if (deleteRes){
        await this.getCategories()
      }
    },
    async updateCategory(){
      let updateRes = await this.putUpdateCategory(this.modalData)
      if (updateRes){
        await this.getCategories()
      }
    }
  },
  async mounted() {
    await this.getCategories()
  }
}
</script>

<style scoped>

</style>