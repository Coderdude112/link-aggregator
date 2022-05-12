const mssql = require("mssql")

/** Connects and makes a query to the database
 * @param {string} query
 * @returns {string | boolean} The result of running the query or false if the query was unsuccessful
 */
async function queryDatabase(query) {
  try {
    await mssql.connect("Server=localhost,1433; Database=clind2225_warlords; User Id=yelp_for_anything_user; Password=password; Encrypt=false;")
    return await mssql.query(query)
  } catch (error) {
    console.warn(error)
  }
}

async function insertMeme (meme) {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect('Server=localhost,1433;Database=isadorameme;User Id=admin;Password=admin123;Encrypt=false')
    const result = await sql.query("INSERT INTO Isadora_Meme VALUES('" + meme + "');")
    //console.dir(result)
  } catch (err) {
    console.log(err);
  }
}

async function getAllMemes() {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect('Server=localhost,1433;Database=isadorameme;User Id=admin;Password=admin123;Encrypt=false')
    var meme = await sql.query("SELECT TOP 1 * FROM Isadora_Meme ORDER BY NEWID()")
    //console.dir(meme)
    return meme;
  } catch (err) {
    console.log(err);
  }
}

/** Handles all exports */
module.exports = { createArmedForce }
