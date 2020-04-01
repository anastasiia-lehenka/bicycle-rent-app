const express = require('express');
const router = express.Router();
const Joi = require('joi');
let Bicycle = require('../model/Bicycle');

router.get('/', async (req, res) => {
    const bicyclesList = await Bicycle.find();
    res.send(bicyclesList)
});

router.delete('/:id', async (req, res) => {
    await Bicycle.findByIdAndDelete(req.params.id);
    res.send();
});

router.post('/', async (req, res) => {
    const schema = {
        name: Joi.string().min(3).required(),
        type: Joi.string().min(3).required(),
        price: Joi.number().required(),
        rented: Joi.boolean()
    };
    const newBicycle = {
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        rented: req.body.rented
    };

    const validationError = Joi.validate(req.body, schema).error;
    if (validationError) {
        return res.status(400).send(validationError.details[0].message);
    }

    const bicycleItem = await Bicycle.create(newBicycle);
    res.send(bicycleItem);
});

router.patch('/:id', async (req, res) => {
    const schema = {
        rented: Joi.boolean().required()
    };
    const validationError = Joi.validate(req.body, schema).error;
    if (validationError) {
        return res.status(400).send(validationError.details[0].message);
    }

    const bicycleItem = await Bicycle.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send(bicycleItem);
});

module.exports = router;
