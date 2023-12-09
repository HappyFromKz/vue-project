<template>
  <div class="container">
    <navbar v-if="['moderator', 'admin'].includes(isPersonal)" :links="links"/>
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
      isPersonal: localStorage.getItem('role'),
      links: [
        {url: '/admin/admin-products', name: 'Products'},
        {url: '/admin/categories', name: 'Categories'},
      ]
    }
  }
}
</script>

<style scoped>

</style>