const express = require('express');
const db = require('./db');
const clock = require('./utils/timing');
const {
  performance
} = require('perf_hooks');
const { storeNumber, getAllNumbers, dropAllNumbers } = require('./db/queries');
const app = express()
const port = 3000

app.get('/getNumbers', (req, res, next) => {
  let timestamp = clock();
  console.log('performance', timestamp);
  getAllNumbers()
  .then(result => {
    console.log(`it took: ${clock(timestamp)}ms.`);
    res.status(201).json(constructResponse(`it took ${clock(timestamp)}ms`, result.rows))
  })
  .catch(err => {
    res.json({ error: err })
  });
})

app.post('/postNumber/', (req, res) => {
  let timestamp = clock();
  storeNumber(Math.floor(Math.random() * 10000))
  .then(result => {
    res.json(constructResponse(`it took ${clock(timestamp)}ms`, `updated ${result.rowCount} rows`));
  }).catch(err => {
    res.send(`error: ${err}`);
  });
});

app.post('/postNumber/:number', (req, res) => {
  let timestamp = clock();
  storeNumber(req.params.number)
  .then(result => {
    res.json(constructResponse(`it took ${clock(timestamp)}ms`, `updated ${result.rowCount} rows`));
  }).catch(err => {
    res.send(`error: ${err}`);
  });
});

app.post('/bulkCreate/:amount', (req, res) => {
  let timestamp = clock();
  const amount = +req.params.amount;
  const promises = [];
  for (let i = 0; i < amount; i++) {
    promises.push(storeNumber(Math.floor(Math.random() * 10000)));
  }
  Promise.all(promises)
  .then(result => {
    res.json(constructResponse(`it took ${clock(timestamp)}ms`, `updated ${result.length} rows`));
  })
  .catch(err => res.json(err))
});

app.post('/loadTest/:amount', (req, res) => {
  let timestamp = clock();
  const amount = +req.params.amount;
  const promises = [];
  for (let i = 0; i < amount; i++) {
    promises.push(storeNumber(Math.floor(Math.random() * 10000)));
  }
  Promise.all(promises)
  .then(() => {
    getAllNumbers()
    .then(() => {
      dropAllNumbers()
      .then(() => {
        res.json(constructResponse(`it took ${clock(timestamp)}ms`, 'success'));
      })
    })
  })
  .catch(err => res.json(err))
});

function constructResponse(time, result) {
  return {
    time,
    result
  };
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})