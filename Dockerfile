# Dockerfile
# Etapa 1: construir la aplicación
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# VITE_API_URL se "hornea" dentro del bundle en build-time (Vite la reemplaza
# como texto plano al compilar) — no se puede cambiar luego como env var de
# runtime normal. Debe apuntar a localhost (donde corre el navegador del
# usuario), NUNCA al nombre del servicio "backend" de Docker Compose.
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Etapa 2: servir los archivos estáticos
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]