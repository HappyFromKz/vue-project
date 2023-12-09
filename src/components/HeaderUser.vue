<script>
import authService from "@/services/auth/auth.service";

export default {
  name: "HeaderUser",
  data(){
    return {
      username: localStorage.getItem('name')
    }
  },
  methods:{
    logout(){
      authService.logout() ? this.$router.push('/auth') : console.log('Error Navbar logout')
    }
  },
  async mounted() {
    let userData = await authService.me(localStorage.getItem('access_token'))
    try {
      localStorage.setItem('name', `${userData.last_name_doc} ${userData.first_name_doc}`)
      this.username = `${userData.last_name_doc} ${userData.first_name_doc}`
    } catch (e){
      console.log(e)
      authService.logout()
    }
  }
}
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link to="/user/cart">
          <button type="button" class="btn btn-info">Корзина</button>
        </router-link>
        <div class="mx-2">
          <div v-if="username">
            <router-link to="/user/profile">
              <span class="navbar-text me-2" style="font-size: 18px">
                {{ username }}
              </span>
            </router-link>
            <button @click="logout" type="button" class="btn btn-danger">Выйти</button>
          </div>
          <div v-else>
            <button @click="logout" type="button" class="btn btn-primary">Войти</button>
          </div>
        </div>

      </div>
    </nav>
  </div>
</template>

<style scoped>
</style>