<template>
  <div>
    <h1 class="title">Adicionar Produto</h1>
    <ProductForm />
  </div>
</template>

<script>
import ProductForm from './components/ProductForm.vue';

export default {
  components: {
    ProductForm,
  },
};
</script>

<style>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}
</style>