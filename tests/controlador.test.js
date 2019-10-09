const controlador = require("../src/controlador.js");
const datos_prueba = require("./datos.js");

test('la respuesta de peticionPOSTCiudad debería tener error como undefined', ()=> {
    respuesta = controlador.peticionPOSTCiudad(datos_prueba.post_temperaturas_ciudad);
    expect(respuesta.error).toBe(undefined);
});

test('la respuesta de peticionPOSTMes debería tener error como undefined', ()=> {
    respuesta = controlador.peticionPOSTMes(datos_prueba.temperaturas_ciudad_mes);
    expect(respuesta.error).toBe(undefined);
});

test('la respuesta de peticionPOSTDia debería tener error como undefined', ()=> {
    respuesta = controlador.peticionPOSTDia(datos_prueba.temperaturas_ciudad_dia);
    console.log(respuesta);
    expect(respuesta.error).toBe(undefined);
});

test('la respuesta de peticionGETCiudad debería devolver el objeto JSON {temperaturas_ciudad}', ()=> {
    respuesta = controlador.peticionGETCiudad("granada","1995");
    expect(respuesta).toBe(JSON.stringify(datos_prueba.temperaturas_ciudad));
});

test('la respuesta de peticionGETMes debería devolver el objeto JSON {temperaturas_mes}', ()=> {
    respuesta = controlador.peticionGETMes("granada","1995","5");
    expect(respuesta).toBe(JSON.stringify(datos_prueba.temperaturas_ciudad_mes));
});

test('la respuesta de peticionGETDia debería devolver el objeto JSON {temperaturas_ciudad_dia}', ()=> {
    respuesta = controlador.peticionGETDia("granada","1995","5","1");
    expect(respuesta).toBe(JSON.stringify(datos_prueba.temperaturas_ciudad_dia));
});