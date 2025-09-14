# Etapa 1: Usar uma imagem base do Node.js
FROM node:20-alpine AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto
COPY . .

# Instalar dependências
RUN npm install

# Etapa 2: Servir o conteúdo estático
FROM node:20-alpine

# Instalar o servidor HTTP
RUN npm install -g serve

# Copiar os arquivos compilados da etapa anterior
COPY --from=build /app /app

# Definir o diretório de trabalho
WORKDIR /app

# Expor a porta 5000
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["serve", "-s", ".", "-l", "5000"]
