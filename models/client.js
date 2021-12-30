const { Client } = require('pg');

const options = {
  user: "postgres",
  host: "localhost",
  database: "logistic",
  password: "strongpwd",
  port: "5432",
}

const client = new Client(options)
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

module.export = client;
