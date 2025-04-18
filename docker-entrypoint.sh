#!/bin/sh

# Reemplazar variables en Nginx
envsubst '\$PORT' < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf

# Reemplazar variables en Angular (ej: API_URL)
envsubst '\$API_URL' < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js

# Ejecutar Nginx
exec "$@"