#!/bin/sh

echo "Reemplazando \$PORT en nginx.template.conf"
envsubst '$PORT' < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf

echo "Reemplazando \$API_URL en env.template.js"
envsubst '$API_URL' < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js

echo "Iniciando Nginx en el puerto $PORT"
exec "$@"