"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = require("../../db");
var route = express_1.default.Router();
exports.route = route;
// const route = require('express').Router();
// const Batch = require('../../db').Batch
route.get('/', function (req, res) {
    db_1.Batch.findAll()
        .then(function (batches) {
        res.send(batches);
    })
        .error(function (err) {
        res.send({
            error: "cannot retrieve batches"
        });
    });
});
route.post('/', function (req, res) {
    db_1.Batch.create({
        name: req.body.name,
        courseId: req.body.courseId
    })
        .then(function (batch) {
        res.send(batch);
    });
});
