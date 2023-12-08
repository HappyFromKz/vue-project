import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from "@/views/AuthPage.vue";
import App from "@/App.vue";
import ProductsPage from "@/views/admin/products/ProductsPage.vue";
import CategoriesPage from "@/views/admin/categories/CategoriesPage.vue";
import AdminPage from "@/views/admin/AdminPage.vue";
import UserProducts from "@/views/user/UserProducts.vue";
import UserPage from "@/views/user/UserPage.vue";
import UserProfile from "@/views/user/UserProfile.vue";
import UserCart from "@/views/user/UserCart.vue";

const routes = [
  {
    path: '/',
    name: 'app',
    component: App
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthPage,
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: ProductsPage
      },
      {
        path: 'register',
        name: 'register',
        component: CategoriesPage
      },
    ]
  },
  {
    path: '/user',
    name: 'user',
    redirect: '/user/user-products',
    component: UserPage,
    children: [
      {
        path: 'user-products',
        name: 'user-products',
        component: UserProducts
      },
      {
        path: 'profile',
        name: 'profile',
        component: UserProfile
      },
      {
        path: 'cart',
        name: 'cart',
        component: UserCart
      },
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/admin-products',
    component: AdminPage,
    children: [
      {
        path: 'admin-products',
        name: 'admin-products',
        component: ProductsPage
      },
      {
        path: 'categories',
        name: 'categories',
        component: CategoriesPage
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const pagesWithoutAuthorization = ['login', 'register', 'recovery', 'register-wto']
const pagesForEveryoneWithAuthorization = ['restrict', 'notFound']

router.beforeEach(async (to) => {

  if (pagesWithoutAuthorization.includes(to.name)) {
    return true
  }



  if (to.meta) {
    return true
  }

  return (!to.name) ? {name: 'notFound'} : {name: 'restrict'}

})


export default router
