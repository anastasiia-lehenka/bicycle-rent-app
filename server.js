const express = require('express');
const mongoose = require('mongoose');
const router = require ('./routes')

const app = express();

app.use(express.json());
app.use('/api/bicycles', router);

const PORT = process.env.PORT || 5000;

app.listen( 5000, () => { console.log(`App has been started on port ${PORT}...`) });



