<template>
  <div class="container">
    <HeaderUser/>
    <router-view/>
  </div>
</template>

<script>

import HeaderUser from "@/components/HeaderUser.vue";

export default {
  name: "UserPage",
  components: {HeaderUser},
}
</script>

<style scoped>

</style>