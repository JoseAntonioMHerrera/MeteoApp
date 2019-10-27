const dia_model = require("../models/dia_model.js");
const mes_model = require("../models/mes_model.js");
const ciudad_model = require("../models/ciudad_model.js");
const moongose = require("./db.js");

exports.peticionCiudad = async function(ciudad){
    var ciudad = await ciudad_model.ciudad_model_mongo.findOne({'ciudad':ciudad},{'_id':0}, function(error,ciudad){
        if(error){
            resultado_busqueda = {'error': true, 'value': error};
        }
    });
    return ciudad;
};

exports.peticionAnio = async function(ciudad, num_anio){
    var resultado_busqueda = null;
    await ciudad_model.ciudad_model_mongo.findOne({'ciudad':ciudad}, function(error,ciudad){
        if(error){
            resultado_busqueda = {'error': true, 'value': error};
            return; 
        }
        let i;
        for(i=0; i < ciudad.anios.length; i++){
            if(ciudad.anios[i].num_anio == num_anio){
                resultado_busqueda = ciudad.anios[i];
                return;
            }
        }
    });
    return resultado_busqueda;
};

exports.peticionMes = async function(ciudad, num_anio, num_mes){
    var resultado_busqueda = null;
    await ciudad_model.ciudad_model_mongo.findOne({'ciudad':ciudad}, function(error,ciudad){
        if(error){
            console.log(error);
            resultado_busqueda = {'error': true, 'value': error};
            return; 
        }
        let i;
        for(i=0; i < ciudad.anios.length; i++){
            if(ciudad.anios[i].num_anio == num_anio){
                let j;
                for(j=0; j < ciudad.anios[i].meses.length; j++){
                    if(ciudad.anios[i].meses[j].num_mes == num_mes){
                        resultado_busqueda = ciudad.anios[i].meses[j];
                        return;
                    }
                }
            }
        }
    });
    return resultado_busqueda;
};

exports.peticionDia = async function(ciudad, num_anio, num_mes, num_dia){
    var resultado_busqueda = null;
    await ciudad_model.ciudad_model_mongo.findOne({'ciudad':ciudad}, function(error,ciudad){
        if(error){
            resultado_busqueda = {'error': true, 'value': error};
            return; 
        }
        let i;
        for(i=0; i < ciudad.anios.length; i++){
            if(ciudad.anios[i].num_anio == num_anio){
                let j;
                for(j=0; j < ciudad.anios[i].meses.length; j++){
                    if(ciudad.anios[i].meses[j].num_mes == num_mes){
                        let k;
                        for(k=0; k < ciudad.anios[i].meses[j].dias.length; k++){
                            if(ciudad.anios[i].meses[j].dias[k].num_dia == num_dia){
                                resultado_busqueda = ciudad.anios[i].meses[j].dias[k];
                                return;
                            }
                        }
                    }
                }
            }
        }
    });
    return resultado_busqueda;
};

exports.insertarCiudad = async function(payload){
    var resultado_insercion = {};

    await ciudad_model.ciudad_model_mongo.findOne({"ciudad":payload.ciudad}, "ciudad", async function(err, ciudad){
        if(err){
            return false;
        }else{
            if(ciudad == null){
                var ciudad_creada = await ciudad_model.ciudad_model_mongo.create({
                    ciudad: payload.ciudad,
                    anios: payload.anios
                });
                await ciudad_creada.save(function (erro,resultad) {
                    if (erro){
                        resultado_insercion = {'error': true, 'value':error};
                        return;
                    } 
                }); 
            }else{
                resultado_insercion = {'error':true,'value':"La ciudad proporcionada ya existe."};
                return;
            }
        }
    });

    return resultado_insercion;
};

exports.insertarAnio = async function(payload){
    var resultado_insercion = {};
    console.log("la ciudad es" + payload.ciudad);
    await ciudad_model.ciudad_model_mongo.findOne({"ciudad":payload.ciudad}, async function(err, ciudad){
        if(err){
            return false;
        }else{
            if(ciudad != null){
                let i;
                for(i=0; i < ciudad.anios.length; i++){
                    if(ciudad.anios[i].num_anio == payload.num_anio){
                        resultado_insercion = {'error':true,'value':"Ya existe el año proporcionado."};
                        return;
                    }
                }
                ciudad.anios.push({'num_anio':payload.num_anio, 'meses':payload.meses});
                await ciudad.save(function(error_guardado, resultado){
                    if(error_guardado){
                        resultado_insercion = {'error':true,'value':error_guardado};
                        return;
                    }
                
                });
            }else{
                resultado_insercion = {'error':true,'value':"No existe la ciudad proporcionada."};
                return;
            }
        }
    });

    return resultado_insercion;   
}

