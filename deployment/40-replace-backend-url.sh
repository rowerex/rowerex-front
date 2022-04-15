#!/bin/sh
find /usr/share/nginx/html -type f -exec sed -i 's/{{{BACKEND_URL}}}/'${BACKEND_URL}'/g' {} +
