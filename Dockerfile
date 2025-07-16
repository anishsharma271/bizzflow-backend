# Start from the official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files separately
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Install dev tools like ts-node-dev
RUN npm install -g ts-node-dev

# Expose port
EXPOSE 8080

# Use ts-node-dev for hot reloading
CMD ["ts-node-dev", "--respawn", "--transpile-only", "src/main.ts"]
