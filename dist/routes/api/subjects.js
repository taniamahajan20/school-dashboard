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
    db_1.Subject.findAll()
        .then(function (subjects) {
        res.status(200).send(subjects);
    })
        .catch(function (err) {
        res.send({
            error: "Cannot retrieve subjects"
        });
    });
});
route.post('/', function (req, res) {
    db_1.Subject.create({
        name: req.body.name,
        courseId: req.body.courseId
    })
        .then(function (subject) {
        res.status(201).send(subject);
    })
        .catch(function (err) {
        res.status(500).send({
            error: "Cannot add the subject"
        });
    });
});
route.get('/:id', function (req, res) {
    db_1.Subject.find({ where: { id: req.params.id } })
        .then(function (subject) { return res.send(subject); })
        .catch(function (err) {
        res.send({
            error: "cannot find the subject"
        });
    });
});
route.delete('/:id', function (req, res) {
    db_1.Subject.destroy({ where: { id: req.params.id } })
        .then(function () {
        res.sendStatus(200);
    })
        .catch(function (err) {
        res.send({
            error: "the subject cannot be deleted"
        });
    });
});
route.get('/:id/teachers', function (req, res) {
    db_1.Teacher.findAll({
        where: { subjectId: req.params.id }
    })
        .then(function (teachers) {
        res.status(200).send(teachers);
    })
        .catch(function (err) {
        res.send("cannot retrieve the teachers");
    });
});
