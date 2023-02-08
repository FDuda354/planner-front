FROM node:16.17.1 as node
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build --prod --max-old-space-size=512
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/shopfront /usr/share/nginx/html
