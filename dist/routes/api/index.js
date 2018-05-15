"use strict";
var route = require('express').Router();
route.use('/courses', require('./courses'));
route.use('/batches', require('./batches'));
route.use('/students', require('./students'));
route.use('/subjects', require('./subjects'));
route.use('/teachers', require('./teachers'));
exports = module.exports = {
    route: route
};
