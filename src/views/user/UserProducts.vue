<script>
import {mapActions, mapState} from "vuex";
import {addCart} from "@/functions/cart";

export default {
  name: "UserProducts",
  computed: {
    ...mapState('product', ['products']),
  },
  methods:{
    ...mapActions('product', ['getProducts']),
    addCart
  },
  async mounted() {
    await this.getProducts()
  }

}
</script>

<template>
  <div class="row row-cols-3">
    <div class="p-3 col" v-for="(product, index) in products" :key="index">
      <div class="card">
        <img :src="product.image" class="card-img-top" alt="?">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">{{product.price}}&#36;</p>
          <div class="actions">
            {{product.id}}
            <button @click="addCart(product.id, products)" type="button" class="btn btn-success">
              <span class="material-symbols-outlined">add_shopping_cart</span>
            </button>
            <router-link :to="`/user/user-product/${product.id}`">
              <button type="button" class="btn btn-primary">
                <span class="material-symbols-outlined">visibility</span>
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.actions{
  display: flex;
  justify-content: space-evenly;
}
</style>