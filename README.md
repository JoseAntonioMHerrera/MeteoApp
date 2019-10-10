[![Build Status](https://travis-ci.org/JoseAntonioMHerrera/MeteoApp.svg?branch=master)](https://travis-ci.org/JoseAntonioMHerrera/MeteoApp)
[![CircleCI](https://circleci.com/gh/JoseAntonioMHerrera/MeteoApp.svg?style=svg)](https://circleci.com/gh/JoseAntonioMHerrera/MeteoApp)
# MeteoApp

## Documentación

[Enlace a la documentación general del proyecto]()

## Especificación de los esquemas JSON

En este microservicio se planea en un futuro almacenar objetos JSON referentes a las temperaturas de una ciudad en un día concreto. Con la ayuda de la librería de validación de JSON, **joi**, los campos de los objetos JSON a partir de los cuales se puede introducir o editar información de la base de datos mediante peticiones POST/PUT son los siguientes:

- **Ciudad**: Una ciudad se compone de un nombre. 
- **Mes**: Un mes se compone de un nombre de ciudad, un año, un número de mes y una lista de días.
- **Día**: Un día se compone de un nombre de ciudad, un año, un número de mes un número de dìa y tres temperaturas correspondiendo con las horas 8:00, 14:00 y 21:00.

La estructura de los objetos JSON que podemos conseguir mediante peticiones GET son los siguientes:

- **Ciudad**: Una ciudad se compondrá de un año, con las consiguientes temperaturas de ese año.
- **Mes**: Un mes se compondrá de una ciudad, un año, un número de mes, los días de ese mes y las temperaturas de esos días.
- **Día**: Un día se compondrá de un nombre de ciudad, un año, un número de mes, un número de día y las temperaturas de ese día.

## Tests: controlador.js

Los tests se han ejecutado sobre las funciones de controlador.js, el cual se encarga de conectar con la base de datos para dar servicio a las peticiones y, en caso necesario, validar la estructura de los objetos JSON que se envían en caso de las peticiones POST/PUT.

