import express from 'express';
import api from './api';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config(); // Load dotenv config
const app = express();
const port = process.env.PORT;


/* Middlewares */
app.use(express.json());
app.use(cookieParser());


/* Database */
mongoose.connect('mongodb://root:land@land_db/');

/* api */
app.use('/api/', api);

app.use((err, req, res, next) => {
  const cleanErr = err => err.properties ? err.properties.message : err.message;

  console.log(err)
  if (err.name == 'Error') {
    res.status(400);
    res.json({ error: err.message });
  } else if (err.name == 'ValidationError') {
    res.status(400);
    res.json({ error: Object.keys(err.errors).map(k => cleanErr(err.errors[k])) });
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
