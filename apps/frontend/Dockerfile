# Use Node.js 18 Alpine as base image
FROM node:18-alpine AS base

WORKDIR /app/frontend

COPY package*.json pnpm-lock.yaml* ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile && pnpm store prune

# Development stage
FROM base AS development

COPY . .

EXPOSE 5173

CMD ["pnpm", "run", "dev"]

# Build stage
FROM base AS build

COPY . .
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN pnpm run build
RUN pnpm run build

# Production stage
FROM nginx:alpine AS production

#  Ruta corregida
COPY --from=build /app/frontend/dist /usr/share/nginx/html

#  Copiar como template
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Sustituir solo $PORT y arrancar nginx
CMD ["/bin/sh", "-c", "envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]