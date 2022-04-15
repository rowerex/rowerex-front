FROM node:14-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]

FROM development AS build
ARG REACT_APP_BACKENDURL={{{BACKEND_URL}}}
ENV NODE_ENV production
RUN npm run build

FROM nginx:stable-alpine as prod
WORKDIR /usr/share/nginx/html
ENV BACKEND_URL=http://api.velog.cc/api

COPY --from=build /app/build /usr/share/nginx/html
# TODO: nginx config with sane static file caching etc
COPY deployment/rowerex.conf /etc/nginx/conf.d/rowerex.conf
COPY deployment/40-replace-backend-url.sh /docker-entrypoint.d/40-replace-backend-url.sh

CMD ["nginx", "-g", "daemon off;"]
