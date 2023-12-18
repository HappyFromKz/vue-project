<template>
  <Button v-if="['moderator', 'admin'].includes(role)" @click="openModal('Create')" style="margin-bottom: 20px;"
          type="button" class="p-button-primary">Create</Button>

  <DataTable :value="products" tableStyle="min-width: 50rem">
    <Column header="#">
      <template #body="{index}">
        {{ index + 1 }}
      </template>
    </Column>
    <Column field="name" header="Name"></Column>
    <Column header="Image">
      <template #body="{data}">
        <img width="100" height="100" :src="data.image" alt="">
      </template>
    </Column>
    <Column field="name" header="Name"></Column>
    <Column field="price" header="Price"></Column>
    <Column field="quantity" header="Quantity"></Column>
    <Column field="description" style="font-size: 12px" header="Description"></Column>
    <Column v-if="categories.length > 0" field="description" header="Category">
      <template #body="{data}">
        {{categories.find(i => i.id == data.category_id).name}}
      </template>
    </Column>
    <Column v-if="['moderator', 'admin'].includes(role)" field="category" header="Category">
      <template #body="{data}">
        <Button v-if="['moderator', 'admin'].includes(role)" @click="openModal('Update', data.id)"
                type="button" class="p-button-success mx-2">Change</Button>
        <Button v-if="['admin'].includes(role)" @click="deleteClient(data.id)" type="button" class="p-button-danger"
                style="margin-top: 10px;">Delete</Button>
      </template>
    </Column>
  </DataTable>

  <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '60vw', '575px': '75vw' }">
    <template #header>
      {{activeModalMethod}} Category
    </template>
    <label>Name</label><br>
    <InputText type="text" class="form-control mb-2" placeholder="Name" v-model="modalData.name"/>
    <br>
    <label>Picture</label><br>
    <InputText type="text" class="form-control mb-2" placeholder="Name" v-model="modalData.image"/>
    <br>
    <label>Price&#36;</label><br>
    <InputText type="number" class="form-control mb-2" placeholder="Price" v-model="modalData.price"/>
    <br>
    <label>Quantity</label><br>
    <InputText type="number" class="form-control mb-2" placeholder="Price" v-model="modalData.quantity"/>
    <br>
    <label>Description</label><br>
    <Textarea v-model="modalData.description" rows="5" cols="30" /><br>
    <label>Category</label><br>
    <Dropdown v-model="modalData.category_id" :options="[{id: null, name:'Выберите категорию'}, ...categories]" optionLabel="name" optionValue="id" placeholder="Select a City" class="w-full md:w-14rem" />
    <template #footer>
      <Button type="button" class="p-button-secondary" @clic="closeModal">Close</Button>
      <Button v-if="activeModalMethod === 'Create'" type="button"
              class="p-button-primary" @click="createClient">Create</Button>
      <Button v-if="activeModalMethod === 'Update'" type="button"
              class="p-button-primary" @click="updateClient">Update</Button>
    </template>
  </Dialog>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "AdminProductsPage",
  data(){
    return {
      role: localStorage.getItem('role'),
      modalData: {},
      activeModalMethod: '',
      visible: false
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
      this.visible = true
      this.activeModalMethod = modalMethod
      id ? this.modalData = {...this.products.find(i => i.id == id)} : this.modalData = {name: '', price: null, quantity: null, category_id: null, image: '', description: ''}
    },
    closeModal(){
      this.activeModalMethod = ''
      this.modalData = {}
      this.visible = false
    },
    async createClient(){
      this.modalData.price = Number(this.modalData.price)
      let createRes = await this.postCreateProduct(this.modalData)
      if (createRes){
        await this.getProducts()
        this.closeModal()
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
        this.closeModal()
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