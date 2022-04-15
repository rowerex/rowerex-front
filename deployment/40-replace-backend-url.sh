#!/bin/sh
#
# It replaces placeholder {{{BACKEND_URL}}} with value of environment variable during container init
# so we can use same container for multiple environments / domain names
#
# https://backreference.org/2010/02/20/using-different-delimiters-in-sed/index.html
# > It's a not-so-known fact that sed can use any character as separator for the "s" command
# I'm using spaces because slashes didn't work with http address xD

find /usr/share/nginx/html -type f -exec sed -i 's {{{BACKEND_URL}}} '${BACKEND_URL}' g' {} +
