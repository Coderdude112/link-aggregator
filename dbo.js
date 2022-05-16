const mssql = require("mssql")

/** Connects and makes a query to the database
* @param {string} query
* @returns {string | boolean} The result of running the query or false if the query was unsuccessful
*/
async function queryDatabase(query) {
  try {
    await mssql.connect("Server=localhost,1433; Database=linkaggregator; User Id=link-aggregator-user; Password=password; Encrypt=false;")
    return await mssql.query(query)
  } catch (error) {
    console.warn(error)
  }
}

async function createCategory(name, color, icon) {
  return queryDatabase("INSERT INTO categories '" + name + "', '" + color + "', '" + icon + "',")
}

async function createLink(link, title, filename, category) {
  return queryDatabase("INSERT INTO links '" + link + "', '" + title + "', '" + filename + "', '" + category + "',")
}

async function getCategories() {
  return queryDatabase("SELECT * FROM categories")
}

async function getLinks() {
  return queryDatabase("SELECT * FROM links")
}

/** Handles all exports */
module.exports = { createCategory, createLink, getCategories, getLinks }