exports.insertarMes = async function(payload){
    var resultado_insercion= {};

    await ciudad_model.ciudad_model_mongo.findOne({'ciudad':payload.ciudad}, async function(err, ciudad){
        if(err){
            resultado_insercion = {'error':true,'value': err};
        }else{
            if(ciudad != null){
                let i;
                for(i=0; i < ciudad.anios.length; i++){
                    if(ciudad.anios[i].num_anio == payload.num_anio){
                        existe_anio = true;
                        let j;
                        for(j=0; j < ciudad.anios[i].meses.length; j++){
                            if(ciudad.anios[i].meses[j].num_mes == payload.num_mes){
                                resultado_insercion = {'error':true, 'value':"El mes ya existe."};
                                return resultado_insercion;
                            }
                        }
                        ciudad.anios[i].meses.push({'num_mes': payload.num_mes, "dias": payload.dias});
                        await ciudad.save(function (error_guardado,guardado){
                            if (error_guardado){
                                resultado_insercion = {'error': true, 'value': error_guardado};
                                return;
                            }

                        });
                        return;
                    }
                }
                if(i == ciudad.anios.length){
                    resultado_insercion = {'error':true, 'value': "No existe el año proporcionado."};
                    return;
                }
            }else{
                resultado_insercion = {'error':true,'value':"No existe una ciudad con ese nombre."};
                return;
            }
        }
    });
    return resultado_insercion;
};

exports.insertarDia = async function(payload){
    var resultado_insercion= {};
    await ciudad_model.ciudad_model_mongo.findOne({'ciudad':payload.ciudad}, async function(err, ciudad){
        if(err){
            resultado_insercion = {'error':true,'value': err};
        }else{
            if(ciudad != null){
                let i;
                for(i=0; i < ciudad.anios.length; i++){
                    if(ciudad.anios[i].num_anio == payload.num_anio){
                        existe_anio = true;
                        let j;
                        for(j=0; j < ciudad.anios[i].meses.length; j++){
                            if(ciudad.anios[i].meses[j].num_mes == payload.num_mes){
                                let k;
                                for(k=0; k < ciudad.anios[i].meses[j].dias.length; k++){
                                    if(ciudad.anios[i].meses[j].dias[k].num_dia == payload.num_dia){
                                        resultado_insercion = {'error':true, 'value':"El día ya existe."};
                                        return resultado_insercion;
                                    }
                                }
                                ciudad.anios[i].meses[j].dias.push({'num_dia': payload.num_dia, "temperaturas": payload.temperaturas});
                                await ciudad.save(function (error_guardado,guardado){
                                    if (error_guardado){
                                        resultado_insercion = {'error': true, 'value': error_guardado};
                                        return;
                                    }
                                });
                                return;
                            }
                        }
                        if(j == ciudad.anios[i].meses.length){
                            resultado_insercion = {'error':true, 'value': "No existe el mes proporcionado."};
                            return;
                        }
                    }
                }
                if(i == ciudad.anios.length){
                    resultado_insercion = {'error':true, 'value': "No existe el año proporcionado."};
                    return;
                }
            }else{
                resultado_insercion = {'error':true,'value':"No existe una ciudad con ese nombre."};
                return;
            }
        }
    });
    return resultado_insercion; 
};

exports.actualizarCiudad = async function(payload){
    var resultado_actualizacion = {};
    await ciudad_model.ciudad_model_mongo.findOneAndUpdate({'ciudad': payload.ciudad},payload,{'upsert':true}, function(error, ciudad){
        if(error){
            resultado_actualizacion = {'error':true,'value':error};
        }
    });
    return resultado_actualizacion;
}

exports.actualizarAnio = async function(payload){
    var resultado_actualizacion = {};
    await ciudad_model.ciudad_model_mongo.findOne({'ciudad': payload.ciudad}, async function(error, ciudad){
        if(error){
            resultado_actualizacion = {'error':true,'value':error};
        }
        if(ciudad == null){
            resultado_actualizacion = insertarCiudad({'ciudad':payload.ciudad,'anios':[{'num_anio':payload.num_anio,'meses':payload.meses}]});    
        }else{
            let i,anio_actualizado = false;
            let datos_actualizados = {'num_anio': payload.num_anio, 'meses': payload.meses};

            for(i=0; i < ciudad.anios.length; i++){
                if(ciudad.anios[i].num_anio == payload.num_anio){
                    ciudad.anios[i] = datos_actualizados;
                    anio_actualizado = true;
                    break;
                }
            }
            if(!anio_actualizado){
                ciudad.anios.push(datos_actualizados);
            }
            ciudad.save(function(error, ciudad){
                if(error){
                    resultado_actualizacion = {'error':true,'value':error};
                    return;
                }
            });
        }
    });

    return resultado_actualizacion;   
};

