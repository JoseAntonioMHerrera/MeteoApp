var mongoose = require("mongoose");

let url_conexion = "mongodb://localhost/meteoDB";

if(process.env.NODE_ENV == "docker")
    url_conexion='mongodb://database/meteoDB';
else if(process.env.NODE_ENV == "test")
    url_conexion='mongodb://localhost/meteoDBtest';
else if(process.env.NODE_ENV == "production"){
    url_conexion= process.env.DB_CONN;
}else{
    url_conexion="mongodb+srv://meteo:123meteo456@meteoappcluster-eaqjp.azure.mongodb.net/test?retryWrites=true"
}

mongoose.connect(url_conexion,{ useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false });

var db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error:'));
db.once('open',function(){});

module.exports={
    mongoose_db: db
}
