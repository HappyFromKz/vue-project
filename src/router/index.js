import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from "@/views/AuthPage.vue";
import App from "@/App.vue";
import HomePage from "@/views/HomePage.vue";
import ProductsPage from "@/views/products/ProductsPage.vue";
import ClientsPage from "@/views/clients/ClientsPage.vue";
import CategoriesPage from "@/views/categories/CategoriesPage.vue";
import OrdersPage from "@/views/orders/OrdersPage.vue";

const routes = [
  {
    path: '/',
    name: 'app',
    component: App
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthPage
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/orders',
    component: HomePage,
    children: [
      {
        path: 'products',
        name: 'products',
        component: ProductsPage
      },
      {
        path: 'clients',
        name: 'clients',
        component: ClientsPage
      },
      {
        path: 'categories',
        name: 'categories',
        component: CategoriesPage
      },
      {
        path: 'orders',
        name: 'orders',
        component: OrdersPage
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
