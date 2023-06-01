<template>
  <div>
    <h1 class="title">Página Inicial</h1>
    <RouterLink to="/product-form">
      <button>Acessar Product Form</button>
    </RouterLink>
    <RouterLink to="/product-list">
      <button>Acessar Product List</button>
    </RouterLink>
    <RouterLink to="/product-store">
      <button>Acessar Product Store</button>
    </RouterLink>
    <RouterLink to="/cadastro">
      <button>Acessar Cadastro de Usuario</button>
    </RouterLink>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink,
  },
};
</script>

<style>
/* Estilos para a página inicial */
</style>
