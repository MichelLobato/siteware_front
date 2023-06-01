<template>
  <form class="product-form" @submit.prevent="submitForm">
    <div class="form-group">
      <label for="nome">Nome:</label>
      <input type="text" id="nome" v-model="product.nome" :readonly="isEdit" />
    </div>
    <div class="form-group">
      <label for="preco">Preço:</label>
      <input type="number" id="preco" v-model="product.preco" required />
    </div>
    <div class="form-group">
      <label for="promocao">Promoção:</label>
      <select id="promocao" v-model="product.promocao">
        <option value="NENHUMA_PROMOCAO">SEM PROMOÇÃO</option>
        <option value="LEVE_2_PAGUE_1">LEVE 2 PAGUE 1</option>
        <option value="TRES_POR_DEZ">3 POR 10</option>
      </select>
    </div>
    <button type="submit">{{ isEdit ? "Atualizar" : "Adicionar" }}</button>
    <div v-if="error" class="error-message">
      Ocorreu um erro produto ja {{ isEdit ? "atualizar" : "adicionado" }} na nossa Base. Por
      favor, tente novamente.
    </div>  
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: {
        nome: "",
        preco: 0,
        promocao: "NENHUMA_PROMOCAO",
        ativo: true,
      },
      error: null,
    };
  },
  computed: {
    isEdit() {
      return !!this.$route.params.productId;
    },
  },
  mounted() {
    if (this.isEdit) {
      const productId = this.$route.params.productId;
      axios
        .get(`http://localhost:8080/produtos/${productId}`)
        .then((response) => {
          this.product = response.data;
        })
        .catch((error) => {
          console.error("Erro ao obter os dados do produto:", error);
        });
    }
  },
  methods: {
    submitForm() {
      if (this.isEdit) {
        this.updateProduct();
      } else {
        this.addProduct();
      }
    },

    updateProduct() {
      const productId = this.$route.params.productId;
      const url = `http://localhost:8080/produtos/${productId}`;

      axios
        .put(url, this.product)
        .then((response) => {
          console.log("Produto atualizado com sucesso:", response.data);
          this.$router.push("/product-list");
        })
        .catch((error) => {
          console.error("Erro ao atualizar o produto:", error);
        });
    },

    addProduct() {
      axios
        .post("http://localhost:8080/produtos", this.product)
        .then((response) => {
          console.log("Produto adicionado com sucesso:", response.data);
          this.$router.push("/product-list");
        })
        .catch((error) => {
          console.error("Erro ao adicionar o produto:", error);
          this.error =
            "Produto ja cadastrado na base de dados. Por favor adicionar outro produto!";
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
