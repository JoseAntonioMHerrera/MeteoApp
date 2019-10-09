const hapi = require("hapi");

const server = new hapi.server();

server.connection({
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
    handler: (request,response) => {
        response();
    }

});

server.route({
    method: "GET",
    path: "/ciudad/<ciudad>/<anio>/<mes>",
    handler: (reqest, response) => {
        response("Recibida petición de muestra de temperaturas en la ciudad " + request.params.ciudad + " en " + request.params.anio + "/" + request.params.mes);
    }

});

server.route({
    method: "GET",
    path: "/ciudad/<ciudad>/<anio>/<mes>/<dia>",
    handler: (reqest, response) => {
        response("Recibida petición de muestra de temperaturas en la ciudad " + request.params.ciudad + " en " + request.params.anio + "/" + request.params.mes +
        "/" + request.params.dia);
    }
});

server.route({
    method: "POST",
    path: "/ciudad/nuevo",
    handler: (request,response) => {

    }
});

server.route({
    method: "POST",
    path: "/ciudad/dia/nuevo",
    handler: (request,response) => {

    }
});

server.route({
    method: "POST",
    path: "/ciudad/mes/nuevo",
    handler: (request,response) => {

    }
});

server.route({
    method: "DELETE",
    path: "/ciudad/borrar",
    handler: (request,response) => {

    }
});

server.route({
    method: "DELETE",
    path: "/ciudad/dia/borrar",
    handler: (request,response) => {

    }
});

server.route({
    method: "DELETE",
    path: "/ciudad/mes/borrar",
    handler: (request,response) => {

    }
});

server.route({
    method: "DELETE",
    path: "/ciudad/año/borrar",
    handler: (request,response) => {

    }
});

server.route({
    method:"PUT",
    path: "/ciudad/"
})