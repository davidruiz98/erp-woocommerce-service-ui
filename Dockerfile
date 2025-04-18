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
# Copiar build de Angular (verifica la ruta!)
COPY --from=build /app/dist/erp-woocommerce-service-ui /usr/share/nginx/html

# Copiar plantilla de Nginx
COPY nginx.template.conf /etc/nginx/nginx.template.conf

# Copiar template de variables de Angular y script
COPY src/assets/env.template.js /usr/share/nginx/html/assets/env.template.js
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Permisos para la carpeta de Nginx
RUN chmod -R 755 /usr/share/nginx/html

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]