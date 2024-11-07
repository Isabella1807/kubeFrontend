import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import ForgotPassword from '../views/ForgotPassword.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  }
];

const router = createRouter({
  history: createWebHistory(), // Do not use process.env.BASE_URL
  routes
});

export default router;

