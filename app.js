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

app.get('/gimme', async (req, res) => {
  var name = (await dao.getAllMemes()).recordset[0].memes
  console.log(name);
  res.status(200).sendFile(__dirname + '\\public\\memes\\' + name)
})

app.get('/gimmeFilename', async (req, res) => {
  var name = (await dao.getAllMemes()).recordset[0].memes
  console.log(name);
  res.status(200).send('\\memes\\' + name)
  //console.log('file:///' + __dirname + '\\public\\memes\\' + name);
})

app.post('/meme', upload.single('uploaded_file'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  console.log(req.file.filename)
  dao.insertMeme(req.file.filename);
  res.status(200).send("Successfully uploaded file, go back to see meme inside generator :)")
});

app.listen(port, () => { console.log("Server listening at http://localhost:" + port) }) // Start the server
