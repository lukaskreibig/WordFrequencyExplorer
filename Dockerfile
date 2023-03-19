# Stage 1: Install dependencies and compile TypeScript
FROM node:14 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig*.json ./
COPY src ./src
RUN npx tsc

# Stage 2: Copy compiled JavaScript and necessary files into a clean image
FROM node:14

WORKDIR /app

# Copy runtime dependencies from builder stage
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

# Copy compiled JavaScript from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 8080
CMD [ "node", "dist/index.js" ]