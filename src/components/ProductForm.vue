<template>
  <form class="product-form" @submit.prevent="submitForm">
    <div class="form-group">
      <label for="nome">Nome:</label>
      <input type="text" id="nome" v-model="product.nome" required>
    </div>
    <div class="form-group">
      <label for="preco">Preço:</label>
      <input type="number" id="preco" v-model="product.preco" required>
    </div>
    <div class="form-group">
      <label for="promocao">Promoção:</label>
      <select id="promocao" v-model="product.promocao">
        <option value="NENHUMA_PROMOCAO">NENHUMA_PROMOCAO</option>
        <option value="LEVE_2_PAGUE_1">LEVE_2_PAGUE_1</option>
        <option value="TRES_POR_DEZ">TRES_POR_DEZ</option>
      </select>
    </div>
    <button type="submit">Adicionar</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: {
        nome: '',
        preco: 0,
        promocao: 'NENHUMA_PROMOCAO',
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const data = {
          nome: this.product.nome,
          preco: this.product.preco,
          promocao: this.product.promocao
        };

        const  response  = await axios.post('http://localhost:8080/produtos', data);
        console.log(response.data); // Exibe a resposta do backend

        // Limpar o formulário
        this.product.nome = '';
        this.product.preco = 0;
        this.product.promocao = 'NENHUMA_PROMOCAO';
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>


<style scoped>
.product-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f8f8f8;
  border: 1px solid #dddddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 14px;
  font-weight: bold;
  color: #555555;
}

input[type="text"],
input[type="number"],
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  background-color: #ffffff;
}

button[type="submit"] {
  background-color: #f0c14b;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

button[type="submit"]:hover {
  background-color: #e1a70a;
}
</style>
