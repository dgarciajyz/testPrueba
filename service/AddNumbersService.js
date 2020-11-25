'use strict';


/**
 * Devuelve todos los datos relacionados con el historico de suma numeros
 * Devuelve todos los datos relacionados con el historico de numeros
 *

 * returns String
 **/
module.exports.getAddNumbers = function(req, res, next) {
    //Parameters
    console.log(req);
    res.send({
        message: 'This is the mockup controller for getAddNumbers'
    });
};


/**
 * Registra un nuevo conjunto de datos para sumar numeros
 * Creacion de nuevos datos asociados a la calidad del aire.
 *
 * number Number 

 * returns String
 **/
module.exports.postNumbers = function(req, res, next) {
    //Parameters
    console.log(req);
    for(var attributename in req){
        console.log(attributename+": "+myobject[attributename]);
    }
    res.send({
        message: 'This is the mockup controller for postNumbers'
    });
};




