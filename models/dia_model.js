const mongoose = require("mongoose");

var dia_schema_mongo = new mongoose.Schema({
    num_dia: Number,
    temperaturas: {
        hora_08: Number,
        hora_14: Number,
        hora_21: Number
    }
});

module.exports={
    dia_model_mongo: mongoose.model("Dia", dia_schema_mongo),
    dia_schema_mongo: dia_schema_mongo
}