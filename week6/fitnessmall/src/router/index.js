import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';.
import App from '../App.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App,
    children: [
      {
        path: '/',
        component: () => import('../views/Home.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/Products.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/Product.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/Cart.vue'),
      },
      {
        path: 'checkform',
        component: () => import('../views/CheckForm.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/backend/layout/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/backend/Coupons.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/backend/Orders.vue'),
      },
      {
        path: 'storages',
        component: () => import('../views/backend/Storages.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views//backend/Login.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
