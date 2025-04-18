#!/bin/sh

# Reemplazar el valor de la variable de entorno BACKEND_URL en el archivo env.js
# con el valor que venga desde el entorno de Heroku o el valor predeterminado

echo "Reemplazando variables de entorno en el archivo env.js..."

# Usamos `envsubst` para reemplazar las variables de entorno en el archivo
envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js

# Ejecutar NGINX en primer plano
exec "$@"
