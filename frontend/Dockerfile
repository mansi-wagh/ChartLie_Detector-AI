# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm ci

# Copy code and build application
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built React files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx routing configurations
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