exports.actualizarMes = async function(payload){
    var resultado_actualizacion = {};
    await ciudad_model.ciudad_model_mongo.findOne({'ciudad': payload.ciudad}, async function(error, ciudad){
        if(error){
            resultado_actualizacion = {'error':true,'value':error};
        }
        if(ciudad == null){
            resultado_actualizacion = await insertarCiudad({'ciudad':payload.ciudad,'anios':[{'num_anio':payload.num_anio,'meses':[{'num_mes':payload.num_mes,'dias':payload.dias}]}]});    
        }else{
            let i,anio_actualizado = false;
            let datos_actualizados_anio = {'num_anio': payload.num_anio, 'meses': [{'num_mes':payload.num_mes,'dias':payload.dias}]};
            for(i=0; i < ciudad.anios.length; i++){
                if(ciudad.anios[i].num_anio == payload.num_anio){
                    anio_actualizado = true;
                    let j,mes_actualizado = false;
                    let datos_actualizados_mes = {'num_mes': payload.num_mes, 'dias': payload.dias};
                    for(j=0; j < ciudad.anios[i].meses.length; j++){
                        if(ciudad.anios[i].meses[j].num_mes == payload.num_mes){
                            ciudad.anios[i].meses[j] = datos_actualizados_mes;
                            mes_actualizado= true; 
                        }
                    }
                    if(!mes_actualizado){
                        ciudad.anios[i].meses.push(datos_actualizados_mes);
                    }
                }
            }
            if(!anio_actualizado){
                ciudad.anios.push(datos_actualizados_anio);
            }
            await ciudad.save(async function(error, ciudad){
                if(error){
                    resultado_actualizacion = {'error':true,'value':error};
                    return;
                }
            });
        }
    });

    return resultado_actualizacion;           
};

exports.actualizarDia = async function(payload){
    var resultado_actualizacion = {};
    await ciudad_model.ciudad_model_mongo.findOne({'ciudad': payload.ciudad}, async function(error, ciudad){
        if(error){
            resultado_actualizacion = {'error':true,'value':error};
        }
        if(ciudad == null){
            resultado_actualizacion = await insertarCiudad({'ciudad':payload.ciudad,'anios':[{'num_anio':payload.num_anio,'meses':[{'num_mes':payload.num_mes,'dias':[{'num_dia':payload.num_dia,'temperaturas':payload.temperaturas}]}]}]});    
        }else{
            let i,anio_actualizado = false;
            for(i=0; i < ciudad.anios.length; i++){
                if(ciudad.anios[i].num_anio == payload.num_anio){
                    anio_actualizado = true;
                    let j,mes_actualizado = false;
                    for(j=0; j < ciudad.anios[i].meses.length; j++){
                        if(ciudad.anios[i].meses[j].num_mes == payload.num_mes){
                            mes_actualizado= true; 
                            let k, dia_actualizado = false;
                            let datos_actualizados_dia = {'num_dia':payload.num_dia,'temperaturas':payload.temperaturas};
                            for(k=0; k < ciudad.anios[i].meses[j].dias.length; k++){
                                if(ciudad.anios[i].meses[j].dias[k] == payload.num_dia){
                                    ciudad.anios[i].meses[j].dias[k] = datos_actualizados_dia;
                                    dia_actualizado = true;
                                }
                            }
                            if(!dia_actualizado){
                                ciudad.anios[i].meses[j].dias.push(datos_actualizados_dia);
                            }
                        }
                    }
                    if(!mes_actualizado){
                        let datos_actualizados_mes = {'num_mes': payload.num_anio, 'dias': [{'num_dia':payload.num_dia,'temperaturas':payload.temperaturas}]};
                        ciudad.anios[i].meses.push(datos_actualizados_mes);
                    }
                }
            }
            if(!anio_actualizado){
                let datos_actualizados_anio = {'num_anio': payload.num_anio, 'meses': [{'num_mes':payload.num_mes,'dias':payload.dias}]};
                ciudad.anios.push(datos_actualizados_anio);
            }
            await ciudad.save(async function(error, ciudad){
                if(error){
                    resultado_actualizacion = {'error':true,'value':error};
                    return;
                }
            });
        }
    });

    return resultado_actualizacion;
};

exports.eliminarCiudad = async function(ciudad){
    var resultado_eliminacion = {};
    await ciudad_model.ciudad_model_mongo.findOne({'ciudad': ciudad}, async function(error, ciudad){
        if(error){
            resultado_eliminacion = {'error':true,'value':error};
        }else{
            if(ciudad != null){
                await ciudad.remove(async function(error,eliminado){
                    if(error)
                        resultado_eliminacion = {'error':true,'value':error};
                });
            }else{
                resultado_eliminacion = {'error':true,'value':"La ciudad proporcionada no existe."}
            }
        }
    });
    return resultado_eliminacion;
}

