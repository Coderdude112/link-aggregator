// --------- //
/* Variables */
// --------- //
const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
const databaseConnector = require("./dbo.js")

// --------------------- //
/* Basic webserver setup */
// --------------------- //
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname + "/web-root")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// --------- //
/* Listeners */
// --------- //
app.get("/", (req, res) => { res.sendFile(__dirname + "\\web_root\\index.html") }) // Set the default homepage

app.listen(port, () => { console.log("Server listening at http://localhost:" + port) }) // Start the server