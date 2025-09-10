FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile \
    && npm install pm2 -g


COPY . .

RUN npm run build

EXPOSE 3000

CMD ["pm2-runtime", "dist/src/main.js"]
