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
    db_1.Course.findAll()
        .then(function (courses) {
        res.status(200).send(courses);
    })
        .catch(function (err) {
        res.status(500).send({
            error: "Could not retrieve courses"
        });
    });
});
route.post('/', function (req, res) {
    db_1.Course.create({
        name: req.body.name
    })
        .then(function (course) {
        res.status(201).send(course);
    })
        .catch(function (err) {
        res.status(500).send({
            error: "Could not add the course"
        });
    });
});
route.get('/:id', function (req, res) {
    db_1.Course.find({
        where: {
            id: req.params.id
        }
    })
        .then(function (course) {
        res.status(200).send(course);
    })
        .catch(function (err) {
        res.send(err);
    });
});
route.put('/:id', function (req, res) {
    db_1.Course.update({
        name: req.body.name,
    }, { where: { id: req.params.id } })
        .then(function (course) {
        res.send(course);
    })
        .catch(function (err) {
        res.send({
            error: "Cannot be updated"
        });
    });
});
route.delete('/:id', function (req, res) {
    db_1.Course.destroy({ where: { id: req.params.id } })
        .then(function (course) {
        res.sendStatus(200);
    })
        .catch(function (err) {
        res.send({
            error: "Can not delete the course"
        });
    });
});
route.get('/:id/batches', function (req, res) {
    db_1.Batch.findAll({
        where: { courseId: req.params.id }
    })
        .then(function (batches) {
        res.status(200).send(batches);
    })
        .catch(function (err) {
        res.send({
            error: "cannot retrieve batches"
        });
    });
});
route.post('/:id/batches', function (req, res) {
    db_1.Batch.create({
        name: req.body.name,
        courseId: req.params.id,
        startDate: req.body.startDate
    })
        .then(function (batch) {
        res.send(batch);
    })
        .catch(function (err) {
        res.send({
            error: "cannot add the batch"
        });
    });
});
route.get('/:id/batches/:batchid', function (req, res) {
    db_1.Batch.find({
        where: { id: req.params.batchid }
    })
        .then(function (batch) {
        res.send(batch);
    })
        .catch(function (err) {
        res.send({
            error: "cannot retrieve the batch"
        });
    });
});
route.put('/:id/batches/:batchid', function (req, res) {
    db_1.Batch.update({ name: req.body.name }, {
        where: { id: req.params.batchid }
    })
        .then(function (batch) {
        res.send(batch);
    })
        .catch(function (err) {
        res.send({
            error: "cannot update the batch"
        });
    });
});
route.delete('/:id/batches/:batchid', function (req, res) {
    db_1.Batch.destroy({
        where: { id: req.params.batchid }
    })
        .then(function (batch) {
        res.sendStatus(200);
    })
        .catch(function (err) {
        res.send({
            error: "cannot delete the batch"
        });
    });
});
route.get('/:id/batches/:batchid/lectures', function (req, res) {
    db_1.Lecture.findAll({
        where: { batchId: req.params.batchid }
    })
        .then(function (lectures) {
        res.status(200).send(lectures);
    })
        .catch(function (err) {
        res.status(500).send({
            error: "cannot retrieve the lectures"
        });
    });
});
route.post('/:id/batches/:batchid/lectures', function (req, res) {
    db_1.Lecture.create({
        name: req.body.name,
        batchId: req.params.batchid,
        teacherId: req.body.teacherId
    })
        .then(function (lecture) {
        res.status(200).send(lecture);
    })
        .catch(function (err) {
        res.status(500).send({
            error: err
        });
    });
});
route.get('/:id/batches/:batchid/lectures/:lecid', function (req, res) {
    db_1.Lecture.find({
        where: { id: req.params.lecid }
    })
        .then(function (lecture) {
        res.status(200).send(lecture);
    })
        .catch(function (err) {
        res.status(500).send({
            error: "cannot retrieve the lecture"
        });
    });
});
route.put('/:id/batches/:batchid/lectures/:lecid', function (req, res) {
    db_1.Lecture.update({ teacherId: req.body.teacherId }, {
        where: { id: req.params.lecid }
    })
        .then(function (lecture) {
        res.status(200).send(lecture);
    })
        .catch(function (err) {
        res.status(500).send({
            error: "cannot update the lecture"
        });
    });
});
route.delete('/:id/batches/:batchid/lectures/:lecid', function (req, res) {
    db_1.Lecture.destroy({
        where: { id: req.params.lecid }
    })
        .then(function () {
        res.sendStatus(200);
    })
        .catch(function (err) {
        res.status(500).send({
            error: "cannot delete the lecture"
        });
    });
});
route.get('/:id/batches/:batchid/students', function (req, res) {
    db_1.StudentBatch.findAll({
        attributes: ['studentId'],
        raw: false,
        where: { batchId: req.params.batchid }
    })
        .then(function (studentIds) {
        //res.send(studentIds)
        var ids = [];
        for (var i = 0, max = studentIds.length; i < max; i += 1) {
            ids.push(studentIds[i].studentId);
        }
        db_1.Student.findAll({
            where: { id: ids }
        })
            .then(function (students) {
            res.send(students);
        });
    })
        .catch(function (err) {
        res.send({
            error: "cannot retrieve the students"
        });
    });
});
route.post('/:id/batches/:batchid/students', function (req, res) {
    db_1.StudentBatch.create({
        studentId: req.body.studentId,
        batchId: req.params.batchid
    })
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        res.send({
            error: err
        });
    });
    // StudentBatch.Crea(
    //     {
    //         attributes: ['studentId'],
    //         raw: false,
    //         where: { batchId: req.params.batchid }
    //     })
    //     .then((studentIds:any) => {
    //         //res.send(studentIds)
    //         var ids = [];
    //         for (var i = 0, max = studentIds.length; i < max; i += 1) {
    //             ids.push(studentIds[i].studentId);
    //         }
    //         Student.findAll({
    //             where: { id: ids }
    //         })
    //             .then((students) => {
    //                 res.send(students)
    //             })
    //     })
    //     .catch((err) => {
    //         res.send({
    //             error: "cannot retrieve the students"
    //         })
    //     })
});
route.get('/:id/batches/:batchid/teachers', function (req, res) {
    db_1.Lecture.findAll({
        attributes: ['teacherId'],
        raw: false,
        where: { batchId: req.params.batchid }
    })
        .then(function (teacherIds) {
        //res.send(studentIds)
        var ids = [];
        for (var i = 0, max = teacherIds.length; i < max; i += 1) {
            ids.push(teacherIds[i].teacherId);
        }
        db_1.Teacher.findAll({
            where: { id: ids }
        })
            .then(function (teachers) {
            res.send(teachers);
        });
    })
        .catch(function (err) {
        res.send({
            error: "cannot retrieve the teachers"
        });
    });
});
