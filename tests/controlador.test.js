const controlador = require("../src/controlador.js");
const datos_prueba = require("./datos.js");

test('la respuesta de insertarCiudad debería tener error como undefined', ()=> {
    respuesta = controlador.insertarCiudad(datos_prueba.post_temperaturas_ciudad);
    console.log(respuesta);
    expect(respuesta.error).toBe(null);
});

test('la respuesta de insertarMes debería tener error como undefined', ()=> {
    respuesta = controlador.insertarMes(datos_prueba.temperaturas_ciudad_mes);
    expect(respuesta.error).toBe(null);
});

test('la respuesta de insertarDia debería tener error como undefined', ()=> {
    respuesta = controlador.insertarDia(datos_prueba.temperaturas_ciudad_dia);
    expect(respuesta.error).toBe(null);
});

test('la respuesta de peticionCiudad debería devolver el objeto JSON {datos_prueba.temperaturas_ciudad}', ()=> {
    respuesta = controlador.peticionCiudad("granada","1995");
    expect(respuesta).toBe(JSON.stringify(datos_prueba.temperaturas_ciudad));
});

test('la respuesta de peticionMes debería devolver el objeto JSON {datos_prueba.temperaturas_ciudad_mes}', ()=> {
    respuesta = controlador.peticionMes("granada","1995","5");
    expect(respuesta).toBe(JSON.stringify(datos_prueba.temperaturas_ciudad_mes));
});

test('la respuesta de peticionDia debería devolver el objeto JSON {datos_prueba.temperaturas_ciudad_dia}', ()=> {
    respuesta = controlador.peticionDia("granada","1995","5","1");
    expect(respuesta).toBe(JSON.stringify(datos_prueba.temperaturas_ciudad_dia));
});