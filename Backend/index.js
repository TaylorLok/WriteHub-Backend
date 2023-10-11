require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

//create an express app
const app = express();

//middleware routes
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();    
    console.log('middleware applied');
});

//for submitting data in json format to the API
app.use(express.json());

//calling routes
app.use('/api/users', userRoutes);

//connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{

        app.listen(process.env.PORT, () => {
            console.log('connecting to the Mongo DB & Port Number', process.env.PORT);
        });

        console.log('connected to the database');
    })
    .catch((err) => console.log(err));




