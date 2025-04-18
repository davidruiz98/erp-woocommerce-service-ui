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

# Copiar build de Angular
COPY --from=build /app/dist/erp-woocommerce-service-ui /usr/share/nginx/html

# Copiar configuración de NGINX que usa el puerto dinámico de Heroku
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar archivo de variables de entorno
COPY env.template.js /usr/share/nginx/html/assets/env.template.js

# Copiar script de entrada para reemplazo dinámico de variables
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Ejecutar NGINX usando el script para reemplazar variables
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
