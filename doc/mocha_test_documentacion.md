## Testing con Mocha

Mocha es el framework elegido de testeo. En el presente estado de la aplicación se testea los métodos del archivo **controlador.js**. Estos métodos cubren las operaciones CRUD sobre los modelos de los que hace uso MeteoApp ([Modelos Mongoose](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/modelos_esquemas_documentacion.md)). A continuación mostramos un test sobre la inserción de una ciudad.

```
describe('Test de inserción de ciudad.', ()=>{
    it('La inserción de una ciudad debe retornar {}', function(done){
        let promesa_respuesta  = controlador.insertarCiudad(datos_prueba.temperaturas_granada);
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

```

Con **describe()** podemos agrupar un conjunto de tests para que se ejecuten de forma secuencial. Dentro de la función, **it()** se realiza la llamada al método de **controlador.js** insertarCiudad(payload), donde comprobamos que el valor retornado sea {}, gracias a la libreria **assert** de **chai**. Si assert fallará, en caso de que hubieramos tenido un valor de retorno inesperado, el error se caputra gracias al try{}catch(). Una vez finalizado el test, erroneo o no, se llama a la función done para indicar su finalización.

También se han hecho uso de los hooks after() y before() para llevar a cabo ciertas tareas antes y después de la ejecución de los tests.

```
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
```
Antes de comenzar con la ejecución de los tests, eliminamos todas las ciudades con sus correspondientes años, meses y días.

```
after(function(done){
    mongoose.mongoose_db.close();
    done();
});

```

Tras acabar los tests cerramos la conexión con MongoDB.