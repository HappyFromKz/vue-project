<template>
  <DataTable :value="all_orders" tableStyle="min-width: 50rem">
    <Column header="#">
      <template #body="{index}">
        {{ index + 1 }}
      </template>
    </Column>
    <Column field="order_date" header="Order date"></Column>
    <Column header="Client">
      <template #body="{data}">
        <p>{{ data.client.client_name }} {{ data.client.client_email }}</p>
      </template>
    </Column>
    <Column header="Заказанные продукты">
      <template #body="{data}">
        <p v-for="(product, index) in data.products" :key="index">{{ product.product_name }}</p>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "CategoriesPage",
  data() {
    return {}
  },
  computed: {
    ...mapState('order', ['all_orders'])
  },
  methods: {
    ...mapActions('order', ['getAllOrders']),

  },
  async mounted() {
    await this.getAllOrders()
  }
}
</script>

<style scoped>

</style>