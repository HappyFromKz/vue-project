<template>
  <div class="container">
    <div class="w-50 mx-auto mt-5">
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">@</span>
        <input v-model="form.email"
            type="text" class="form-control" placeholder="Почта" aria-label="Username" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">*</span>
        <input v-model="form.password"
            type="password" class="form-control" placeholder="Пароль" aria-label="Username" aria-describedby="basic-addon1">
      </div>
      <button @click="login" type="button" class="btn btn-primary">Войти</button>
    </div>
  </div>
</template>

<script>
import authService from "@/services/auth/auth.service";

export default {
  name: "AuthPage",
  data(){
    return {
      form:{
        password: null,
        email: '',
      }
    }
  },
  methods:{
    async login(){
      if (await authService.login(this.form)){
        this.$router.push('/home')
      }
    }
  },
}
</script>

<style scoped>

</style>