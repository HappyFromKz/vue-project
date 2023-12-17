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
  <div class="row">
    <div class="col-4 mb-3" v-for="(product, index) in products" :key="index">
      <Card style="width: 25em">
        <template #header>
          <img alt="user header" height="400" width="400" :src="product.image" />
        </template>
        <template #title> {{ product.name }}</template>
        <template #subtitle> {{product.price}}&#36; </template>
        <template #footer>
          <Button @click="addCart(product.id, products)" type="button" class="p-button-success" style="margin-right: 20px;">
            <span class="material-symbols-outlined">add_shopping_cart</span>
          </Button>
          <router-link :to="`/user/user-product/${product.id}`">
            <Button type="button" class="p-button-primary">
              <span class="material-symbols-outlined">visibility</span>
            </Button>
          </router-link>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.actions{
  display: flex;
  justify-content: space-evenly;
}
</style>