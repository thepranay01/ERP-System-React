FROM node:alpine
WORKDIR /root/
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "npm", "run", "dev"]
