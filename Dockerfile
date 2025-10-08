# ===== Dockerfile =====
# Imagem base com Node.js LTS
FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install --production

# Copia todo o restante da aplicação
COPY . .

# Expõe a porta utilizada pelo Express
EXPOSE 3000

# Comando padrão para rodar o app
CMD ["node", "app.js"]
