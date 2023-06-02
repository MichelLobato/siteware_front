<template>
  <div>
    <h1 class="title">Lista de Produtos</h1>
    <table class="product-table">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Preço</th>
          <th>Promoção</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.nome }}</td>
          <td>{{ product.preco }}</td>
          <td>{{ product.promocao }}</td>
          <td>
            <button class="product-button" @click="updateProduct(product)">Editar</button>
            <button class="product-button" @click="removeProduct(product)">Remover</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>

export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    fetch('http://172.16.4.63:8080/produtos/ativos')
      .then(response => response.json())
      .then(data => {
        this.products = data;
      })
      .catch(error => {
        console.error('Erro ao obter os dados do produto:', error);
      });
  },
  methods: {
    updateProduct(product) {
      this.$router.push(`/product-form/${product.id}`);
    },
    removeProduct(product) {
      const url = `http://172.16.4.63:8080/produtos/${product.id}`;

      fetch(url, {
        method: 'DELETE'
      })
        .then(() => {
          location.reload();
        })
        .catch(error => {
          console.log('Ocorreu um erro na requisição:', error);
        });
    },
  },
};
</script>


<style>
.product-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.product-table th,
.product-table td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: center;
}

.product-table th:first-child,
.product-table td:first-child {
  text-align: left;
}

.product-actions {
  display: flex;
  justify-content: flex-end;
}

.product-button {
  padding: 8px 16px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #f0c14b;
  cursor: pointer;
}

.remove-button {
  background-color: #ff6565;
}
</style>