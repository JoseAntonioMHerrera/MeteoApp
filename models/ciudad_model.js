const mongoose = require("mongoose");
const anio_model = require("./anio_model.js");

var ciudad_schema_mongo = new mongoose.Schema({
    ciudad: String,
    anios: [anio_model.anio_schema_mongo]
});

module.exports={
    ciudad_model_mongo: mongoose.model("Ciudad", ciudad_schema_mongo, "ciudades")
}