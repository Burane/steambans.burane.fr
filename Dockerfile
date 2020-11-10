# FROM node:12 AS vue-build
# WORKDIR /usr/src/app
# COPY frontend/ ./frontend/
# RUN cd frontend && npm install && npm run build

# FROM node:12 AS next-build
# WORKDIR /root/
# COPY --from=vue-build /usr/src/app/frontend/build ./frontend/build
# COPY backend/package*.json ./backend/
# RUN cd backend && npm install && npm run build

# EXPOSE 3008

# CMD "npm" "run" "start:prod"


FROM node:12 as vue-build

# Create app directory
WORKDIR /usr/src/app/frontend

# Installing dependencies
COPY frontend/package*.json /usr/src/app/frontend
RUN npm install

# Copying source files
COPY frontend/ /usr/src/app/frontend/

# Building app
RUN npm run build


FROM node:12 as next-build

# Create app directory
WORKDIR /usr/src/app/backend

# Installing dependencies
COPY backend/package*.json /usr/src/app/backend
RUN npm install

# Copying source files
COPY backend/ /usr/src/app/backend/

# Building app
RUN npm run build
EXPOSE 3008

# Running the app
CMD "npm" "run" "start:prod"