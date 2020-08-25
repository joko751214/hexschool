import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/frontend/layout/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        component: () => import('../views/frontend/Homepage.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/frontend/Products.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/frontend/Product.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/frontend/Cart.vue'),
      },
      {
        path: 'order',
        component: () => import('../views/frontend/Order.vue'),
      },
      {
        path: 'checkform/:orderId',
        component: () => import('../views/frontend/CheckForm.vue'),
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
