const { Client } = require('pg');

const options = {
  user: "postgres",
  host: "localhost",
  database: "logistic",
  password: "strongpwd",
  port: "5432",
}

const client = new Client(options);
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

const getTempList = (request, response) => {
  client.query('SELECT * FROM log_tempature ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const createTemp = (request, response) => {
  const { read_data, created_at } = request.body

  client.query('INSERT INTO log_tempature (read_data, created_at) VALUES ($1, $2) RETURNING *',
  [read_data, current_timestamp], (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(201).send(`Temp added with ID: ${results.rows[0].id}`)
  })
}


module.exports = {
  getTempList,
  createTemp,
}
