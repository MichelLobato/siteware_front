import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ProductForm from '../views/ProductForm.vue';
import ProductList from '../views/ProductList.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/product-form/:productId?', component: ProductForm },
  { path: '/product-list', component: ProductList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;