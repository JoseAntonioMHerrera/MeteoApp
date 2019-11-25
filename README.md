[![Build Status](https://travis-ci.org/JoseAntonioMHerrera/MeteoApp.svg?branch=master)](https://travis-ci.org/JoseAntonioMHerrera/MeteoApp)
[![CircleCI](https://circleci.com/gh/JoseAntonioMHerrera/MeteoApp.svg?style=svg)](https://circleci.com/gh/JoseAntonioMHerrera/MeteoApp)
[![Build Status](https://dev.azure.com/jamh1/MeteoApp/_apis/build/status/meteoappv5%20-%20CI?branchName=master)](https://dev.azure.com/jamh1/MeteoApp/_build/latest?definitionId=1&branchName=master)
# MeteoApp

## Descripción general

Este microservicio ofrece el conjunto de operaciones CRUD (Create, Read, Update, Delete) para el manejo de datos metereológicos en las distintas ciudades del país. El objetivo es ofrecer una servicio API RESTful que otorgue el acceso a estos datos de forma pública, así como su edición. Estos datos se proporcionará en formato JSON para un manejo facil de los mismos por parte del usuario. Idealmente, este microservicio formaría parte de una infraestructura mas grande donde los usuarios podrían bien ser otros microservicios que podrían formar parte tanto como origen de los datos como servidores de los mismos.

## Guía de instalación

```
git clone https://github.com/JoseAntonioMHerrera/MeteoApp

cd MeteoApp/

npm install

npm start
```

## Documentación

Documentación general del proyecto:

* [Documentación MeteoApp](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/MeteoApp.md)

Documentación referente a las tecnologías usadas:

* [Documentación CircleCI](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/circle_ci_documentacion.md).
* [Documentación TravisCI](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/travis_ci_documentacion.md).
* [Documentación de API endpoints](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/api_endpoints_documentacion.md).
* [Documentación de modelos y esquemas](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/modelos_esquemas_documentacion.md).
* [Documentación de package.json](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/package_json_documentacion.md).
* [Documentación de Mocha tests](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/mocha_test_documentacion.md).
* [Documentación PaaS](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/paas_documentacion.md)

## Buildtool

```
buildtool: package.json

```

## Despliegue

```
Despliegue: https://meteoapp20360.azurewebsites.net/
```
