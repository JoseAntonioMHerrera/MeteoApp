var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/meteoDB',{ useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false });

var db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error:'));
db.once('open',function(){
    module.exports={
        mongoose_db: db
    }
});

/*

Hace un rollback al commit de los schemas. Tienen que estar separados.
Añadir commit de modelos de mongoose.
Añadir commit de app.js con los response bien puestos.
Añadir commit de controlador js con las inserciones y lecturas bien hechas
Añadir commit con la reescritura de los tests (nuevo controlador)
Añadir commit con todas las nuevas tecnologias usadas y su documentacion
Añadir commit con la documentacion nueva de los modelos y esquemas (MongoDB, Mongoose y Joi)
Dockerizar y lanzar con MongoDB
Integracion Continua con MongoDB CIRCLECI Y TRAVIS



*/
