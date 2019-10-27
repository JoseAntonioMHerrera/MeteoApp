const mongoose = require("mongoose");
const mes_model = require("./mes_model.js");

var anio_schema_mongo = new mongoose.Schema({
    num_anio: Number,
    meses: [mes_model.mes_schema_mongo]
});

module.exports={
    anio_model_mongo: mongoose.model("Año", anio_schema_mongo),
    anio_schema_mongo: anio_schema_mongo
}