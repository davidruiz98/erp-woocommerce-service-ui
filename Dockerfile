# Etapa 1: Build de Angular
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir con NGINX
FROM nginx:1.25-alpine

# Instalar gettext para usar envsubst
RUN apk add --no-cache gettext

# Copiar build de Angular (ajusta el nombre del folder si es necesario)
COPY --from=build /app/dist/erp-woocommerce-service-ui /usr/share/nginx/html

# Copiar configuración y script de entrada
COPY nginx.template.conf /etc/nginx/nginx.template.conf
COPY src/assets/env.template.js /usr/share/nginx/html/assets/env.template.js
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Dar permisos a los archivos del sitio
RUN chmod -R 755 /usr/share/nginx/html

# Entry point y comando para iniciar
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
