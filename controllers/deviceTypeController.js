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

const getDeviceTypes = (request, response) => {
  client.query('SELECT * FROM device_type ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const createDeviceType = (request, response) => {
  const { device_name, device_description, is_active } = request.body

  client.query('INSERT INTO device_type (device_name, device_description, is_active) VALUES ($1, $2, $3) RETURNING *',
  [device_name, device_description, is_active], (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(201).send(`device added with ID: ${results.rows[0].id}`)
  })
}



const deleteDeviceType = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('DELETE FROM device_type WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`device_type deleted with ID: ${id}`)
  })
}

module.exports = {
  getDeviceTypes,
  createDeviceType,
  deleteDeviceType,
}
