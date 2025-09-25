# Multi-stage build: build React app, then serve with NGINX

# ---- Build stage ----
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy source
COPY . .

# Pass API key at build time (CRA inlines env vars)
ARG REACT_APP_API_KEY
ENV REACT_APP_API_KEY=${REACT_APP_API_KEY}

# Build production bundle
RUN npm run build

# ---- Run stage ----
FROM nginx:alpine AS run

# Copy custom nginx config for SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

