<template>
  <div class="container">
    <navbar v-if="isAuth" :links="links"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "HomePage",
  components: {Navbar},
  data(){
    return {
      isAuth: localStorage.getItem('access_token'),
      links: [
        {url: '/home/orders', name: 'Orders'},
        {url: '/home/products', name: 'Products'},
        {url: '/home/clients', name: 'Clients'},
        {url: '/home/categories', name: 'Categories'},
      ]
    }
  }
}
</script>

<style scoped>

</style>