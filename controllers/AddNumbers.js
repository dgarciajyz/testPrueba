




'use strict';

var AddNumbers = require('../service/AddNumbersService');

module.exports.getAddNumbers = function getAddNumbers (req, res, next) {

    AddNumbers.getAddNumbers(req.swagger.params, res, next);

};

module.exports.postNumbers = function postNumbers (req, res, next) {

    AddNumbers.postNumbers(req.swagger.params, res, next);

};
