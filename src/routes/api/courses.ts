import express from 'express';
import { Batch,Course,Lecture,Student,Teacher,StudentBatch } from '../../db';
const route = express.Router()

route.get('/', (req, res) => {
    Course.findAll()
        .then((courses) => {
            res.status(200).send(courses)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve courses"
            })
        })
})

route.post('/', (req, res) => {
    Course.create({
        name: req.body.name
    })
        .then((course) => {
            res.status(201).send(course)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not add the course"
            })
        })
})

route.get('/:id', (req, res) => {
    Course.find({
        where: {
            id: req.params.id
        }
    })
        .then((course) => {
            res.status(200).send(course)
        })
        .catch((err) => {
            res.send(err)
        })
})

route.put('/:id', (req, res) => {
    Course.update({
        name: req.body.name,
    },
        { where: { id: req.params.id } }
    )
        .then((course) => {
            res.send(course)
        })
        .catch((err) => {
            res.send({
                error: "Cannot be updated"
            })
        })
})

route.delete('/:id', (req, res) => {
    Course.destroy({ where: { id: req.params.id } })
        .then((course) => {
            res.sendStatus(200)
        })
        .catch((err) => {
            res.send({
                error: "Can not delete the course"
            })
        })
})

route.get('/:id/batches', (req, res) => {
    Batch.findAll({
        where: { courseId: req.params.id }
    })
        .then((batches) => {
            res.status(200).send(batches)
        })
        .catch((err) => {
            res.send({
                error: "cannot retrieve batches"
            })
        })
})

route.post('/:id/batches', (req, res) => {
    Batch.create({
        name: req.body.name,
        courseId: req.params.id,
        startDate:req.body.startDate
    })
        .then((batch) => {
            res.send(batch)
        })
        .catch((err) => {
            res.send({
                error: "cannot add the batch"
            })
        })
})

route.get('/:id/batches/:batchid', (req, res) => {
    Batch.find({
        where: { id: req.params.batchid }
    })
        .then((batch) => {
            res.send(batch)
        })
        .catch((err) => {
            res.send({
                error: "cannot retrieve the batch"
            })
        })
})

route.put('/:id/batches/:batchid', (req, res) => {
    Batch.update(
        { name: req.body.name },
        {
            where: { id: req.params.batchid }
        })
        .then((batch) => {
            res.send(batch)
        })
        .catch((err) => {
            res.send({
                error: "cannot update the batch"
            })
        })
})

route.delete('/:id/batches/:batchid', (req, res) => {
    Batch.destroy(
        {
            where: { id: req.params.batchid }
        })
        .then((batch) => {
            res.sendStatus(200)
        })
        .catch((err) => {
            res.send({
                error: "cannot delete the batch"
            })
        })
})

route.get('/:id/batches/:batchid/lectures', (req, res) => {
    Lecture.findAll({
        where: { batchId: req.params.batchid }
    })
        .then((lectures) => {
            res.status(200).send(lectures)
        })
        .catch((err) => {
            res.status(500).send({
                error: "cannot retrieve the lectures"
            })
        })
})

route.post('/:id/batches/:batchid/lectures', (req, res) => {
    Lecture.create({
        name: req.body.name,
        batchId: req.params.batchid,
        teacherId: req.body.teacherId
    })
        .then((lecture) => {
            res.status(200).send(lecture)
        })
        .catch((err) => {
            res.status(500).send({
                error: err
            })
        })
})

route.get('/:id/batches/:batchid/lectures/:lecid', (req, res) => {
    Lecture.find({
        where: { id: req.params.lecid }
    })
        .then((lecture) => {
            res.status(200).send(lecture)
        })
        .catch((err) => {
            res.status(500).send({
                error: "cannot retrieve the lecture"
            })
        })
})

route.put('/:id/batches/:batchid/lectures/:lecid', (req, res) => {
    Lecture.update(
        { teacherId: req.body.teacherId },
        {
            where: { id: req.params.lecid }
        })
        .then((lecture) => {
            res.status(200).send(lecture)
        })
        .catch((err) => {
            res.status(500).send({
                error: "cannot update the lecture"
            })
        })
})

route.delete('/:id/batches/:batchid/lectures/:lecid', (req, res) => {
    Lecture.destroy({
        where: { id: req.params.lecid }
    })
        .then(() => {
            res.sendStatus(200)
        })
        .catch((err) => {
            res.status(500).send({
                error: "cannot delete the lecture"
            })
        })
})

route.get('/:id/batches/:batchid/students', (req:any, res) => {
    StudentBatch.findAll(
        {
            attributes: ['studentId'],
            raw: false,
            where: { batchId: req.params.batchid }
        })
        .then((studentIds:any) => {
            //res.send(studentIds)
            var ids = [];
            for (var i = 0, max = studentIds.length; i < max; i += 1) {

                ids.push(studentIds[i].studentId);

            }

            Student.findAll({
                where: { id: ids }
            })
                .then((students) => {
                    res.send(students)
                })

        })
        .catch((err) => {
            res.send({
                error: "cannot retrieve the students"
            })
        })
})

route.post('/:id/batches/:batchid/students', (req:any, res) => {
    StudentBatch.create({
        studentId:req.body.studentId,
        batchId:req.params.batchid
    })
    .then((data:any)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.send({
            error:err
        })
    })
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
})

route.get('/:id/batches/:batchid/teachers', (req:any, res:any) => {
    Lecture.findAll(
        {
            attributes: ['teacherId'],
            raw: false,
            where: { batchId: req.params.batchid }
        })
        .then((teacherIds:any) => {
            //res.send(studentIds)
            var ids = [];
            for (var i = 0, max = teacherIds.length; i < max; i += 1) {

                ids.push(teacherIds[i].teacherId);

            }

            Teacher.findAll({
                where: { id: ids }
            })
                .then((teachers) => {
                    res.send(teachers)
                })

        })
        .catch((err) => {
            res.send({
                error: "cannot retrieve the teachers"
            })
        })
})
export {
    route}
    ;