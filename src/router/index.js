import { createRouter, createWebHistory } from 'vue-router'
import App from "@/App.vue";
import CategoriesPage from "@/views/admin/categories/CategoriesPage.vue";
import AdminPage from "@/views/admin/AdminPage.vue";
import UserProducts from "@/views/user/UserProducts.vue";
import UserPage from "@/views/user/UserPage.vue";
import UserProfile from "@/views/user/UserProfile.vue";
import UserCart from "@/views/user/UserCart.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import ForbiddenPage from "@/views/ForbiddenPage.vue";
import AdminProductsPage from "@/views/admin/products/AdminProductsPage.vue";
import LoginPage from "@/views/auth/LoginPage.vue";
import UserProduct from "@/views/user/UserProduct.vue";
import RegisterPage from "@/views/auth/RegisterPage.vue";
import OrdersPage from "@/views/admin/orders/OrdersPage.vue";

const routes = [
  {
    path: '/',
    name: 'app',
    redirect: '/user',
    component: App
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
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
        path: 'user-product/:id',
        name: 'user-product/:id',
        component: UserProduct
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
        component: AdminProductsPage,
        meta:{
          admin: true,
          moderator: true
        }
      },
      {
        path: 'categories',
        name: 'categories',
        component: CategoriesPage,
        meta:{
          admin: true,
          moderator: true
        }
      },
      {
        path: 'orders',
        name: 'orders',
        component: OrdersPage,
        meta:{
          admin: true,
          moderator: true
        }
      },
    ]
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: NotFoundPage
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: ForbiddenPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const pagesWithoutAuthorization = ['app', 'login', 'register', 'user-products', 'user-product:id', 'profile', 'cart', 'forbidden', 'not-found']

router.beforeEach(async (to) => {
  if (pagesWithoutAuthorization.includes(to.name)) {
    return true
  }
  if (to.meta[localStorage.getItem('role')]) {
    return true
  }
  if (to.href.includes('user-product')) {
    return true
  }
  return (!to.name) ? {name: 'not-found'} : {name: 'forbidden'}
})

export default router