<template>
  <div class="fechamento-compra-container" v-if="carrinho.total !== undefined">
    <h1>Informações de Fechamento da Compra</h1>

    <table class="fechamento-compra-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Preço Promoção</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(produto, index) in carrinho.produtos" :key="index">
          <td>{{ produto.produto.nome }}</td>
          <td>R$ {{ produto.produto.preco.toFixed(2) }}</td>
          <td>{{ produto.quantidade }}</td>
          <td>
            <template v-if="produto.produto.promocao === 'TRES_POR_DEZ'">
              3 por 10 reais
            </template>
            <template v-else-if="produto.produto.promocao === 'LEVE_2_PAGUE_1'">
              Leve 2 e Pague 1
            </template>
            <template v-else>
              -
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <p class="fechamento-compra-total">Total: R$ {{ carrinho.total.toFixed(2) }}</p>
  </div>
  <div v-else>
    <!-- Opções de tratamento quando carrinho.total ainda está undefined -->
    <p>Carregando...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      carrinhoId: null,
      carrinho: {},
    };
  },
  mounted() {
    const carrinhoId = this.$route.params.carrinhoId;
    this.carrinhoId = carrinhoId;

    axios.get(`http://localhost:8080/carrinhos/${carrinhoId}`)
      .then(response => {
        this.carrinho = response.data;
      })
      .catch(error => {
        console.error("Error fetching carrinho data:", error);
      });
  },
};
</script>

<style>
.fechamento-compra-container {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 4px;
}

.fechamento-compra-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.fechamento-compra-table th,
.fechamento-compra-table td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: center;
}

.fechamento-compra-table th {
  background-color: #f0f0f0;
}

.fechamento-compra-total {
  text-align: right;
  font-size: 18px;
  font-weight: bold;
}

</style>
