FROM node:20-bullseye

# Install Ghostscript
RUN apt-get update && apt-get install -y ghostscript && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
ENV NODE_ENV=production
ENV GS_BIN=gs

RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
