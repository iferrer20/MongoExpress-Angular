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

/*app.use((err, req, res, next) => {
    // https://expressjs.com/en/guide/error-handling.html
    if (res.headersSent) {
        return next(err);
    }

    if (err.code < 500) {
        res.status(err.code);
    } else if(err.code == 45000) { 
        res.status(400);
    } else {
        res.status(500);
    }

    res.json({ error: err.message });
    res.end(); 
});*/

app.listen(port);

console.log('Listening on port', port);
