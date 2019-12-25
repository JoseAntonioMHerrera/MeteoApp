const assert = require('chai').assert;
const controlador = require("../src/controlador.js");
const datos_prueba = require("./datos.js");
const mongoose = require("../src/db.js");
const ciudad_model = require("../models/ciudad_model.js");

after(function(done){
    mongoose.mongoose_db.close();
    done();
});

before(function(done){
    try{
        ciudad_model.ciudad_model_mongo.deleteMany({},function(error){
            if(error)
                console.log(error);
            done();
        });
    }catch(error){
        console.log(error);
    }
});

describe('Test de inserción de ciudad.', ()=>{
    it('La inserción de una ciudad debe retornar {}', function(done){
        let promesa_respuesta  = controlador.insertarCiudad(datos_prueba.temperaturas_granada);
        promesa_respuesta.then(function(respuesta){
            try{
                console.log(respuesta)
                assert.isEmpty(respuesta,"Error: " + respuesta.value);
                done();
            }catch(error){
                done(error);
            }
        });
    });   
});

describe('Test de inserción de año.', ()=> {
    it('La inserción de un año debe retornar {}', function(done){
        let promesa_insercion_anio = controlador.insertarAnio(datos_prueba.temperaturas_granada_2018);
        promesa_insercion_anio.then(function(respuesta){
            try{
                console.log(respuesta)
                assert.isEmpty(respuesta,"Error: " + respuesta.value);
                done();
            }catch(error){
                done(error);
            }
        });
    });
});
/*
describe('Test de inserción de mes', ()=>{
    it('La inserción de un mes debe retornar {}', function(done){
        let promesa_respuesta = controlador.insertarMes(datos_prueba.temperaturas_granada_2018_mes_11);
        promesa_respuesta.then(function(respuesta){
            try{
                console.log(respuesta)
                assert.isEmpty(respuesta,"Error: " + respuesta.value);
                done();
            }catch(error){
                done(error);
            }
        });
    });
});

describe('Test de inserción de día', ()=>{
    it('La inserción de un día debe retornar {}', function(done){
        let promesa_respuesta = controlador.insertarDia(datos_prueba.temperaturas_granada_2018_mes_11_dia_20);
        promesa_respuesta.then(function(respuesta){
            try{
                console.log(respuesta)
                assert.isEmpty(respuesta,"Error: " + respuesta.value);
                done();
            }catch(error){
                done(error);
            }
        });
    });
});

describe('Test de lectura de ciudad.', ()=>{
    it('La lectura de una ciudad no debe ser null', function(done){
        let promesa_respuesta = controlador.peticionCiudad(datos_prueba.granada);
        promesa_respuesta.then(function(respuesta){
            try{
                assert.notEqual(null,"Error: " + respuesta.value);
                done();
            }catch(error){
                done(error);
            }
        });
    });   
});
/*
describe('Test de lectura de año.', ()=> {
    it('La lectura de un año no debe ser null', function(done){
        let promesa_respuesta = controlador.peticionAnio(datos_prueba.granada, datos_prueba.dosmil18);
        promesa_respuesta.then(function(respuesta){
            try{
                assert.notEqual(null,"Error: " + respuesta.value);
                done();
            }catch(error){
                done(error);
            }
        });
    });
});

describe('Test de lectura de mes', ()=>{
    it('La lectura de un mes no debe ser null', function(done){
        let promesa_respuesta = controlador.peticionMes(datos_prueba.granada, datos_prueba.dosmil19, datos_prueba.mes12);
        promesa_respuesta.then(function(respuesta){
            try{
                assert.notEqual(null,"Error: " + respuesta.value);
                done();
            }catch(error){
                done(error);
            }
        });
    });
});

describe('Test de lectura de día', ()=>{
    it('La lectura de un día no debe ser null', function(done){
        let promesa_respuesta = controlador.peticionDia(datos_prueba.granada, datos_prueba.dosmil18, datos_prueba.mes11, datos_prueba.dia20);
        promesa_respuesta.then(function(respuesta){
            try{
                assert.notEqual(null,"Error: " + respuesta.value);
                done();
            }catch(error){
                done(error);
            }
        });
    });
});*/

describe('Test de edición de ciudad.', ()=>{
    it('La edición de una ciudad debe retornar {}', function(done){
        let promesa_respuesta  = controlador.actualizarCiudad(datos_prueba.temperaturas_granada_2);
        promesa_respuesta.then(function(respuesta){
            try{
                assert.isEmpty(respuesta,"Error: " + respuesta.value);
                done();
            }catch(error){
                done(error);
            }
        });
    });   
});

describe('Test de edición de año.', ()=> {
    it('La edición de un año debe retornar {}', function(done){
        let promesa_respuesta = controlador.actualizarAnio(datos_prueba.temperaturas_granada_2018_2);
        promesa_respuesta.then(function(respuesta){
            try{
                assert.isEmpty(respuesta,"Error: " + respuesta.value);
                done();
            }catch(error){
                done(error);
            }
        });
    });
});
/*
describe('Test de edición de mes', ()=>{
    it('La edición de un mes debe retornar {}', function(done){
        let promesa_respuesta = controlador.actualizarMes(datos_prueba.temperaturas_granada_2018_mes_11_2);
        promesa_respuesta.then(function(respuesta){
            try{
                assert.isEmpty(respuesta,"Error: " + respuesta.value);
                done();
            }catch(error){
                done(error);
            }
        });
    });
});

describe('Test de edición de día', ()=>{
    it('La edición de un día debe retornar {}', function(done){
        let promesa_respuesta = controlador.actualizarDia(datos_prueba.temperaturas_granada_2018_mes_11_dia_20_2);
        promesa_respuesta.then(function(respuesta){
            try{
                assert.isEmpty(respuesta,"Error: " + respuesta.value);
                done();
            }catch(error){
                done(error);
            }
        });
    });
});
/*
describe('Test de eliminación de día', ()=>{
    it('La eliminación de un día debe retornar {}', function(done){
        let promesa_respuesta = controlador.eliminarDia(datos_prueba.granada,datos_prueba.dosmil18,datos_prueba.mes11,datos_prueba.dia20);
        promesa_respuesta.then(function(respuesta){
            try{
                assert.isEmpty(respuesta,"Error: " + respuesta.value);
                done();
            }catch(error){
                done(error);
            }
        });
    });
});

describe('Test de eliminación de mes', ()=>{
    it('La eliminación de un mes debe retornar {}', function(done){
        let promesa_respuesta = controlador.eliminarMes(datos_prueba.granada,datos_prueba.dosmil18,datos_prueba.mes11);
        promesa_respuesta.then(function(respuesta){
            try{
                assert.isEmpty(respuesta,"Error: " + respuesta.value);
                done();
            }catch(error){
                done(error);
            }
        });
    });
});
*/

describe('Test de eliminación de año.', ()=> {
    it('La eliminación de un año debe retornar {}', function(done){
        let promesa_respuesta = controlador.eliminarAnio(datos_prueba.granada,datos_prueba.dosmil18);
        promesa_respuesta.then(function(respuesta){
            try{
                assert.isEmpty(respuesta,"Error: " + respuesta.value);
                done();
            }catch(error){
                done(error);
            }
        });
    });
});

describe('Test de eliminación de ciudad.', ()=>{
    it('La eliminación de una ciudad debe retornar {}', function(done){
        let promesa_respuesta  = controlador.eliminarCiudad(datos_prueba.granada);
        promesa_respuesta.then(function(respuesta){
            try{
                assert.isEmpty(respuesta,"Error: " + respuesta.value);
                done();
            }catch(error){
                done(error);
            }
        });
    });   
});
