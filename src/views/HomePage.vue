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
  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  .button-container button {
    margin-bottom: 10px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #f0c14b;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .button-container button:hover {
    background-color: #e3b243;
  }

  .button-container button:last-child {
    margin-bottom: 0;
  }
</style>

