import express from 'express';
import api from './api';
import mongoose from 'mongoose';

const app = express();
const port = 80;

/* Middlewares */
app.use(express.json());

/* Database */
mongoose.connect('mongodb://root:land@land_db/');

/* api */
app.use('/api/', api);

app.use((err, req, res, next) => {
    if (err.name == 'Error') {
        res.status(400);
        res.json({ error: err.message });
    } else {
        res.status(500);
    }
    res.end(); 
});

app.listen(port);

console.log('Listening on port', port);
