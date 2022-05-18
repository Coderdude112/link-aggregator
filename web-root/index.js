/**
 * @author Coderdude112 <https://github.com/Coderdude112>
 * @author IsadoraTerz <https://github.com/IsadoraTerz>
 * @license MIT <https://raw.githubusercontent.com/Coderdude112/link-aggregator/primary/LICENSE>
 */

// ---- //
/* Core */
// ---- //

/** Toggles a tab
 * @param {string} tab
 */
function viewTab(tab) {
    // Get all tabs
    let parent = document.getElementById("tabs-parent");
    let children = new Array();
    for (let child in parent.childNodes) {
        if (parent.childNodes[child].nodeType == 1) { children.push(parent.childNodes[child]) }
    }

    // Make all tabs hidden
    for (let tab in children) {
        children[tab].style.display = "none"
    }

    // Make the desired tab visible
    document.getElementById(tab).style.display = "block"

    // Automatic actions depending on the tab
}

// ----- //
/* Utils */
// ----- //

/** Makes a XHttpRequest
 * @param {"GET" | "POST"} send_method
 * @param {string} URL
 * @param {function} [callback = function() { }] The function to run when done
 */
function interneReq(send_method, URL, callback = function() { }) {
    let xhr = new XMLHttpRequest()
    xhr.open(send_method, URL)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.onreadystatechange = callback
    xhr.send()
}

/** Gets an elemement by ID then wipes the element
 * @param {string} id
 */
function getValueThenWipe(id) {
    const value =  document.getElementById(id).value
    document.getElementById(id).value = ""
    return value
}

// ----- //
/* Links */
// ----- //

/** Creates a new link using the data the user entered on the "create-link" tab */
function createLink() {
    const link = getValueThenWipe("add-link-link-input") // The link we are saving (Omit "http://" and "https://")
    const websiteName = getValueThenWipe("add-link-website-name-input") // The name of the website where the link is hosted
    const pageTitle = getValueThenWipe("add-link-page-title-input") // The title of the page
    const category = getValueThenWipe("add-link-category-select")
    const imageFilename = getValueThenWipe() // An image that will accompany the link on the homepage // @TODO: Use multr

    interneReq("POST", "http://localhost:3000/OPS/createLink?link=" + link + "&websiteName=" + websiteName + "&pageTitle=" + pageTitle + "&category=" + category + "&imageFilename=" + imageFilename)
}

/** Creates a new category using the data the user entered on the "create-category" tab */
function createCategory() {
    const name = getValueThenWipe()
    const color = document.getElementById().value // The HTML color code for the category (Omit the hashtag from the front of the color code)
    const icon = getValueThenWipe() // The icon of the category, provided by iconify

    interneReq("POST", "http://localhost:3000/OPS/createCategory?name=" + name + "&color=" + color + "&icon=" + icon)
}
