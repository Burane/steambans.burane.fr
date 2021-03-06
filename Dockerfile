FROM node:12

COPY . /usr/app

WORKDIR /usr/app/frontend
RUN npm install
RUN npm run build

WORKDIR /usr/app/backend
RUN npm install
RUN npm run build

CMD ["npm","run", "start:prod"]