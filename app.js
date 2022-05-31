// --------- //
/* Variables */
// --------- //
const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
const dbo = require("./dbo.js")

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

app.post("/OPS/createLink", async (req, res) => {
    const link = req.query.link
    const websiteName = req.query.websiteName
    const pageTitle = req.query.pageTitle
    const imageFilename = null // req.query.imageFilename
    const category = req.query.category

    try {
        await dbo.createLink(link, websiteName, pageTitle, imageFilename, category)
        res.sendStatus(200)
    } catch (error) {
        console.warn(error)
        res.status(500).send(error)
    }
})
app.post("/OPS/createCategory", async (req, res) => { 
    const name = req.query.name
    const color = req.query.color
    const icon = req.query.icon

    try {
        await dbo.createCategory(name, color, icon)
        res.sendStatus(200)
    } catch (error) {
        console.warn(error)
        res.status(500).send(error)        
    }
})
app.post("/OPS/sendImage", (req, res) => { res.sendStatus(418) })

app.get("/OPS/getLinks", async (req, res) => {
    try {
        const commandResult = await dbo.getLinks()
        res.status(200).send(commandResult)
    } catch (error) {
        console.warn(error)
        res.status(500).send(error)
    }
})
app.get("/OPS/getCategories", async (req, res) => { 
    try {
        const commandResult = await dbo.getCategories()
        res.status(200).send(commandResult)
    } catch (error) {
        console.warn(error)
        res.status(500).send(error)
    }
})
app.get("/OPS/getImage", async (req, res) => { res.sendStatus(418) })

app.listen(port, () => { console.log("Server listening at http://localhost:" + port) }) // Start the server
