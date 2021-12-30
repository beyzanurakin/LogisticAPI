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

const getDevices = (request, response) => {
  client.query('SELECT * FROM devices ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getDeviceById = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('SELECT * FROM devices WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createDevice = (request, response) => {
  const { vehicle_id, device_type_id, device_name, is_online, is_active} = request.body

  client.query('INSERT INTO devices (vehicle_id, device_type_id, device_name, is_online, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING *',
  [vehicle_id, device_type_id, device_name, is_online, is_active], (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(201).send(`device added with ID: ${results.rows[0].id}`)
  })
}

const updateDevice = (request, response) => {
  const id = parseInt(request.params.id)
  const { vehicle_id, device_type_id, device_name, is_online, is_active} = request.body

  client.query(
    'UPDATE devices SET vehicle_id = $1, device_type_id = $2, device_name = $3, is_online = $4, is_active = $5  WHERE id = $6 RETURNING *',
    [vehicle_id, device_type_id, device_name, is_online, is_active],
    (error, results) => {
      if (error) {
        throw error
      }
      if (typeof results.rows == 'undefined') {
      	response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
      	response.status(404).send(`device not found`);
      } else {
  	 	  response.status(200).send(`device modified with ID: ${results.rows[0].id}`)
      }

    }
  )
}

const deleteDevice = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('DELETE FROM devices WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`device deleted with ID: ${id}`)
  })
}

module.exports = {
  getDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
}
