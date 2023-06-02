<template>
  <div>
    <h1>Checkout</h1>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantidade</th>
          <th>Preço Promoção</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in itensSelecionados" :key="item.id">
          <td>{{ item.nome }}</td>
          <td>{{ item.quantidade }}</td>
          <td>{{ item.promocao }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <strong>Total: R$ {{ calcularTotal() }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  // Outras configurações do componente...

  computed: {
    itensSelecionados() {
      return this.$route.params.itensSelecionados;
    }
  },

  methods: {
    calcularTotal() {
      let total = 0;
      this.itensSelecionados.forEach((item) => {
        total += item.preco;
      });
      return total.toFixed(2);
    }
  }
}
</script>
