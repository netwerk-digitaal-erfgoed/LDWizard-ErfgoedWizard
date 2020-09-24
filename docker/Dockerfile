FROM node:lts-alpine as build
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn run build

FROM nginx:stable-alpine
COPY --from=build /app/lib /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
