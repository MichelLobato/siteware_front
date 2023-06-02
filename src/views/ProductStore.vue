<template>
  <div>
    <h1>Produtos Ativos</h1>

    <div class="produtos-container">
      <div v-for="produto in produtos" :key="produto.id" class="produto-item">
        <img :src="produto.imagem" :alt="produto.nome" class="produto-imagem" />
        <div class="produto-info">
          <div class="produto-nome">{{ produto.nome }}</div>
          <div class="produto-preco">R$ {{ produto.preco.toFixed(2) }}</div>
          <div class="produto-promocao">{{ produto.promocao }}</div>
          <div class="produto-quantidade">
            <input type="number" v-model="produto.quantidade" min="1" max="100" />
          </div>
          <button @click="adicionarAoCarrinho(produto)">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
      <div class="itens-selecionados">
        <h2>Carrinho</h2>
        <ul>
          <li v-for="item in itensSelecionados" :key="item.id">
            {{ item.nome }} - R$ {{ item.preco.toFixed(2) }} - Quantidade:
            {{ item.quantidade }}
            <button @click="removerItem(item)">X</button>
          </li>
        </ul>
        <div v-if="fecharCompraVisivel">
          <button @click="fecharCompra" class="fechar-compra-button">
            Fechar Compra
          </button>
          <div class="valor-total">
            <strong>Valor Total do Carrinho: R$
              {{ carrinho.valorTotal.toFixed(2) }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  data() {
    return {
      carrinho: { valorTotal: 0 },
      produtos: [],
      itensSelecionados: [],
      fecharCompraVisivel: false,
    };
  },
  mounted() {
    const carrinhoId = this.$route.query.carrinhoId;
    if (carrinhoId) {
      // Faça uma requisição GET para buscar o carrinho pelo ID
      axios
        .get(`http://localhost:8080/carrinhos/${carrinhoId}`)
        .then((response) => {
          const carrinho = response.data;
          // Use o carrinho carregado como necessário na página
          console.log("Carrinho carregado:", carrinho);
        })
        .catch((error) => {
          console.error("Erro ao carregar o carrinho:", error);
        });
    }
    fetch("http://localhost:8080/produtos/ativos")
      .then((response) => response.json())
      .then((produtos) => {
        this.produtos = produtos.map((produto) => ({
          ...produto,
          quantidade: 1,
        }));
      })
      .catch((error) => {
        console.log("Erro ao obter os produtos:", error);
      });
  },
  methods: {
    adicionarAoCarrinho(produto) {
      const carrinhoId = this.$route.query.carrinhoId;
      console.log("carrinhoId:", carrinhoId);
      console.log("Produto adicionado ao carrinho:", produto);

      // Verificar se o produto já existe na lista
      const produtoExistente = this.itensSelecionados.find(
        (item) => item.id === produto.id
      );
      if (!produtoExistente) {
        this.itensSelecionados.push(produto);
      }

      this.fecharCompraVisivel = true;

      // Chamar o método para enviar a requisição HTTP
      this.enviarRequisicao(carrinhoId, produto);
    },

    removerItem(item) {
      const index = this.itensSelecionados.indexOf(item);
      if (index !== -1) {
        this.itensSelecionados.splice(index, 1);
      }
      item.quantidade = 0;

      const carrinhoId = this.$route.query.carrinhoId;
      const produtoCarrinho = item;

      this.enviarRequisicao(carrinhoId, produtoCarrinho);
    },

    enviarRequisicao(carrinhoId, produto) {
      const requestBody = {
        quantidade: produto.quantidade,
        preco: null,
        produto: {
          id: produto.id,
          nome: "null",
          preco: null,
          promocao: null,
          ativo: null,
        },
        subTotal: null,
      };

      axios
        .post(
          `http://localhost:8080/produtoscarrinhos/${carrinhoId}`,
          requestBody
        )
        .then(() => {
          console.log("Requisição bem-sucedida");

          // Após adicionar o produto, chame o método para atualizar o valor final do carrinho
          this.atualizarValorFinalCarrinho(carrinhoId);
        })
        .catch((error) => {
          console.error("Erro ao fazer a requisição:", error);
          // Lógica de tratamento de erro
        });
    },
    atualizarValorFinalCarrinho(carrinhoId) {
      axios
        .get(`http://localhost:8080/carrinhos/${carrinhoId}`)
        .then((response) => {
          console.log("Carrinho", carrinhoId);
          const carrinho = response.data;
          const valorTotal = carrinho.valorFinal;
          console.log("Valor final do carrinho:", valorTotal);
          this.carrinho = { ...carrinho, valorTotal }; // Atualize o valor total do carrinho
        })
        .catch((error) => {
          console.error("Erro ao obter o valor final do carrinho:", error);
          // Lógica de tratamento de erro
        });
    },
    fecharCompra() {
      // Lógica para fechar a compra
      console.log("Compra fechada!");

      // Redirecionar para a página de fechamento da compra
      const carrinhoId = this.$route.query.carrinhoId;
      this.$router.push({ name: 'FechamentoCompra', params: { carrinhoId } });
    },
  },
};
</script>

<style scoped>
.produtos-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.produto-item {
  width: 200px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #ddd;
  margin: 10px;
  background-color: #fff;
  border-radius: 4px;
}

.produto-imagem {
  width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 10px;
}

.produto-nome {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 16px;
}

.produto-preco {
  font-size: 18px;
  margin-bottom: 10px;
}

.produto-promocao {
  margin-bottom: 10px;
}

.produto-quantidade input {
  width: 50px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #f0c14b;
  border: none;
  padding: 10px 20px;
  color: #111;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #e8b937;
}

.itens-selecionados {
  margin-top: 20px;
  padding: 20px;
  background-color: #f0f2f5;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.itens-selecionados h2 {
  margin-bottom: 10px;
  font-size: 18px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 5px;
  font-size: 14px;
}

.fechar-compra-button {
  background-color: #f0c14b;
  border: none;
  padding: 10px 20px;
  color: #111;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
}

.fechar-compra-button:hover {
  background-color: #e8b937;
}

.valor-total {
  margin-top: 10px;
  text-align: right;
}
</style>