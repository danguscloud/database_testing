const db = require('./')

function storeNumber(number) {
  return db.query('INSERT INTO numerics ("number") VALUES ($1)', [number])
}

function getAllNumbers() {
  return db.query('SELECT * FROM numerics');
}

function dropAllNumbers() {
  return db.query('DELETE FROM numerics');
}

module.exports = {
  storeNumber,
  dropAllNumbers,
  getAllNumbers
}