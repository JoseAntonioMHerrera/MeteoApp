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
    "start": "node app.js",
    "test": "jest"
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
    "@hapi/joi": "^16.1.7"
  },
  "devDependencies":{
    "jest": "^24.9.0"
  }

}
```

**npm test**: Este comando nos ejecutará los tests del proyecto. Se ha seleccionado la libreria de **jest** basada en javascript por su facilidad de uso, alta compatibilidad con diferentes entornos (Node, Vue, React, etc..) y porque se encarga de encontrar automaticamente los archivos de test bajo la raiz de tu proyecto y ejecutarlos. Se ha añadido la linea **"test": "jest"** a **scripts** para ejecutar los tests usando **npm test**. Como esta libreria solo tiene sentido a la hora de testear la API, sin valor final a la hora de desplegar la aplicación, se ha añadido a las **"devDepencies"** para evitar la descarga de dichos módulos con **npm install**.

**npm start**: Este comando nos permitirá lanzar la API REST. Para ello Se ha añadido la linea **"start": "node app.js"** a **scripts**. El archivo de javascript **app.js** es el entry-point de nuestro proyecto.
