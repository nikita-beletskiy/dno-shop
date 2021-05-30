FROM node:14-alpine as build

WORKDIR /app

COPY package.json .
RUN npm install --only-prod
COPY . .

RUN npm run build

FROM node:14-alpine

WORKDIR /app

COPY --from=build /app/build ./src
COPY --from=build /app/node_modules ./node_modules

CMD [ "node", "src/index.js" ]