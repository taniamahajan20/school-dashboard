import express from 'express';
import { Batch, Student, StudentBatch } from '../../db';

const route = express.Router();

route.get('/', (req, res) => {
    Student.findAll()
        .then((students) => {
            res.status(200).send(students)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Cannot retrieve the students"
            })
        })
})

route.post('/', (req, res) => {
    Student.create({
        name: req.body.name
    })
        .then((student: any) => {
            var batches = req.body.batches.split(',')
            student.setBatches(batches)
                .then((us: any) => {
                    res.status(201).send(us)
                })

        })
        .catch((err) => {
            res.status(500).send({
                error: "Cannot add the student"
            })
        })
})

route.get('/:id', (req, res) => {
    Student.find({ where: { id: req.params.id } })
        .then((student) => {
            res.status(200).send(student)
        })
        .catch((err) => {
            res.status(500).send({
                error: "cannot get the student"
            })
        })
})

route.put('/:id', (req, res) => {
    Student.find({ where: { id: req.params.id } })
        .then((student: any) => {
            //res.status(200).send(student)
            var batches = req.body.batches.split(',')
            student.setBatches(batches)
                .then((us: any) => {
                    res.status(201).send(us)
                })
        })
        .catch((err) => {
            res.status(500).send({
                error: "cannot update the student"
            })
        })
})

route.delete('/:id', (req, res) => {
    Student.destroy(
        { where: { id: req.params.id } }
    )
        .then((student) => {
            res.sendStatus(204);
        })
        .catch((err) => {
            res.status(500).send({
                error: "cannot update the student"
            })
        })
})

route.get('/:id/batches', (req, res) => {
    StudentBatch.findAll(
        {
            attributes: ['batchId'],
            raw: false,
            where: { studentId: req.params.id }
        }

    )
        .then((batchIds: any) => {
            var ids = [];
            for (var i = 0, max = batchIds.length; i < max; i += 1) {

                ids.push(batchIds[i].batchId);

            }

            Batch.findAll({
                where: { id: ids }
            })
                .then((batches) => {
                    res.send(batches)
                })
        })


        .catch((err) => {
            res.send({
                error: err
            })
        })
})
export { route }