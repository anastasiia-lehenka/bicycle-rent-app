const express = require('express');
const mongoose = require('mongoose');
const router = require ('./routes');

const app = express();

app.use(express.json());
app.use('/api/bicycles', router);

mongoose.connect('mongodb://localhost:27017/bicycleRent',{ useNewUrlParser: true,  useUnifiedTopology: true }, error => {
    const PORT = process.env.PORT || 5000;

    if(error) return console.log(error);
    app.listen(PORT, () => { console.log(`App has been started on port ${PORT}...`) });
});




