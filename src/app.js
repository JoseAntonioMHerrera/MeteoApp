const hapi = require("@hapi/hapi");
const inert = require("@hapi/inert");
const vision = require("@hapi/vision");
const hapiswagger = require("hapi-swagger");
const Joi = require("@hapi/joi");

const ciudad = require("./ciudad-schema");
const dia = require("./dia-schema");
const mes = require("./mes-schema");

const controlador = require("./controlador.js");

process.title = "meteoapp";

const optswagger = {
    info:{
        title: "Documentación MeteoApp API",
        version: "v0.1"
    },
    definitionPrefix: "useLabel",
    reuseDefinitions: "false"
}

const server = new hapi.server({
    "host":"localhost",
    "port": 3000
});

server.register([
    inert,
    vision,
    {
        plugin: hapiswagger,
        options: optswagger
    }
]).then(()=>{
    server.start(error=> {
        if(error){
            throw error;
        }
        console.log("Escuchando en el puerto 3000");
    });
});

/*
* GET /ciudad/{ciudad}/{anio} devuelve todos las temperaturas de la ciudad = {ciudad} en el año = {anio}
*
*/

server.route({
    method: "GET",
    path: "/meteo/{ciudad}/{anio}",
    options:{
        description: "Devuelve las temperaturas en el año {anio} de la ciudad {ciudad}",
        notes: "Retorna un objeto JSON con las temperaturas de un año concreto en una ciudad",
        tags: ['api'],
        validate:{
            params:{
                ciudad: Joi.string().min(3),
                anio: Joi.number().integer().min(2000)
            }
        },
        handler: (request,reply) => {
            temperaturas_ciudad_anio = controlador.peticionCiudad(request.params.ciud, request.params.anio);
            reply(temperaturas_ciudad_anio);
        }
    }
});


/*
* GET /ciudad/{ciudad}/{anio}/{mes} devuelve todos las temperaturas de la ciudad = {ciudad} en el año = {anio} en el mes = {mes}
*
*/

server.route({
    method: "GET",
    path: "/meteo/{ciudad}/{anio}/{mes}",
    options: {
        description: "Devuelve las temperaturas en el mes {mes} del año {anio} de la ciudad {ciudad}",
        notes: "Retorna un objeto JSON con las temperaturas de un mes de un año concreto en una ciudad",
        tags: ['api'],
        validate:{
            params:{
                ciudad: Joi.string().min(3),
                anio: Joi.number().integer().min(2000),
                mes: Joi.number().integer().min(1).max(12)
            }
        },
        handler: (request, reply) => {
            temperaturas_ciudad_mes = controlador.peticionMes(request.params.ciudad, request.params.anio, request.params.mes);
            reply(temperaturas_ciudad_dia);
    
        }
    }

});

/*
* GET /ciudad/{ciudad}/{anio}/{mes} devuelve todos las temperaturas de la ciudad = {ciudad} en el año = {anio} en el mes = {mes} en el día = {dia}
*
*/

server.route({
    method: "GET",
    path: "/meteo/{ciudad}/{anio}/{mes}/{dia}",
    options: {
        description: "Devuelve las temperaturas en el día {dia} en el mes {mes} del año {anio} de la ciudad {ciudad}",
        notes: "Retorna un objeto JSON con las temperaturas de un día perteneciente a un mes de un año concreto en una ciudad",
        tags: ['api'],
        validate:{
            params:{
                ciudad: Joi.string().min(3),
                anio: Joi.number().integer().min(2000),
                mes: Joi.number().integer().min(1).max(12),
                dia: Joi.number().integer().min(1).max(31)
            }
        },
        handler: (request, reply) => {
            temperaturas_ciudad_dia = controlador.peticionDia(request.params.ciudad, request.params.anio, request.params.mes, request.params.dia);
            reply(temperaturas_ciudad_dia);
        }
    }
});

/*
*
* POST /ciudad/nuevo añade una ciudad vacia a la base de datos
*/

server.route({
    method: "POST",
    path: "/meteo/ciudad/",
    options: {
        description: "Realiza una inserción del objeto JSON ciudad que contiene un nombre de ciudad y un array de años.",
        notes: "Retorna un código 200 OK si la inserción ha sido exitosa.",
        tags: ['api'],
        validate:{
            payload:{
                ciudad: ciudad.ciudad_schema
            }
        },
        response:{
            schema: Joi.number().integer().valid(201,500)
        },
        handler: (request,reply) => {
            if(controlador.insertarCiudad(request.payload))
                reply().code(201);
            else
                reply().code(500);
        }
    }
});

/*
*
* POST /ciudad/dia/nuevo añade las temperaturas de un día a un mes, año y ciudad concretos
*/

server.route({
    method: "POST",
    path: "/meteo/dia",
    options: {
        description: "Realiza una inserción del objeto JSON día que contiene un nombre de ciudad, un número de año, un número de mes, un número de día y las temperaturas de ese día.",
        notes: "Retorna un código 200 OK si la inserción ha sido exitosa.",
        tags: ['api'],
        validate:{
            payload:{
                dia: dia.dia_schema
            }
        },
        response:{
            schema: Joi.number().integer().valid(201,500)
        },
        handler: (request,reply) => {
            if(controlador.insertarDia(request.payload))
                reply().code(201);
            else
                reply().code(500);
        }
    }
});

/*
*
* POST /ciudad/mes/nuevo añade las temperaturas de un mes a un año y una ciudad concretos
*/

server.route({
    method: "POST",
    path: "/meteo/mes",
    options: {
        description: "Realiza una inserción del objeto JSON día que contiene un nombre de ciudad, un número de año, un número de mes, y un array de días.",
        notes: "Retorna un código 200 OK si la inserción ha sido exitosa.",
        tags: ['api'],
        validate:{
            payload:{
                mes: mes.mes_schema
            }
        },
        response:{
            schema: Joi.number().integer().valid(201,500)
        },
        handler: (request,reply) => {
            if(controlador.insertarTMes(request.payload))
                reply().code(201);
            else
                reply().code(500);
        }
    }
});