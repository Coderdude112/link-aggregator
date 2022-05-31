const mssql = require("mssql")

/** Connects and makes a query to the database
 * @param {string} query
 * @throws {Error} Any Error cause by using mssql
 * @returns {JSON}
 */
async function queryDatabase(query) {
  try {
    await mssql.connect("Server=localhost,1433; Database=linkaggregator; User Id=link-aggregator-user; Password=password; Encrypt=false;")
    return await mssql.query(query)
  } catch (error) {
    console.warn(error)
  }
}

/** Creates a new category
 * @param {string} name
 * @param {string} color
 * @param {string} icon The name of an icon from [Iconify](https://icon-sets.iconify.design/) (Ex: "ic:baseline-10k")
 * @throws {Error} Any Error caused by calling queryDatabase
 * @returns {JSON}
 */
async function createCategory(name, color, icon) {
  return queryDatabase("INSERT INTO categories VALUES('" + name + "', '" + color + "', '" + icon + "')")
}

/** Creates a new link
 * @async
 * @param {string} link
 * @param {string} websiteName
 * @param {string} pageTitle
 * @param {string} fileName The name of the corresponding image associated with this link
 * @param {number} category The category this link belongs to
 * @throws {Error} Any Error caused by calling queryDatabase
 * @returns {JSON}
 */
async function createLink(link, websiteName, pageTitle, filename, category) {
  return queryDatabase("INSERT INTO links VALUES('" + link + "', '" + title + "', '" + filename + "', '" + category + "')")  
}

/** Gets the "categories" table from the DB
 * @throws {Error} Any Error caused by calling queryDatabase
 * @returns {JSON}
 */
async function getCategories() {
  return queryDatabase("SELECT * FROM categories")
}

/** Gets the "links" table from the DB
 * @throws {Error} Any Error caused by calling queryDatabase
 * @returns {JSON}
 */
async function getLinks() {
  return queryDatabase("SELECT * FROM links")
}

/** Handles all exports */
module.exports = { createCategory, createLink, getCategories, getLinks }
