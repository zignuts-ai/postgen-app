FROM node:22.10.0-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . ./
EXPOSE 3000
ENV HOST=0.0.0.0
ENV PORT=3000
RUN npm run build
CMD [ "npm", "run", "start" ]

