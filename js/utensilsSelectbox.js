/* Dropdown with search bar */

// Global variables
let currentlySelectedUtensils = []
let utensilsArray = []
let userUtensilsData

//getting all required elements
const utensilSearchWrapper = document.getElementById("utensils-search-input")
const utensilInputBox = utensilSearchWrapper.querySelector("input")
const utensilSuggBox = utensilSearchWrapper.querySelector(".autocom-box")

//if user press any key and release
utensilInputBox.onkeyup = (e) =>
{
    userUtensilsData = e.target.value.toLowerCase() // user entered data, we turn it to lower case

    if (userUtensilsData)
    {
        utensilSearchWrapper.classList.add("active") // show autocomplete box

    }
    else
    {
        utensilSearchWrapper.classList.remove("active") // hide autocomplete box
        document.getElementById("search-input-utensils").placeholder = "Search an utensil";
    }

    showUtensilsSuggestions()
}

  


utensilInputBox.onfocus = (e) =>
{

    ingredientSearchWrapper.classList.remove("active")
    deviceSearchWrapper.classList.remove("active")

    deviceInputBox.setAttribute("placeholder", "Ingredients")
    ingredientInputBox.setAttribute("placeholder", "Ingredients")

    utensilSearchWrapper.classList.add("active") // show autocomplete box
    utensilInputBox.style.borderRadius="5px 5px 0 0"
    utensilInputBox.setAttribute("placeholder", "search an ingredient")
    showUtensilsSuggestions()
    document.onclick = (e) => 
    {
        if( e.target.id == "utensil") null
        else if (e.target.id == "search-input-utensils") null
        else 
        {
            utensilSearchWrapper.classList.remove("active")
            utensilInputBox.style.borderRadius="5px"
            utensilInputBox.setAttribute("placeholder", "Utensils")
            // Remove onclick event from document
            document.onclick = null
        }
    } 
}

//  Updates ingredients suggestion and excludes anything already present in the chips.
const updateUtensilSuggestions = () => utensilsArray = userUtensilsData 
? 
    utensilsGroup.filter(utensil => !currentlySelectedUtensils.includes(`${utensil.charAt(0).toUpperCase()}${utensil.slice(1)}`)).filter((data) => data.startsWith(userUtensilsData))
: 
    utensilsGroup.filter(utensil => !currentlySelectedUtensils.includes(`${utensil.charAt(0).toUpperCase()}${utensil.slice(1)}`)) 

// Displays the list of suggestions LI elements.
function showUtensilsSuggestions()
{
    updateUtensilSuggestions()
    userUtensilsData 
    ?
        utensilSuggBox.innerHTML = !utensilsArray.length 
        ? 
            '<li>' + utensilInputBox.value + '</li>' 
        : 
            utensilsArray.map(data =>
            `
                <li id="utensil" class="col-4" onclick="launchUtensilChip('${data.charAt(0).toUpperCase()}${data.slice(1)}')">${data.charAt(0).toUpperCase()}${data.slice(1)}</li>
            `
            ).join('')
    :
    utensilSuggBox.innerHTML = utensilsArray.map(data =>
    `
        <li id="utensil" class="col-4" onclick="launchUtensilChip('${data.charAt(0).toUpperCase()}${data.slice(1)}')">${data.charAt(0).toUpperCase()}${data.slice(1)}</li>
    `
    ).join('')
}

// Renders the chip section by looping over the list of currentlySelectedUtensils.
const renderUtensilsChips = () =>
{
    document.getElementById("selectedUtensils").innerHTML = 
    currentlySelectedUtensils.map(utensil => 
    `
    <div class="chip utensils-chip d-flex align-items-center mx-1 my-2">
        <p class="mb-0 mr-3" id="utensil-item">${utensil}</p>
        <i class="far fa-times-circle fa-lg close-button" onclick="closeUtensilChip('${utensil}')"></i>
    </div>
    `).join("")
}

function utensilFiltering()
{
    currentlySelectedUtensils.forEach(utensil => 
    {
        filteredRecipes = filteredRecipes.filter((recipe) => 
        (
            recipe.ustensils.map(uten => uten.toLowerCase()).includes(utensil.toLowerCase())
            // recipe.ustensils.toLowerCase() === utensil.toLowerCase()
        ))
    })
}

// Adds an utensil to the list of currentlySelectedUtensils.
const launchUtensilChip = (elem) =>
{
    currentlySelectedUtensils.push(elem)
    renderUtensilsChips()
    showUtensilsSuggestions()
    updateFilters(searchString)
}

// Removes an utensil from the list of currentlySelectedUtensils.
const closeUtensilChip = (element) =>
{
    currentlySelectedUtensils = currentlySelectedUtensils.filter(elem => elem != element)
    renderUtensilsChips()
    utensilFiltering()
    showUtensilsSuggestions()
    updateFilters(searchString)
}

