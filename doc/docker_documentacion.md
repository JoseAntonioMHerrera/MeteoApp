## Dockerfile

```
FROM node:12
WORKDIR ./MeteoApp

COPY package*.json gulpfile.js app.js ./src/ ./test/ ./models/

ENV NODE_ENV=production
ENV PORT=8000
RUN npm install

COPY app.js ./
COPY /src/ ./
COPY /models/ ./
COPY /tests/ ./
COPY gulpfile.js ./

EXPOSE 8000

CMD ["npm","start"]

```

**FROM**: definimos la imagen que queremos usar como base para nuestro Docker, en este caso una con la versión 12 de Node.js.

**WORKDIR**: definimos el contexto desde donde se van a ejecutar las rutas relativas en los siguientes comandos.

**COPY**: realizamos una copia de los archivos que vamos a necesitar para correr nuestro microservicio en Docker. Al principio copiaremos el package json para realizar la instalación de lo necesario y posteriormente copiamos los archivos necesarios para lanzar nuestro microservicio.

**ENV <nombre>**: con esta keyword definimos una variable de entorno en Docker.

**RUN**: Este comando nos permite ejecutar una orden, especificada justo a continuación.

**EXPOSE 8000**: Con este comando exponemos el puerto 8000 de nuestro contenedor docker para que acepte peticiones hechas a dicho puerto.

**CMD ["npm","start"]**: con esta orden especificamos que comando queremos que se ejecute al iniciar nuestra imagen.