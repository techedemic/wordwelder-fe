# Stage 1: Build the React application
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
# Install env-cmd globally
RUN npm install -g env-cmd
COPY . .
RUN npm run build

# Stage 2: Serve the React application
FROM nginx:1.21-alpine

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
