<template>
  <Menubar :model="links" style="margin-bottom: 20px;">
    <template #item="{ item}">
      <router-link class="m-1" :to="item.url">
        <Button type="button" class="p-button-danger">
          <span class="me-1" :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </Button>
      </router-link>
    </template>
    <template #end>
      <router-link to="/user/profile">
        <span class="navbar-text p-0 mx-auto me-2" style="font-size: 18px">
          {{ username }}
        </span>
      </router-link>
      <Button @click="logout" type="button" class="p-button-danger">Выйти</Button>
    </template>
  </Menubar>
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
      authService.logout() ? this.$router.push('/login') : console.log('Error Navbar logout')
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

<style scoped>

</style>