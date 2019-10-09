const Joi = require("@hapi/joi");
const dia = require("./dia-schema");
const mes = require("./mes-schema")
const ciudad = require("./ciudad-schema");

exports.peticionGETCiudad = function(nombre_ciudad, anio){
    
    temperaturas_ciudad = {
        "ciudad": "Granada",
        "anio": "2019",
        "meses":[
            {
                "8":{
                    "dias": [
                        {
                            "num_dia": "1",
                            "temperaturas": {
                                "hora_08":"14",
                                "hora_14":"22",
                                "hora_21":"17"
                            }
                        },
                        {
                            "num_dia": "2",
                            "temperaturas": {
                                "hora_08":"14",
                                "hora_14":"22",
                                "hora_21":"17"
                            }
                        }
                    ]
                }
            },
            {
                "9":{
                    "dias": [
                        {
                            "num_dia": "23",
                            "temperaturas": {
                                "hora_08":"14",
                                "hora_14":"22",
                                "hora_21":"17"
                            }
                        },
                        {
                            "num_dia": "24",
                            "temperaturas": {
                                "hora_08":"14",
                                "hora_14":"22",
                                "hora_21":"17"
                            }
                        }
                    ]
                }
            }
        ]
    };
    


    return JSON.stringify(temperaturas_ciudad);
};

exports.peticionGETMes = function(ciudad, anio, mes){

    temperaturas_ciudad_mes = {
        "ciudad": "Granada",
        "anio": "2019",
        "mes": "5",
        "dias": [
            {   
                "num_dia":"2",
                "temperaturas":
                {
                    "hora_08":"14",
                    "hora_14":"22",
                    "hora_21":"17"
                }
            },
            {
                "num_dia":"3",
                "temperaturas":
                {
                    "hora_08":"14",
                    "hora_14":"22",
                    "hora_21":"17"
                }
            },
            {   
                "num_dia":"4",
                "temperaturas":
                {
                    "hora_08":"14",
                    "hora_14":"22",
                    "hora_21":"17"
                }
            }
        ]
    };

    return JSON.stringify(temperaturas_ciudad_mes);
};

exports.peticionGETDia = function(ciudad, anio, mes, dia){
    
    temperaturas_ciudad_dia = {
        "ciudad": "Granada",
        "anio": "2019",
        "mes": "5",
        "dias":
        {
            "num_dia":"2",
            "temperaturas":
            {
                "hora_08":"14",
                "hora_14":"22",
                "hora_21":"17"
            }
        }
    };

    return JSON.stringify(temperaturas_ciudad_dia);

};

exports.peticionPOSTCiudad = function(payload){
    let response = ciudad.ciudad_schema.validate(payload);
    return response;
};

exports.peticionPOSTMes = function(payload){
    let response = mes.mes_schema.validate(payload);
    return response;
};

exports.peticionPOSTDia = function(payload){
    let response = dia.dia_peticionschema.validate(payload);
    return response;        
}
