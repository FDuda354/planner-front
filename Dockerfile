FROM node:16.17.1 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm install @angular/flex-layout
RUN npm install @angular/cdk
RUN npm install @angular/material
RUN npm install @angular/material-moment-adapter
RUN npm install moment
RUN npm config set legacy-peer-deps true
RUN npm run build --prod
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/shopfront /usr/share/nginx/html
