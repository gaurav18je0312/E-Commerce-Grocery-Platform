FROM node:20-alpine3.18

WORKDIR /frontend

ENV VITE_REACT_APP_BACKEND_URL=http://localhost:8000

COPY . .

RUN npm install vite@4.2.0

CMD ["npm", "run", "dev"]