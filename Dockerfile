#FROM node:16.17.1 as node
#WORKDIR /app
#COPY . .
#RUN npm install --legacy-peer-deps
#RUN npm run build --prod --max-old-space-size=512
## Stage 2
#FROM nginx:alpine
#COPY --from=node /app/dist/shopfront /usr/share/nginx/html
# Stage 1
FROM node:16.17.1 as node
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build --prod --max-old-space-size=512

# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/shopfront /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
