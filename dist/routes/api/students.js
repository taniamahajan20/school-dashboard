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
    db_1.Student.findAll()
        .then(function (students) {
        res.status(200).send(students);
    })
        .catch(function (err) {
        res.status(500).send({
            error: "Cannot retrieve the students"
        });
    });
});
route.post('/', function (req, res) {
    db_1.Student.create({
        name: req.body.name
    })
        .then(function (student) {
        var batches = req.body.batches.split(',');
        student.setBatches(batches)
            .then(function (us) {
            res.status(201).send(us);
        });
    })
        .catch(function (err) {
        res.status(500).send({
            error: "Cannot add the student"
        });
    });
});
route.get('/:id', function (req, res) {
    db_1.Student.find({ where: { id: req.params.id } })
        .then(function (student) {
        res.status(200).send(student);
    })
        .catch(function (err) {
        res.status(500).send({
            error: "cannot get the student"
        });
    });
});
route.put('/:id', function (req, res) {
    db_1.Student.find({ where: { id: req.params.id } })
        .then(function (student) {
        //res.status(200).send(student)
        var batches = req.body.batches.split(',');
        student.setBatches(batches)
            .then(function (us) {
            res.status(201).send(us);
        });
    })
        .catch(function (err) {
        res.status(500).send({
            error: "cannot update the student"
        });
    });
});
route.delete('/:id', function (req, res) {
    db_1.Student.destroy({ where: { id: req.params.id } })
        .then(function (student) {
        res.sendStatus(204);
    })
        .catch(function (err) {
        res.status(500).send({
            error: "cannot update the student"
        });
    });
});
route.get('/:id/batches', function (req, res) {
    db_1.StudentBatch.findAll({
        attributes: ['batchId'],
        raw: false,
        where: { studentId: req.params.id }
    })
        .then(function (batchIds) {
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
            error: err
        });
    });
});
