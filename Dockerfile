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
ENV NODE_ENV production
RUN npm run build

FROM nginx:stable-alpine as prod
WORKDIR /usr/share/nginx/html
ARG REACT_APP_BACKENDURL=http://app.velog.cc/api

COPY --from=build /app/build /usr/share/nginx/html
COPY deployment/rowerex.conf /etc/nginx/conf.d/rowerex.conf
# TODO: nginx config with sane static file caching etc

CMD ["nginx", "-g", "daemon off;"]
