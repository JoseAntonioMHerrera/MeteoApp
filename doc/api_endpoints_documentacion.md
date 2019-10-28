# API Endpoints

Para mas información o prueba de los endpoints, se ha hecho uso de **swagger** para la documentación de los endpoints. Acceder a **/documentacion** una vez lanzamos el servidor.

## Peticiones GET

**GET /meteo/{ciudad}/**: devuelve las temperaturas de la ciudad {ciudad} en todos los años registrados.

**GET /meteo/{ciudad}/{año}**: devuelve las temperaturas de la ciudad {ciudad} en el año {año}.

**GET /meteo/{ciudad}/{año}/{mes}**: devuelve las temperaturas de la ciudad {ciudad} en el año {año} en el mes {mes}.

**GET /meteo/{ciudad}/{año}/{mes}/{dia}**: devuelve las temperaturas de la ciudad {ciudad} en el año {año} en el mes {mes} en el día {dia}.

## Peticiones POST

**POST /meteo/ciudad**: añade una ciudad a la base de datos a partir del JSON que se le pasa en el request. Devuelve error si la ciudad ya existe.

**POST /meteo/anio**: añade un año de una ciudad a la base de datos. Devuelve error si la ciudad no existe o el año enviado ya existe.

**POST /meteo/mes**: añade las temperaturas del mes de un año de una ciudad a la base de datos. Devuelve error si el mes ya existe o no se encuentran registrados el año o la ciudad.

**POST /meteo/dia**: añade las temperaturas del día perteneciente a un mes, año y ciudad a la base de datos. Devuelve error si el mes ya existe o no se encuentran registrados el año, mes o la ciudad.

## Peticiones DELETE

Proximamente

## Peticiones PUT

Proximamente