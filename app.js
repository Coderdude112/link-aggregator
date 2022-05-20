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
const { DateTimeOffset } = require("mssql")

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

app.post("/OPS/createLink", (req, res) => {
    var link = req.query.link
    var websiteName = req.query.websiteName
    var pageTitle = req.query.pageTitle
    var category = req.query.category
    var imageFilename = req.query.imageFilename

    dbo.createLink(link, websiteName, pageTitle, category, imageFilename);
    res.sendStatus(200)
})

app.post("/OPS/createCategory", (req, res) => { 
    var name = req.query.name
    var color = req.query.color
    var icon = req.query.icon

    dbo.createCategory(name, color, icon);
    res.sendStatus(200)
})

app.post("/OPS/sendImage", (req, res) => { res.sendStatus(418) })

app.get("/OPS/getLinks", async (req, res) => {
    var getLink = await dbo.getLinks();
    res.status(200).send(getLink);
})

app.get("/OPS/getCategories", async (req, res) => { 
    var getCategory = await dbo.getCategories();
    res.status(200).send(getCategory);
})

app.get("/OPS/getImage", async (req, res) => { res.sendStatus(418)
    //var name = (await dao.getAllMemes()).recordset[0].memes
    //res.status(200).sendFile(__dirname + '\\web-root\\images\\' + name)
})

app.listen(port, () => { console.log("Server listening at http://localhost:" + port) }) // Start the server
