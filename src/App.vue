<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  data() {
    return{
      userRole: localStorage.getItem('role'),
    }
  },
  async mounted() {
    if (['moderator', 'admin'].includes(this.userRole)) {
      this.$router.push('/admin')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>
