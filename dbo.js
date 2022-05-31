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
    throw error
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
  try {
    const commandResult = await queryDatabase("INSERT INTO categories VALUES('" + name + "', '" + color + "', '" + icon + "')")
    return commandResult
  } catch (error) {
    throw error
  }
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
  // Remove "http://" or "https://" from the beginning of a link
  if (link.indexOf("http://") !== -1) { link = link.substring(8) }
  if (link.indexOf("https://") !== -1) { link = link.substring(9) }
  category = parseInt(category)

  try {
    const commandResult = await queryDatabase("INSERT INTO links VALUES('" + link + "', '" + websiteName + "', '" + pageTitle + "', '" + filename + "', '" + category + "')")
    return commandResult
  } catch (error) {
    throw error
  }
}

/** Gets the "categories" table from the DB
 * @throws {Error} Any Error caused by calling queryDatabase
 * @returns {JSON}
 */
async function getCategories() {
  try {
    const commandResult = await queryDatabase("SELECT * FROM categories")
    return commandResult
  } catch (error) {
    throw error
  }
}

/** Gets the "links" table from the DB
 * @throws {Error} Any Error caused by calling queryDatabase
 * @returns {JSON}
 */
async function getLinks() {
 try {
   const commandResult = await queryDatabase("SELECT * FROM links")
   return commandResult
 } catch (error) {
   throw error
 }
}

/** Handles all exports */
module.exports = { createCategory, createLink, getCategories, getLinks }
