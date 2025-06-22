# Step 1: Use an official Nginx image from the Docker Hub
FROM nginx:alpine

# Step 2: Copy your HTML, CSS, and JS files into the container
COPY ./ /usr/share/nginx/html/

# Step 3: Expose port 80 (default for HTTP)
EXPOSE 80

# Step 4: Nginx runs by default, so no need to specify command
