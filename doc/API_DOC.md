# API Endpoints

## Peticiones GET

**GET /ciudad/{ciudad}/{año}**: devuelve las temperaturas de la ciudad {ciudad} en el año {año}.

**GET /ciudad/{ciudad}/{año}/{mes}**: devuelve las temperaturas de la ciudad {ciudad} en el año {año} en el mes {mes}.

**GET /ciudad/{ciudad}/{año}/{mes}/{dia}**: devuelve las temperaturas de la ciudad {ciudad} en el año {año} en el mes {mes} en el día {dia}.

## Peticiones POST

**POST /ciudad/nuevo**: añade una ciudad a la base de datos a partir del JSON que se le pasa en el request.

**POST /ciudad/mes/nuevo**: añade las temperaturas de un mes en concreto a una ciudad en concreto a partir del JSON que se le pasa en el request.

**POST /ciudad/dia/nuevo**: añade las temperaturas de un día concreto a un mes y ciudad especìficas a partir del JSON que se le pasa en el request.

## Peticiones DELETE

Proximamente

## Peticiones PUT

Proximamente