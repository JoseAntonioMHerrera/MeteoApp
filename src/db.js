var mongoose = require("mongoose");

let url_conexion = "mongodb://localhost/meteoDB";

if(process.env.NODE_ENV == "docker")
    url_conexion='mongodb://database/meteoDB';
else if(process.env.NODE_ENV == "test")
    url_conexion='mongodb://localhost/meteoDBtest';

mongoose.connect(url_conexion,{ useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false });

var db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error:'));
db.once('open',function(){});

module.exports={
    mongoose_db: db
}
