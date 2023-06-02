# Usar uma imagem base do Node.js
FROM node:14 AS builder

# Configurar diretório de trabalho no contêiner
WORKDIR /app

# Copiar os arquivos do frontend para o contêiner
COPY . .

# Instalar as dependências
RUN npm install

# Compilar o projeto
RUN npm run build

# Usar uma imagem base do Nginx para servir o aplicativo
FROM nginx:latest

# Copiar os arquivos do build para o diretório de distribuição do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta 80 para acesso externo
EXPOSE 80

# Iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]