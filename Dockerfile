# Use the official Node.js image as the base image
FROM node

# Set the working directory
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install dependencies
RUN npm install

# Set environment variables
ENV PORT=${PORT:-3000}
ENV DB_URL=${DB_URL:-mongodb+srv://nikhildb:Nikhil%4021@cluster1.kpemw.mongodb.net/tech_decodeup}

# Expose the port
EXPOSE ${PORT:-3000}

# Command to run the application
CMD ["npm", "run", "dev"]