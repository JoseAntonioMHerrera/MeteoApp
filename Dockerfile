FROM node:12
WORKDIR ./MeteoApp
COPY package*.json ./

ENV NODE_ENV=production
ENV PORT=8000
RUN npm install

COPY app.js .
COPY /src/ ./src/
COPY /models/ ./models/
COPY /test/ ./test/
COPY gulpfile.js .

EXPOSE 8000

CMD ["npm","start"]
