<script>
import {mapActions, mapState} from "vuex";
import loginPage from "@/views/auth/LoginPage.vue";
import authService from "@/services/auth/auth.service";
import order from "@/store/models/order/order";

export default {
  name: "UserCart",
  data(){
    return {
      cartItems: [],
      cartProducts: [],
      cartCost: null,
    }
  },
  computed:{
    ...mapState('product', ['products']),
  },
  methods:{
    ...mapActions('product', ['getProducts']),
    ...mapActions('order', ['createOrder']),
    deleteCartItem(id){
      let cart = JSON.parse(localStorage.getItem('cart'))
      let deletedCart = cart.filter(i => i.id !== id)
      localStorage.setItem('cart', JSON.stringify(deletedCart))
      this.getCurrentCart()
    },
    getCurrentCart(){
      this.cartItems = JSON.parse(localStorage.getItem('cart'))
      if (this.cartItems && this.cartItems.length>0){
        this.cartProducts = []
        for(let item of this.cartItems){
          let product = this.products.find(i => i.id == item.product_id)
          this.cartCost += product.price * item.quantity
          this.cartProducts.push({
                id: item.id,
                name: product.name,
                image: product.image,
                price: product.price,
                cartQuantity: item.quantity,
                sumCost: product.price * item.quantity
              }
          )
        }
      } else {
        this.cartProducts = []
      }
    },
    plusQuantity(id){
      let cart = JSON.parse(localStorage.getItem('cart'))
      cart.find(i => i.id == id).quantity = cart.find(i => i.id == id).quantity+1
      localStorage.setItem('cart', JSON.stringify(cart))
      this.getCurrentCart()
    },
    minusQuantity(id){
      let cart = JSON.parse(localStorage.getItem('cart'))
      cart.find(i => i.id == id).quantity = cart.find(i => i.id == id).quantity-1
      localStorage.setItem('cart', JSON.stringify(cart))
      this.getCurrentCart()
    },
    async buyProducts(){
      if (await authService.me(localStorage.getItem('access_token'))){
        let cart = JSON.parse(localStorage.getItem('cart'))
        let createRes = await this.createOrder(cart)
        if (createRes){
          localStorage.setItem('cart', JSON.stringify([]))
          alert('Вы успешно заказли товары!')
        }
      } else {
        alert('Авторизуйтесь прежде чем купить что либо!')
        this.$router.push('/auth')
      }
    }
  },
  async mounted() {
    await this.getProducts()
    this.getCurrentCart()
  }
}
</script>

<template>
  <div class="my-3 d-flex justify-content-start">
    <router-link to="/user">
      <button  type="button" class="btn btn-secondary">В магазин</button>
    </router-link>
  </div>
  <div class="mt-3" v-if="cartProducts.length > 0">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Image</th>
        <th scope="col">Price</th>
        <th scope="col">Quantity</th>
        <th scope="col">Sum Cost</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in cartProducts" :key="index">
        <th scope="row">{{index+1}}</th>
        <td>{{ item.name }}</td>
        <td><img width="60" height="60" :src="item.image" alt=""></td>
        <td>{{item.price}}&#36;</td>
        <td>
          <button @click="minusQuantity(item.id)" type="button" class="btn btn-danger">-</button>
          {{item.cartQuantity}}
          <button @click="plusQuantity(item.id)" type="button" class="btn btn-success">+</button>
        </td>
        <td>{{item.sumCost}}&#36;</td>
        <td>
          <button @click="deleteCartItem(item.id)" type="button" class="btn btn-danger">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <h4>Total cost: {{cartCost}}&#36;</h4>
    <button @click="buyProducts()" type="button" class="btn btn-success">Buy products</button>
  </div>
  <div v-else>
    <h1>Корзина пуста</h1>
  </div>
</template>

<style scoped>

</style>