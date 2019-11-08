# Herramienta de construcción - package.json

La herramienta de construcción de **npm** es package.json. Este archivo de configuración nos ayuda a tener, entre otras cosas, un registro de las dependencias que usa nuestro proyecto y poder ejecutar una serie de comandos definidos bajo la key **scripts** que pueden ser usados para, por ejemplo, testear la aplicación.

## Archivo de configuración

```
{
  "name": "MeteoApp",
  "version": "1.0.0",
  "description": "Microservicio que ofrece datos meteorológicos por horas y días en las distintas regiones.",
  "main": "src/app.js",
  "scripts": {
    "start": "pm2 start src/app.js --name meteoapp",
    "restart": "pm2 restart meteoapp",
    "reload": "pm2 reload meteoapp",
    "test": "mocha -R spec",
    "stop": "pm2 stop meteoapp",
    "dev": "NODE_ENV=test nodemon --exec npm start"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/JoseAntonioMHerrera/MeteoCheck.git"
  },
  "keywords": [],
  "author": "Jose Antonio Muñoz Herrera",
  "license": "GPL-3.0",
  "bugs": {
    "url": "https://github.com/JoseAntonioMHerrera/MeteoCheck/issues"
  },
  "homepage": "https://github.com/JoseAntonioMHerrera/MeteoCheck#readme",
  "dependencies": {
    "@hapi/hapi": "^18.4.0",
    "@hapi/inert": "^5.2.2",
    "@hapi/joi": "^15.1.1",
    "@hapi/vision": "^5.5.4",
    "hapi-swagger": "^10.2.0",
    "mongoose": "^5.7.7"
  },
  "devDependencies": {
    "chai": "^4.2.0",
    "grunt": "^1.0.4",
    "grunt-cli": "^1.3.2",
    "grunt-shell-spawn": "^0.4.0",
    "mocha": "^6.2.2",
    "nodemon": "^1.19.4",
    "pm2": "^4.1.2"
  }
}
```

**npm test**: Este comando nos ejecutará los tests del proyecto. Se ha seleccionado la libreria de **mocha** basada en javascript por su facilidad de uso, alta compatibilidad con diferentes entornos (Node, Vue, React, etc..) y porque se encarga de encontrar automaticamente los archivos de test bajo la raiz de tu proyecto y ejecutarlos. Se ha añadido la linea **"test": "mocha"** a **scripts** para ejecutar los tests usando **npm test**. Como esta libreria solo tiene sentido a la hora de testear la API, sin valor final a la hora de desplegar la aplicación, se ha añadido a las **"devDepencies"** para evitar la descarga de dichos módulos con **npm install**.

**npm start**: Este comando nos permitirá lanzar la API REST. Para ello Se ha añadido la linea **"start": "pm2 start src/app.js --name meteoapp"** a **scripts**. El archivo de javascript **src/app.js** es el entry-point de nuestro proyecto. **pm2** es el comando que usaremos para gestionar el proceso del servidor. Con *start* le indicamos que arranque el proceso y le asignamos un nombre con *--name* para posteriores gestiones.

**npm stop**: Este comando permite parar el proceso de node iniciado con **npm start**. Al proceso de la aplicación se le ha asignado un nombre con la linea **--name meteoapp** que se encuentra en el comando **npm start**. De esta manera,  con **pm2 stop meteoapp** paramos la aplicación. 

**npm run dev**: Este comando nos permite lanzar el script **dev**, el cual define la variable NODE_ENV con valor test y ejecuta **nodemon**, un programa que permite la recarga automática del servidor cuando detecta cambios en los ficheros. El comando que ejecuta nodemon es **npm start**. La variable de entorno la usamos para usar una base de datos específica para tests.

**npm restart**: Este comando nos permite reiniciar el servicio mediante **pm2 restart meteoapp**

**npm run reload**: Este comando nos permite recargar el servicio sin necesidad de eliminarlo completamente, a diferencia de restart.

## Dependencias

Las dependencias usadas son las necesarias para usar el framework de Hapi.js (**@hapi/hapi**), hacer uso de swagger con hapi, cargando los módulos necesarios para servir contenido estático y templating (**@hapi/vision**,**@hapi/inert**,**hapi-swagger**), el uso de Joi para crear esquemas de JSON y poder validar el payload que recibe el servidor (**@hapi/joi**) y **mongoose**, la librería para MongoDB de javascript.

## Dependencias Dev

Aqui tenemos las dependencias necesarias para el testing de la API: **mocha** y **chai**, la primera el framework de testing que usaremos para testear la aplicación, la segunda para hacer uso de su libreria de assert, con la cual comprobaremos los objetos devueltos por los métodos a testear.

Por otra parte, **nodemon** lo usaremos para que el servidor se recargue automaticamente con los cambios efectuados en los archivos.
