#!/bin/sh

sed -i "s|\https://erp-woocommerce-service-9c9c0025c7e9.herokuapp.com|${BACKEND_URL}|g" /usr/share/nginx/html/assets/env.js

exec "$@"
