<template>
    <div>
      <h1>Produtos Ativos</h1>
  
      <div class="produtos-container">
        <div
          v-for="produto in produtos"
          :key="produto.id"
          class="produto-item"
        >
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
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        produtos: [],
      };
    },
    mounted() {
      fetch('http://localhost:8080/produtos/ativos')
        .then((response) => response.json())
        .then((produtos) => {
          this.produtos = produtos.map((produto) => ({
            ...produto,
            quantidade: 1,
          }));
        })
        .catch((error) => {
          console.log('Erro ao obter os produtos:', error);
        });
    },
    methods: {
      adicionarAoCarrinho(produto) {
        // Aqui você pode implementar a lógica para adicionar o produto ao carrinho de compras
        console.log('Produto adicionado ao carrinho:', produto);
      },
    },
  };
  </script>
  
  <style>
  .produtos-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .produto-item {
    width: 20%;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .produto-imagem {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  
  .produto-info {
    margin-top: 10px;
    text-align: center;
  }
  
  .produto-nome {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .produto-preco {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .produto-promocao {
    margin-bottom: 5px;
  }
  
  .produto-quantidade {
    margin-bottom: 10px;
  }
  
  button {
    background-color: #f0c14b;
    border: none;
    padding: 10px 20px;
    color: #111;
    font-weight: bold;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #e8b937;
  }
  </style>
  