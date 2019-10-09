const hapi = require("@hapi/hapi");
const controlador = require("./controlador.js");

const server = new hapi.server({
    "host":"localhost",
    "port": 3000
});

server.start(error=> {
    if(error){
        throw error;
    }
    console.log("Escuchando en el puerto 3000");
});

/*
* GET /ciudad/{ciudad}/{anio} devuelve todos las temperaturas de la ciudad = {ciudad} en el año = {anio}
*
*/

server.route({
    method: "GET",
    path: "/ciudad/{ciudad}/{anio}",
    handler: (request,reply) => {
        temperaturas_ciudad = controlador.peticionGETCiudad(request.params.ciudad, request.params.anio);
        return temperaturas_ciudad;
    }

});

/*
* GET /ciudad/{ciudad}/{anio}/{mes} devuelve todos las temperaturas de la ciudad = {ciudad} en el año = {anio} en el mes = {mes}
*
*/

server.route({
    method: "GET",
    path: "/ciudad/{ciudad}/{anio}/{mes}",
    handler: (reqest, response) => {
        temperaturas_ciudad_mes = controlador.peticionGETMes(request.params.ciudad, request.params.anio, request.params.mes);
        return temperaturas_ciudad_mes;
    }

});

/*
* GET /ciudad/{ciudad}/{anio}/{mes} devuelve todos las temperaturas de la ciudad = {ciudad} en el año = {anio} en el mes = {mes} en el día = {dia}
*
*/

server.route({
    method: "GET",
    path: "/ciudad/{ciudad}/{anio}/{mes}/{dia}",
    handler: (reqest, response) => {
        temperaturas_ciudad_dia = controlador.peticionGETDia(request.params.ciudad, request.params.anio, request.params.mes, request.params.dia);
        return temperaturas_ciudad_dia;        
    }
});

/*
*
* POST /ciudad/nuevo añade una ciudad vacia a la base de datos
*/

server.route({
    method: "POST",
    path: "/ciudad/nuevo",
    handler: (request,response) => {
        if(controlador.peticionPOSTCiudad(request.payload))
            return "Success /ciudad/nuevo";
        else
            return "Error /ciudad/nuevo";
    }
});

/*
*
* POST /ciudad/dia/nuevo añade las temperaturas de un día a un mes, año y ciudad concretos
*/

server.route({
    method: "POST",
    path: "/ciudad/dia/nuevo",
    handler: (request,response) => {
        if(controlador.peticionPOSTDia(request.payload))
            return "Success /ciudad/dia/nuevo";
        else
            return "Error /ciudad/dia/nuevo";
    }
});

/*
*
* POST /ciudad/mes/nuevo añade las temperaturas de un mes a un año y una ciudad concretos
*/

server.route({
    method: "POST",
    path: "/ciudad/mes/nuevo",
    handler: (request,response) => {
        if(controlador.peticionPOSTMes(request.payload))
            return "Success /ciudad/mes/nuevo";
        else
            return "Error /ciudad/mes/nuevo";
    }
});