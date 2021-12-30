const client = require("../models/client");


const getGpsList = (request, response) => {
  client.query('SELECT * FROM log_location ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const createGps = (request, response) => {
  const { latitude, longtitude, created_at } = request.body

  client.query('INSERT INTO log_location (latitude, longtitude, created_at) VALUES ($1, $2, $3) RETURNING *',
  [latitude, longtitude, current_timestamp], (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(201).send(`GPS added with ID: ${results.rows[0].id}`)
  })
}


module.exports = {
  getGpsList,
  createGps,
}
