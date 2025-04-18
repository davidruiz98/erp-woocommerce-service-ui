FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm ci --force
COPY . .
RUN npm run build

FROM nginx:1.25-alpine

# Eliminar configuraciones por defecto
RUN rm -rf /etc/nginx/conf.d/*

# Copiar template de configuración (¡nombre crítico!)
COPY ./server/conf.d/default.conf /etc/nginx/templates/default.conf.template

# Copiar build de Angular
COPY --from=build /app/dist/erp-woocommerce-service-ui /usr/share/nginx/html

# Permisos esenciales
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx

# Usar el puerto expuesto por Heroku
EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]