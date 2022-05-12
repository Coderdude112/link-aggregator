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

/** Handles all exports */
module.exports = { createArmedForce }