const Joi = require("@hapi/joi");
const dia = require("./dia-schema");
const mes = require("./mes-schema")
const ciudad = require("./ciudad-schema");

exports.peticionGETCiudad = function(nombre_ciudad, anio){
    temperaturas_ciudad = {
        "ciudad": "Granada",
        "anio": "2019",
        "meses":[{
            "8":[{
                "dias": [{
                    "1":[{
                        "08":"14",
                        "14":"22",
                        "21":"17"
                    }]
                }]
            }]
        }]
    };

    return temperaturas_ciudad;
};

exports.peticionGETMes = function(ciudad, anio, mes){
    temperaturas_ciudad_mes = {
        "ciudad": "Granada",
        "anio": "2019",
        "mes": "5",
        "dias": [{
            "8":[{
                "08":"14",
                "14":"22",
                "21":"17"
            }],
            "9":[{
                "08":"16",
                "14":"26",
                "21":"20"
            }],
            "1":[{
                "08":"12",
                "14":"23",
                "21":"16"
            }]
        }]
    };
    return JSON.stringify(temperaturas_ciudad_mes);
};

exports.peticionGETDia = function(ciudad, anio, mes, dia){
    temperaturas_ciudad_dia = {
        "ciudad": "Granada",
        "anio": "2019",
        "mes": "5",
        "dias": [{
            "8":[{
                "08":"14",
                "14":"22",
                "21":"17"
            }]
        }]
    };

    return JSON.stringify(temperaturas_ciudad_dia);

};

exports.peticionPOSTCiudad = function(payload){
    let response = Joi.validate(payload,ciudad.ciudad_schema);
    return (response ? false : true);
};

exports.peticionPOSTMes = function(payload){
    let response = Joi.validate(payload,mes.mes_schema);
    return (response ? false : true);
};

exports.peticionPOSTDia = function(payload){
    let response = Joi.validate(payload,dia.dia_schema);
    return (response ? false : true);        
}
