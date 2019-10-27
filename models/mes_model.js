const mongoose = require("mongoose");
const dia_model = require("./dia_model.js");

var mes_schema_mongo = new mongoose.Schema({
    num_mes: Number,
    dias: [dia_model.dia_schema_mongo]
});

module.exports={
    mes_model_mongo: mongoose.model("Mes", mes_schema_mongo),
    mes_schema_mongo: mes_schema_mongo
}