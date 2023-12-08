<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="(item, index) in links" :key="index">
            <RouterLink :to="item.url" class="nav-link">{{ item.name }}</RouterLink>
          </li>
        </ul>
        <div v-if="username">
          <span class="navbar-text me-2" style="font-size: 18px">
            {{ username }}
          </span>
          <button @click="logout" type="button" class="btn btn-danger">Выйти</button>
        </div>
        <div v-else>
          <button @click="logout" type="button" class="btn btn-primary">Войти</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

import authService from "@/services/auth/auth.service";

export default {
  name: "Navbar",
  data(){
    return {
      username: localStorage.getItem('name')
    }
  },
  props:{
    links: Array
  },
  methods:{
    logout(){
      authService.logout() ? this.$router.push('/auth') : console.log('Error Navbar logout')
    }
  }
}
</script>

<style scoped>

</style>