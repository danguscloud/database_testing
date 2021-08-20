const express = require('express');
const db = require('./db')
const app = express()
const port = 3000

app.get('/getNumbers', (req, res, next) => {
  db.query('SELECT * FROM numerics ', (err, result) => {
    if (err) {
      return next(err)
    }
    res.status(201).json(result.rows)
  })
})

app.post('/postNumber/', (req, res) => {
  const randomNum = Math.floor(Math.random() * 10000)
  db.query('INSERT INTO numerics ("number") VALUES ($1)', [randomNum], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(`updated ${result.rowCount} rows`);
  })
});

app.post('/postNumber/:number', (req, res) => {
  db.query('INSERT INTO numerics ("number") VALUES ($1)', [req.params.number], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(`updated ${result.rowCount} rows`);
  })
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})