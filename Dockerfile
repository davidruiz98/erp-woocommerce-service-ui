# Etapa 1: Build de Angular
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build de Angular en modo producción
RUN npm run build


# Etapa 2: Servir con NGINX
FROM nginx:1.25-alpine

# Copiar app build Angular
COPY --from=build /app/dist/erp-woocommerce-service-ui /usr/share/nginx/html

# Copiar configuración personalizada de nginx si la tienes
# COPY nginx.conf /etc/nginx/nginx.conf

# Copiar env.js plantilla para reemplazar en tiempo de arranque
COPY env.template.js /usr/share/nginx/html/assets/env.js

# Script de reemplazo para inyectar BACKEND_URL
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
