const client = require("../models/client");

const getVehicles = (request, response) => {
  client.query('SELECT * FROM vehicles ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getVehicleById = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('SELECT * FROM vehicles WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createVehicle = (request, response) => {
  const { vehicle_plate , current_status, is_active } = request.body

  client.query('INSERT INTO vehicles (vehicle_plate , current_status, is_active) VALUES ($1, $2, $3) RETURNING *',
  [vehicle_plate , current_status, is_active], (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(201).send(`vehicle added with ID: ${results.rows[0].id}`)
  })
}

const updateVehicle = (request, response) => {
  const id = parseInt(request.params.id)
  const { vehicle_plate, current_status, is_active } = request.body

  client.query(
    'UPDATE vehicles SET vehicle_plate = $1, current_status = $2, is_active = $3  WHERE id = $4 RETURNING *',
    [ vehicle_plate, current_status, is_active, id ],
    (error, results) => {
      if (error) {
        throw error
      }
      if (typeof results.rows == 'undefined') {
      	response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
      	response.status(404).send(`vehicle not found`);
      } else {
  	 	  response.status(200).send(`vehicle modified with ID: ${results.rows[0].id}`)
      }

    }
  )
}

const deleteVehicle = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('DELETE FROM vehicles WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`vehicle deleted with ID: ${id}`)
  })
}

module.exports = {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
}
