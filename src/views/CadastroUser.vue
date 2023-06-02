<template>
  <div class="product-form">
    <h2>Cadastro de Usuário</h2>
    <form @submit.prevent="salvarUsuario">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          v-model="nome"
          required
          class="input-field"
        /><br />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="input-field"
        /><br />
      </div>

      <div class="form-group">
        <label for="password">Senha:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          class="input-field"
        /><br />
      </div>

      <div class="form-group">
        <label for="cpf">CPF:</label>
        <input
          type="text"
          id="cpf"
          v-model="cpf"
          required
          class="input-field"
        /><br />
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = 'http://172.16.4.63:8080/';

export default {
  data() {
    return {
      // ... Seus dados existentes ...
    };
  },
  methods: {
    salvarUsuario() {
      axios
        .post("users", {
          nome: this.nome,
          email: this.email,
          password: this.password,
          cpf: this.cpf,
        })
        .then((response) => {
          const userId = response.data.id;

          // Criação do carrinho de compras com o ID do usuário
          const carrinho = {
            cliente: { id: userId }, // Use o nome correto da propriedade 'cliente'
            itens: [],
          };

          axios
            .post("carrinhos", carrinho)
            .then((response) => {
              console.log("Carrinho de compras criado:", response.data);

              // Navegar para a página ProductStore.vue
              this.$router.push({ path: "product-store", query: { carrinhoId: response.data.id } });
            })
            .catch((error) => {
              console.error("Erro ao criar o carrinho de compras:", error);
            });
        })
        .catch((error) => {
          console.error("Erro ao cadastrar usuário:", error);
        });
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

.input-field {
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
