# Etapa 1: Build de Angular
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir con NGINX
FROM nginx:1.25-alpine

# Instalar gettext para tener envsubst
RUN apk add --no-cache gettext

# Copiar build de Angular
COPY --from=build /app/dist/erp-woocommerce-service-ui /usr/share/nginx/html

# Copiar PLANTILLA de configuración de NGINX (no el archivo final)
COPY nginx.template.conf /etc/nginx/nginx.template.conf

# Copiar script de entrada
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Ejecutar script para reemplazar variables y luego Nginx
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]