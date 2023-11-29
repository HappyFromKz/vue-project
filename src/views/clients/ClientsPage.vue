<template>
  <div class="container">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Lastname</th>
        <th scope="col">Firstname</th>
        <th scope="col">Number</th>
        <th scope="col">Address</th>
        <th scope="col" v-if="['moderator', 'admin'].includes(role)">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in clients" :key="index">
        <th scope="row">{{index+1}}</th>
        <td>{{item.last_name_doc}}</td>
        <td>{{item.first_name_doc}}</td>
        <td>{{item.phone_number}}</td>
        <td>{{item.address}}</td>
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
          <label>Lastname</label>
          <input type="text" class="form-control mb-2" placeholder="Lastname" v-model="modalData.last_name_doc">
          <label>Firstname</label>
          <input type="text" class="form-control mb-2" placeholder="Firstname" v-model="modalData.first_name_doc">
          <label>Number</label>
          <input type="text" class="form-control mb-2" placeholder="Number" v-model="modalData.phone_number">
          <label>Address</label>
          <input type="text" class="form-control mb-2" placeholder="Address" v-model="modalData.address">
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
  name: "ClientsPage",
  data(){
    return {
      role: localStorage.getItem('role'),
      modalData: {},
      activeModalMethod: ''
    }
  },
  computed: {
    ...mapState('client', ['clients'])
  },
  methods:{
    ...mapActions('client', ['getClients', 'postCreateClient', "destroyDeleteClient", 'putUpdateClient']),
    openModal(modalMethod, id = null){
      this.activeModalMethod = modalMethod
      id ? this.modalData = {...this.clients.find(i => i.id == id)} : this.modalData = {last_name_doc: '', first_name_doc: '', phone_number: '', address: ''}
    },
    closeModal(){
      this.activeModalMethod = ''
      this.modalData = {}
    },
    async createClient(){
      let createRes = await this.postCreateClient(this.modalData)
      if (createRes){
        await this.getClients()
      }
    },
    async deleteClient(id){
      let deleteRes = await this.destroyDeleteClient(id)
      if (deleteRes){
        await this.getClients()
      }
    },
    async updateClient(){
      let updateRes = await this.putUpdateClient(this.modalData)
      if (updateRes){
        await this.getClients()
      }
    }
  },
  async mounted() {
    await this.getClients()
  }
}
</script>

<style scoped>

</style>