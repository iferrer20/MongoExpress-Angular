import express from 'express';

const app = express();
const port = 80;

/* Middlewares */
app.use(express.json());

/* api */
app.get('/api/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
