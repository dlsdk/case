# Use the official Node image as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the React project files into the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the React application
CMD ["npm", "start"]
