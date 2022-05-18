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

app.post("/OPS/createLink", (req, res) => { res.sendStatus(418) })
app.post("/OPS/createCategory", (req, res) => { res.sendStatus(418) })
app.post("/OPS/sendImage", (req, res) => { res.sendStatus(418) })

app.get("/OPS/getLinks", (req, res) => { res.sendStatus(418) })
app.get("/OPS/getCategories", (req, res) => { res.sendStatus(418) })
app.get("/OPS/getImage", async (req, res) => {
    var name = (await dao.getAllMemes()).recordset[0].memes
    res.status(200).sendFile(__dirname + '\\public\\memes\\' + name)
})

app.listen(port, () => { console.log("Server listening at http://localhost:" + port) }) // Start the server
