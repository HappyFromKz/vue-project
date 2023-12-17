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
        {url: '/admin/admin-products', label: 'Products', icon: 'pi pi-star'},
        {url: '/admin/categories', label: 'Categories', icon: 'pi pi-home'},
      ]
    }
  }
}
</script>

<style scoped>

</style>