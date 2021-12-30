const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const deviceRoute = require("./routes/deviceRoute");



app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use("/device", deviceRoute);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
