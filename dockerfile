# Usar uma imagem básica do Nginx
FROM nginx:alpine

# Copiar os arquivos do seu projeto para dentro da imagem
COPY . /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80