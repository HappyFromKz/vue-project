<template>
  <div class="container">
    <navbar :links="links"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "AdminPage",
  components: {Navbar},
  data(){
    return {
      links: [
        {url: '/user/user-products', label: 'Home', icon: 'pi pi-home'},
        {url: '/admin/admin-products', label: 'Products', icon: 'pi pi-star'},
        {url: '/admin/categories', label: 'Categories', icon: 'pi pi-bars'},
        {url: '/admin/orders', label: 'Orders', icon: 'pi pi-list'},
      ]
    }
  }
}
</script>

<style scoped>

</style>