exports.eliminarAnio = async function(ciudad,num_anio){
    var resultado_eliminacion = {};
    await ciudad_model.ciudad_model_mongo.findOne({'ciudad': ciudad}, async function(error, ciudad){
        if(error){
            resultado_eliminacion = {'error':true,'value':error};
        }else{
            if(ciudad != null){
                let i, anio_eliminado = false;
                for(i=0; i < ciudad.anios.length; i++){
                    if(ciudad.anios[i].num_anio == num_anio){
                        ciudad.anios.splice(i,1);
                        anio_eliminado = true;
                        await ciudad.save( async function(error, guardado){
                            if(error){
                                resultado_eliminacion = {'error':true,'value':error};
                            }
                        });
                    }
                }
                if(!anio_eliminado){
                    resultado_eliminacion = {'error':true,'value':"El año proporcionado no existe."}                    
                }
            }else{
                resultado_eliminacion = {'error':true,'value':"La ciudad proporcionada no existe."}
            }
        }
    });
    return resultado_eliminacion;
};

exports.eliminarMes = async function(ciudad, num_anio, num_mes){
    var resultado_eliminacion = {};
    await ciudad_model.ciudad_model_mongo.findOne({'ciudad': ciudad}, async function(error, ciudad){
        if(error){
            resultado_eliminacion = {'error':true,'value':error};
        }else{
            if(ciudad != null){
                let i, anio_encontrado = false;
                for(i=0; i < ciudad.anios.length; i++){
                    if(ciudad.anios[i].num_anio == num_anio){
                        anio_encontrado = true;
                        let j, mes_eliminado = false;
                        for(j=0; j < ciudad.anios[i].meses.length; j++){
                            if(ciudad.anios[i].meses[j].num_mes == num_mes){
                                ciudad.anios[i].meses.splice(j,1);
                                mes_eliminado = true;
                                await ciudad.save(async function(error, guardado){
                                    if(error){
                                        resultado_eliminacion = {'error':true,'value':error};
                                    }
                                });
                            }
                        }
                        if(!mes_eliminado){
                            resultado_eliminacion = {'error':true,'value':"El mes proporcionado no existe."}
                        }
                    }
                }
                if(!anio_encontrado){
                    resultado_eliminacion = {'error':true,'value':"El año proporcionado no existe."}                    
                }
            }else{
                resultado_eliminacion = {'error':true,'value':"La ciudad proporcionada no existe."}
            }
        }
    });
    return resultado_eliminacion;      
};

exports.eliminarDia = async function(ciudad,num_anio,num_mes,num_dia){
    var resultado_eliminacion = {};
    await ciudad_model.ciudad_model_mongo.findOne({'ciudad': ciudad}, async function(error, ciudad){
        if(error){
            resultado_eliminacion = {'error':true,'value':error};
        }else{
            if(ciudad != null){
                let i, anio_encontrado = false;
                for(i=0; i < ciudad.anios.length; i++){
                    if(ciudad.anios[i].num_anio == num_anio){
                        anio_encontrado = true;
                        let j, mes_encontrado = false;
                        for(j=0; j < ciudad.anios[i].meses.length; j++){
                            if(ciudad.anios[i].meses[j].num_mes == num_mes){
                                mes_encontrado = true;
                                let k, dia_eliminado = false;
                                for(k=0; k < ciudad.anios[i].meses[j].dias.length; k++){
                                    if(ciudad.anios[i].meses[j].dias[k].num_dia == num_dia){
                                        ciudad.anios[i].meses[j].dias.splice(k,1);
                                        dia_eliminado = true;
                                        await ciudad.save(async function(error,guardado){
                                            if(error){
                                                resultado_eliminacion = {'error':true,'value':error}; 
                                            }
                                        });
                                        return;
                                    }
                                }
                                if(!dia_eliminado){
                                    resultado_eliminacion = {'error':true,'value':"El día proporcionado no existe."}
                                    return;
                                }
                            }
                        }
                        if(!mes_encontrado){
                            resultado_eliminacion = {'error':true,'value':"El mes proporcionado no existe."}
                            return;                      
                        }
                    }
                }
                if(!anio_encontrado){
                    resultado_eliminacion = {'error':true,'value':"El año proporcionado no existe."}
                    return;                    
                }
            }else{
                resultado_eliminacion = {'error':true,'value':"La ciudad proporcionada no existe."}
                return;
            }
        }
    });
    return resultado_eliminacion;
};

