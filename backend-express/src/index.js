import express from 'express';
import api from './api';

const app = express();
const port = 80;

/* Middlewares */
app.use(express.json());

/* api */
app.use('/api/', api);

app.listen(port);