FROM node:14.16-alpine

WORKDIR /app/gateway

ENV PATH /app/gateway/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install --silent

EXPOSE 4000

CMD [ -d "node_modules" ] && npm run start || npm ci && npm run start