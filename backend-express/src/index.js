import express from 'express';
import api from './api';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load dotenv config
const app = express();
console.log(process.env.PORT);
const port = process.env.PORT;

/* Middlewares */
app.use(express.json());

/* Database */
mongoose.connect('mongodb://root:land@land_db/');

/* api */
app.use('/api/', api);

app.use((err, req, res, next) => {
    console.log(err)
    if (err.name == 'Error') {
        res.status(400);
        res.json({ error: err.message });
    } else if (err.name == 'ValidationError') {
        res.status(400);
        res.json({ error: err.errors[Object.keys(err.errors)[0]].properties.message});
    } else if (err.name == 'MongoServerError' && err.code == 11000) { // IF DUPLICATED KEY
        res.status(400);
        const key = Object.keys(err.keyValue); 
        res.json({ error: key + ' ' + err.keyValue[key] + ' already exists' });
    } else {
        res.status(500);
    }
    res.end(); 
});

app.listen(port);

console.log('Listening on port', port);
