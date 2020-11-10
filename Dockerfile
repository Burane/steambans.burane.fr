FROM node:12 AS ui-build
WORKDIR /usr/src/app
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

FROM node:12 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/frontend/build ./frontend/build
COPY backend/package*.json ./backend/
RUN cd backend && npm install && npm run build

EXPOSE 3008

CMD ["node", "./backend/dist/main"]