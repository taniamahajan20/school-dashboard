import express from 'express';
import { Batch } from '../../db';
const route = express.Router();
// const route = require('express').Router();
// const Batch = require('../../db').Batch

route.get('/',(req,res)=>{
    Batch.findAll()
    .then((batches)=>{
        res.send(batches)
    })
    .error((err)=>{
        res.send({
            error:"cannot retrieve batches"
        })
    })
})

route.post('/',(req,res)=>{
    Batch.create({
        name:req.body.name,
        courseId:req.body.courseId
    })
    .then((batch)=>{
        res.send(batch)
    })
})

export {
    route
}