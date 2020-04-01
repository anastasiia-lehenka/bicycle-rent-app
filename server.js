const express = require('express');
const mongoose = require('mongoose');
const router = require ('./routes');
const Bicycle = require('./model/Bicycle');

const app = express();

app.use(express.json());
app.use('/api/bicycles', router);

mongoose.connect('mongodb://localhost:27017/bicycleRent',{ useNewUrlParser: true,  useUnifiedTopology: true }, error => {
    init();

    const PORT = process.env.PORT || 5000;
    if(error) return console.log(error);
    app.listen(PORT, () => { console.log(`App has been started on port ${PORT}...`) });
});

init = () => {
    const bicycles = [
        {
            id: 1,
            name: 'Superfast bicycle1',
            type: 'Mountain',
            price: 12,
            rented: true
        },
        {
            id: 2,
            name: 'Superfast bicycle',
            type: 'Road',
            price: 13.99,
            rented: false
        },
        {
            id: 3,
            name: 'Superfast bicycle',
            type: 'Mountain',
            price: 11.5,
            rented: false
        }
    ];

    Bicycle.deleteMany({}, () => {
        bicycles.forEach(item => {
            Bicycle.create(item);
        })
    });
};




