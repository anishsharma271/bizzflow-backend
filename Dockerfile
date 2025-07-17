# Use the Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install
COPY package*.json ./
RUN npm install

# Copy entire app (after node_modules for cache optimization)
COPY . .

# Optional: for file change detection
ENV CHOKIDAR_USEPOLLING=true

# Expose backend port
EXPOSE 8080

# Run in watch mode
CMD ["npm", "run", "start:docker"]
