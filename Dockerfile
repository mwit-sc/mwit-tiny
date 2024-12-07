# Use the official Node.js 18 image as the base
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Install dependencies only when needed
COPY package.json package-lock.json ./ 
RUN npm ci --include=dev

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Prune unnecessary files to create a standalone app
RUN npm prune --production && \
    rm -rf .next/cache node_modules/.cache

# Use nginx-alpine for better performance in production
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy built app artifacts from the build stage
COPY --from=builder /app/ ./

# Ensure the app runs standalone
ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

CMD ["npm", "start"]
