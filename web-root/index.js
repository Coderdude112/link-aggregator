/**
 * @author Coderdude112 <https://github.com/Coderdude112>
 * @author IsadoraTerz <https://github.com/IsadoraTerz>
 * @license MIT <https://raw.githubusercontent.com/Coderdude112/link-aggregator/primary/LICENSE>
 */

// ---- //
/* Core */
// ---- //

/** Handles all actions that need to be done to setup the page */
function setupPage() {
    fillCategoryDropdowns()
}

/** Toggles to a new tab
 * @param {string} tab
 */
function viewTab(tab) {
    let tabsParent = document.getElementById("tabs-parent")
    let navbarTabButtonsParent = document.getElementById("tabs-navbar-parent")
    let tabs = []
    let navbarTabButtons = []
    
    // Get all tabs and their element in the navbar
    for (let child in tabsParent.childNodes) {
        if (tabsParent.childNodes[child].nodeType == 1) { tabs.push(tabsParent.childNodes[child]) }
    }
    for (let child in navbarTabButtonsParent.childNodes) {
        if (navbarTabButtonsParent.childNodes[child].nodeType == 1) { navbarTabButtons.push(navbarTabButtonsParent.childNodes[child]) }
    }

    // Reset everything
    for (let tab in tabs) {
        tabs[tab].style.display = "none"
    }
    for (let button in navbarTabButtons) {
        navbarTabButtons[button].classList.remove("is-active")
    }

    // Make the desired tab visible
    document.getElementById(tab).style.display = "block"
    document.getElementById(tab + "-navbar-button").classList.add("is-active")
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

/** Gets an element by ID then wipes the element
 * @param {string} id
 */
function getValueThenWipe(id) {
    const value =  document.getElementById(id).value
    document.getElementById(id).value = ""
    return value
}

// -------- //
/* Creators */
// -------- //

/** Creates a new category using the data the user entered on the "create-category" tab */
function createCategory() {
    const name = getValueThenWipe("add-category-link-input")
    var string = document.getElementById("add-category-color-input").value // The HTML color code for the category (Omit the hashtag from the front of the color code)
    color = string.substring(1, 7)
    const icon = getValueThenWipe("add-category-icon-input") // The icon of the category, provided by iconify

    interneReq("POST", "http://localhost:3000/OPS/createCategory?name=" + name + "&color=" + color + "&icon=" + icon)
    fillCategoryDropdowns()
}

/** Creates a new link using the data the user entered on the "create-link" tab */
function createLink() {
    const link = getValueThenWipe("add-link-link-input") // The link we are saving (Omit "http://" and "https://")
    const websiteName = getValueThenWipe("add-link-website-name-input") // The name of the website where the link is hosted
    const pageTitle = getValueThenWipe("add-link-page-title-input") // The title of the page
    const category = getValueThenWipe("add-link-category-select")
    const imageFilename = getValueThenWipe("add-link-image-upload-button") // An image that will accompany the link on the homepage // @TODO: Use multr

    interneReq("POST", "http://localhost:3000/OPS/createLink?link=" + link + "&websiteName=" + websiteName + "&pageTitle=" + pageTitle + "&category=" + category + "&imageFilename=" + imageFilename)
}

// -------- //
/* Clearers */
// -------- //

/** Clears all the entry fields  */
function clearCategory(){
    document.getElementById("add-category-link-input").value = ""
    document.getElementById("add-category-color-input").value = ""
    document.getElementById("add-category-icon-input").value = ""
}

function clearLink(){
    document.getElementById("add-link-link-input").value = ""
    document.getElementById("add-link-website-name-input").value = ""
    document.getElementById("add-link-page-title-input").value = ""
    document.getElementById("add-link-category-select").value = 0
    document.getElementById("add-link-image-upload-button").value = ""
}

// ------------ //
/* Page fillers */
// ------------ //

/** Fills all category dropdown menus with all available categories */
function fillCategoryDropdowns() {
    interneReq("GET", "http://localhost:3000/OPS/getCategories", (res) => {
        if (res.target.readyState === 4 && res.target.status === 200) {
            const resJSON = JSON.parse(res.target.response)
            let dropdownHTML = ""

            for (let i in resJSON.recordset) {
                dropdownHTML += "<option value=\"" + i + "\">" + resJSON.recordset[i].name + "</option>"
            }

            document.getElementById("add-link-category-select").innerHTML = dropdownHTML
        }
    })
}
