import { RouterLink } from 'vue-router';

<template>
  <div>
    <h1 class="title">Página Inicial</h1>
    <RouterLink to="/product-form">
      <button>Acessar Product Form</button>
    </RouterLink>
    <RouterLink to="/product-list">
      <button>Acessar Product List</button>
    </RouterLink>
  </div>
</template>
  
export default {
  // Componente da página inicial
  components: {
    RouterLink,
  },
};
  
  <style>
  /* Estilos para a página inicial */
  </style>