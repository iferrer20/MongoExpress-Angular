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

app.listen(port);
