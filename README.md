# MeteoApp

## Descripción general

Este microservicio ofrece el conjunto de operaciones CRUD (Create, Read, Update, Delete) para el manejo de datos metereológicos en las distintas ciudades del país. El objetivo es ofrecer una servicio API RESTful que otorgue el acceso a estos datos de forma pública, así como su edición. Estos datos se proporcionará en formato JSON para un manejo facil de los mismos por parte del usuario. Idealmente, este microservicio formaría parte de una infraestructura mas grande donde los usuarios podrían bien ser otros microservicios que podrían formar parte tanto como origen de los datos como servidores de los mismos.

## Pasos de desarrollo

El microservicio se llevará a cabo en el lenguaje javascript, usando para ello Node.js . El objetivo será crear una API que proporcione objetos JSON. La base de datos que usaremos para suplir la necesidad de un sitio de donde extraer los datos será MongoBD, que nos permitirá trabajar con objetos JSON. Siguiendo las buenas praácticas para el desarrollo, de los primeros pasos será establecer y configurar una plataforma de integración continua como Travis-CI que nos ayudará a testear los cambios a los largo de todo el desarrollo, en conjunción con Jest, un framework de testing para javascript. Para desplegar el microservicio en la nube nos decantaremos en princpio por Heroku, un PaaS que en principio no nos requerirá ninguna tecnología de virtualización extra (uso con Github), aunque es posible usarlo también con Dockers si ese fuera el caso en la situación que quisieramos por ejemplo desplegar la base de datos por separado.

## Guía de instalación

Proximamente.

## Tecnologías

* **Javascript**: Lenguaje de programación.
* **Node.js**: Framework de desarrollo para javascript orientado a servidores. Para la instalación de paquetes y para llevar un correcto control de dependencias usaremos **yarn**.
* **MongoDB**: Base de datos que nos permitirá trabajar con objetos JSON directamente.
* **Fluentd**: para el manejo de logs.
* **Travis-CI**: integración continua.
* **Jest**: framework de testing.
* **Heroku**: Plataforma en la nube que permite trabajar con docker para virtualizar los servicios.

## Como se usa
Proximamente.