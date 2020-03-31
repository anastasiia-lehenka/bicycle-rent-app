const express = require('express');
const router = express.Router();
const Joi = require('joi');
let bicycles = require('../model');

router.get('/', (req, res) => res.send(bicycles));

router.delete('/:id', (req, res) => {
    const bicycleItem = bicycles.find(item => item.id === parseInt(req.params.id));

    if (!bicycleItem) {
        return res.status(404).send('The bicycle with given id was not found');
    }
    bicycles = bicycles.filter(item => item.id !== parseInt(req.params.id));
    res.send();
});

router.post('/', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required(),
        type: Joi.string().min(3).required(),
        price: Joi.number().required(),
        rented: Joi.boolean()
    };
    const bicycle = {
        id: bicycles.length + 1,
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        rented: req.body.rented
    };
    const validationError = Joi.validate(req.body, schema).error;

    if (validationError) {
        return res.status(400).send(validationError.details[0].message);
    }

    bicycles.push(bicycle);
    res.send(bicycle);
});

router.patch('/:id', (req, res) => {
    const schema = {
        rented: Joi.boolean().required()
    };
    const validationError = Joi.validate(req.body, schema).error;
    const bicycleItem = bicycles.find(item => item.id === parseInt(req.params.id));

    if (validationError) {
        return res.status(400).send(validationError.details[0].message);
    }
    if (!bicycleItem) {
        return res.status(404).send('The bicycle with given id was not found');
    }

    bicycleItem.rented = req.body.rented;
    res.send(bicycleItem);
});

module.exports = router;