<script>
import {mapActions, mapState} from "vuex";
import {addCart} from "@/functions/cart";

export default {
  name: "UserProduct",
  data(){
    return{
      product_id: this.$route.params.id
    }
  },
  computed:{
    ...mapState('product', ['product'])
  },
  methods:{
    ...mapActions('product', ['getProduct']),
    addCart,
  },
  async mounted() {
    await this.getProduct(this.product_id)
  }
}
</script>

<template>
  <div class="my-3 d-flex justify-content-start">
    <router-link to="/user">
      <button  type="button" class="btn btn-secondary">
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
    </router-link>
  </div>

  <div class="card">
    <div class="card-header">
      <img :src="product.image" alt="">
      <h2>{{product.name}}</h2>
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <h3>{{product.price}}&#36;</h3>
        <p>{{product.description}}</p>
        <footer class="footer">
          <button @click="addCart(product.id, [product])" type="button" class="btn btn-success">
            <span class="material-symbols-outlined">add_shopping_cart</span>
          </button>
        </footer>
      </blockquote>
    </div>
  </div>
</template>

<style scoped>

</style>