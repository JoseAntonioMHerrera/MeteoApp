## Tecnologías

* **Javascript**: Lenguaje de programación.
* **Node.js**: Entorno de desarrollo para javascript enfocado principalmente en el backend.
* **Hapi.js**: Framework para el desarrollo de web APIs. Usaremos además su módulo **Joi** para la validación de objetos JSON.
* **MongoDB**: Base de datos que nos permitirá trabajar con objetos JSON directamente. En nuestro caso haremos uso del middleware **mongoose** para javascript.
* **Fluentd**: para el manejo de logs.
* **Swagger**: swagger es un framework que nos ayudará principalmente a la documentación de la API. Además de eso, permite testear cada endpoint del que dispongamos en nuestra aplicación. .
* **Travis-CI**: integración continua.
* **Circle-CI**: integración continua. Parecido a Travis-CI, su uso resulta sencillo y transparente. Una alternativa a tener en cuenta. 
* **Mocha**: framework de testing que permite el teste asíncrono e incluye soporte para navegador. Se usará junto a la biblioteca assert de **chai**.
* **Docker**: tecnología que usaremos para virtualizar nuestro microservicio y los servicios de los que haga uso (bases de datos), para posteriormente desplegarlo en la nube. [Documentación de Docker]()
* **Heroku**: Plataforma en la nube que permite trabajar con docker para virtualizar los servicios.

## Herramienta de construcción
 
El siguiente enlace lleva a la [documentación de package.json](https://github.com/JoseAntonioMHerrera/MeteoApp/doc/package_json_documentacion.md).

## Documentación

* [Documentación CircleCI](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/circle_ci_documentacion.md).
* [Documentación TravisCI](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/travis_ci_documentacion.md).
* [Documentación de API endpoints](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/api_endpoints_documentacion.md).
* [Documentación de modelos y esquemas](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/modelos_esquemas_documentacion.md).
* [Documentación de package.json](https://github.com/JoseAntonioMHerrera/MeteoApp/doc/package_json_documentacion.md).
* [Documentación de Mocha tests](https://github.com/JoseAntonioMHerrera/MeteoApp/doc/mocha_test_documentacion.md).
* [Documentación PaaS](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/paas_documentacion.md)
* [Documentación PaaS y Docker](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/paas_docker_documentacion.md)