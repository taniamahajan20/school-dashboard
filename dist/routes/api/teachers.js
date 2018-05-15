"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = require("../../db");
var route = express_1.default.Router();
exports.route = route;
route.get('/', function (req, res) {
    db_1.Teacher.findAll()
        .then(function (teachers) {
        res.status(200).send(teachers);
    })
        .catch(function (err) {
        res.status(500).send({
            error: "Cannot rerieve the teachers"
        });
    });
});
route.post('/', function (req, res) {
    db_1.Teacher.create({
        name: req.body.name,
        subjectId: req.body.subjectId
    })
        .then(function (teacher) {
        res.status(201).send(teacher);
    })
        .catch(function (err) {
        res.send({
            error: "cannot add the teacher"
        });
    });
});
route.get('/:id', function (req, res) {
    db_1.Teacher.find({
        where: { id: req.params.id }
    })
        .then(function (teacher) {
        res.status(200).send(teacher);
    })
        .catch(function (err) {
        res.send({
            error: "Cannit get the teacher"
        });
    });
});
route.delete('/:id', function (req, res) {
    db_1.Teacher.destroy({
        where: { id: req.params.id }
    })
        .then(function (teacher) {
        res.sendStatus(200);
    })
        .catch(function (err) {
        res.send({
            error: "Cannit delete the teacher"
        });
    });
});
route.get('/:id/batches', function (req, res) {
    db_1.Lecture.findAll({
        attributes: ['batchId'],
        raw: false,
        where: { teacherId: req.params.id }
    })
        .then(function (batchIds) {
        //res.send(studentIds)
        var ids = [];
        for (var i = 0, max = batchIds.length; i < max; i += 1) {
            ids.push(batchIds[i].batchId);
        }
        db_1.Batch.findAll({
            where: { id: ids }
        })
            .then(function (batches) {
            res.send(batches);
        });
    })
        .catch(function (err) {
        res.send({
            error: "cannot retrieve the Batches"
        });
    });
});
