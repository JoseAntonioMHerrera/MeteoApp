const hapi = require("@hapi/hapi");
const inert = require("@hapi/inert");
const vision = require("@hapi/vision");
const hapiswagger = require("hapi-swagger");
const Joi = require("@hapi/joi");

const ciudad = require("./src/ciudad-schema");
const dia = require("./src/dia-schema");
const mes = require("./src/mes-schema");
const anio = require("./src/anio_schema");

const ciudad_model = require('./models/ciudad_model');

const controlador = require("./src/controlador.js");

let interfaz = "localhost";

process.title = "meteoapp";
puerto = 3000

if(process.env.NODE_ENV == "production"){
    puerto = process.env.PORT
    interfaz = "0.0.0.0"
}

const optswagger = {
    info:{
        title: "Documentación MeteoApp API",
        version: "v0.1"
    },
    definitionPrefix: "useLabel",
    reuseDefinitions: "false"
}

const server = new hapi.server({
    "host": interfaz,
    "port": puerto
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

server.route({
    method: "GET",
    path: "/status",
    handler: (request,h) =>{
        return h.response({"status":"OK", "ejemplo":{"ruta":"/meteo/Granada","resultado":{"ciudad":"Granada","anios":[{"meses":[{"dias":[{"temperaturas":{"hora_08":6,"hora_14":6,"hora_21":6},"_id":"5dcb2aee0d7ced00175ff196","num_dia":23}],"_id":"5dcb2aee0d7ced00175ff195","num_mes":12}],"_id":"5dcb2aee0d7ced00175ff194","num_anio":2019}],"__v":0}}});
    }
});

server.route({
    method: "GET",
    path: "/meteo/{ciudad}",
    options:{
        description: "Devuelve las temperaturas de todos los años de la ciudad {ciudad}",
        notes: "Retorna un objeto JSON con las temperaturas de una ciudad en todos sus años",
        tags: ['api'],
        validate:{
            params:{
                ciudad: Joi.string().min(3)
            }
        }
    },
    handler: async (request,h) => {
        try{
            var resultado_peticion = await controlador.peticionCiudad(request.params.ciudad);

            if(resultado_peticion != null){
                return h.response(resultado_peticion).code(200);
            }else{
                return h.response("No existe la ciudad.").code(404);
            }
        }catch(error){
            console.log(error);
            return h.response().code(500);
        }
    }
});


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
        }
    },
    handler: async (request,h) => {
        try{
            let resultado_peticion = await controlador.peticionAnio(request.params.ciudad, request.params.anio);
            if(resultado_peticion != null){
                return h.response(resultado_peticion).code(200);
            }else{
                return h.response("No existe el año.").code(404);
            }
        }catch(error){
            console.log(error);
            return h.response().code(500);
        }   
    }
});

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
        }
    },
    handler: async (request, h) => {
        try{
            let resultado_peticion = await controlador.peticionMes(request.params.ciudad, request.params.anio, request.params.mes);
            if(resultado_peticion != null){
                return h.response(resultado_peticion).code(200);
            }else{
                return h.response("No existe el mes.").code(404);
            }
        }catch(error){
            console.log(error);
            return h.response().code(500);
        }
    }
});

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
        }
    },
    handler: async (request, h) => {
        try{
            let resultado_peticion = await controlador.peticionDia(request.params.ciudad, request.params.anio, request.params.mes, request.params.dia);
            if(resultado_peticion != null){
                return h.response(resultado_peticion).code(200);
            }else{
                return h.response("No existe el día.").code(404);
            }
        }catch(error){
            console.log(error);
            return h.response().code(500);
        }
    }
});

server.route({
    method: "POST",
    path: "/meteo/ciudad/",
    options: {
        description: "Realiza una inserción del objeto JSON ciudad que contiene un nombre de ciudad y un array de años.",
        notes: "Retorna un código 201 OK si la inserción ha sido exitosa.",
        tags: ['api'],
        validate:{
            payload:{
                ciudad: ciudad.ciudad_schema
            }
        }
    },
    handler: async (request, h) => {
        try{
            resultado_insercion = await controlador.insertarCiudad(request.payload.ciudad);
            if(resultado_insercion.error){
                return h.response(resultado_insercion.value).code(400);
            }else{
                return h.response().code(201);
            }
        }catch(error){
            console.log(error);
            return h.response().code(500);
        }
    }
});

server.route({
    method: "POST",
    path: "/meteo/anio",
    options: {
        description: "Realiza una inserción del objeto JSON anio que contiene un nombre de ciudad, un número de año y un array de meses.",
        notes: "Retorna un código 201 OK si la inserción ha sido exitosa.",
        tags: ['api'],
        validate:{
            payload:{
                anio: anio.anio_schema_peticion
            }
        }
    },
    handler: async (request,h) => {
        try{
            resultado_insercion = await controlador.insertarAnio(request.payload.anio);
            if(resultado_insercion.error){
                return h.response(resultado_insercion.value).code(400);
            }else{
                return h.response().code(201);
            }
        }catch(error){
            console.log(error);
            return h.response().code(500);
        }
    }
});

server.route({
    method: "POST",
    path: "/meteo/mes",
    options: {
        description: "Realiza una inserción del objeto JSON día que contiene un nombre de ciudad, un número de año, un número de mes, y un array de días.",
        notes: "Retorna un código 201 OK si la inserción ha sido exitosa.",
        tags: ['api'],
        validate:{
            payload:{
                mes: mes.mes_schema_peticion
            }
        }
    },
    handler: async (request,h) => {
        try{
            resultado_insercion = await controlador.insertarMes(request.payload.mes);
            if(resultado_insercion.error){
                return h.response(resultado_insercion.value).code(400);
            }else{
                return h.response().code(201);
            }
        }catch(error){
            console.log(error);
            return h.response().code(500);
        }
    }
});


server.route({
    method: "POST",
    path: "/meteo/dia",
    options: {
        description: "Realiza una inserción del objeto JSON día que contiene un nombre de ciudad, un número de año, un número de mes, un número de día y las temperaturas de ese día.",
        notes: "Retorna un código 201 OK si la inserción ha sido exitosa.",
        tags: ['api'],
        validate:{
            payload:{
                dia: dia.dia_schema_peticion
            }
        }
    },
    handler: (request,h) => {
        try{
            resultado_insercion = controlador.insertarDia(request.payload.dia);
            if(resultado_insercion.error){
                return h.response(resultado_insercion.value).code(400);
            }else{
                return h.response().code(201);
            }
        }catch(error){
            console.log(error);
            return h.response().code(500);
        }
    }
});