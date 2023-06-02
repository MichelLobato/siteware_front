import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ProductForm from '../views/ProductForm.vue';
import ProductList from '../views/ProductList.vue';
import ProductStore from '../views/ProductStore.vue';
import CadastroUser from '../views/CadastroUser.vue';
import FechamentoCompra from '../views/FechamentoCompra.vue';


const routes = [
  { path: '/', component: HomePage },
  { path: '/product-form/:productId?', component: ProductForm },
  { path: '/product-list', component: ProductList },
  { path: '/product-store', component: ProductStore },
  { path: '/cadastro', component: CadastroUser },
  { path: '/fechamento-compra/:carrinhoId', name: 'FechamentoCompra', component: FechamentoCompra },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
