<template>
  <HeaderUser v-if="role !== 'admin'"/>
  <div class="container">
    <div class="w-50 mx-auto mt-5">
      <div>
        <p class="mb-1 mt-2">Почта</p>
        <InputText type="text" v-model="form.email" placeholder="Фамилия"/>
        <p class="mb-1 mt-2">Пароль</p>
        <Password v-model="form.password" toggleMask placeholder="Пароль"/>
      </div>
      <Button @click="login" type="button" style="margin-top: 20px;">Войти</Button>
    </div>
    <span>Нет аккаунта?</span> <router-link to="/register">Создать</router-link>
  </div>
</template>

<script>
import authService from "@/services/auth/auth.service";
import HeaderUser from "@/components/HeaderUser.vue";

export default {
  name: "LoginPage",
  components: {HeaderUser},
  data(){
    return {
      role: localStorage.getItem('role') || '',
      form:{
        password: null,
        email: '',
      }
    }
  },
  methods:{
    async login(){
      if (await authService.login(this.form)){
        localStorage.getItem('role') === 'user' ? this.$router.push('/user') : this.$router.push('/admin')
      }
    }
  },
}
</script>

<style scoped>

</style>