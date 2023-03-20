# Base image
FROM node:14-alpine as build

# Set the working directory
WORKDIR /app

# Copy the package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight image for production
FROM nginx:stable-alpine

# Copy the build files to the nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for external access
EXPOSE 80

# Start nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
