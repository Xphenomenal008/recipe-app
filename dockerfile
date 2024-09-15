 
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Upgrade npm to the latest version
RUN npm install -g npm@latest

# Copy package.json and package-lock.json
COPY package*.json ./

# Install both dependencies and devDependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that Vite uses (Vite defaults to 5173)
EXPOSE 5173

# Start the application using Vite
CMD ["npm", "run", "start"]