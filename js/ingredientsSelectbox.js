/* Dropdown with search bar */

// Global variables
let currentlySelectedIngredients = []
let IngredientsArray = []
let userData

//getting all required elements
const searchWrapper = document.querySelector(".search-input")
const inputBox = searchWrapper.querySelector("input")
const suggBox = searchWrapper.querySelector(".autocom-box")

//if user press any key and release
inputBox.onkeyup = (e) =>
{
    userData = e.target.value.toLowerCase() // user entered data, we turn it to lower case

    if (userData)
    {
        searchWrapper.classList.add("active") // show autocomplete box

    }
    else
    {
        searchWrapper.classList.remove("active") // hide autocomplete box
        document.getElementById("search-input-ingredients").placeholder = "Search an ingredient";
    }

    showSuggestions()
}


inputBox.onfocus = (e) =>
{
    searchWrapper.classList.add("active") // show autocomplete box
    showSuggestions()
    document.onclick = (e) => 
    {
        if( e.target.id == "ingredient") null
        else if (e.target.id == "search-input-ingredients") null
        else 
        {
            searchWrapper.classList.remove("active")
            // Remove onclick event from document
            document.onclick = null
        }
    } 
}

//  Updates ingredients suggestion and excludes anything already present in the chips.
const updateIngredientSuggestions = () => IngredientsArray = userData 
? 
    ingredientsGroup.filter(ing => !currentlySelectedIngredients.includes(`${ing.charAt(0).toUpperCase()}${ing.slice(1)}`)).filter((data) => data.startsWith(userData))
: 
    ingredientsGroup.filter(ing => !currentlySelectedIngredients.includes(`${ing.charAt(0).toUpperCase()}${ing.slice(1)}`)) 

// Displays the list of suggestions LI elements.
function showSuggestions()
{
    updateIngredientSuggestions()
    userData 
    ?
        suggBox.innerHTML = !IngredientsArray.length 
        ? 
            '<li>' + inputBox.value + '</li>' 
        : 
            IngredientsArray.map(data =>
            `
                <li id="ingredient" class="col-4" onclick="launchChip('${data.charAt(0).toUpperCase()}${data.slice(1)}')">${data.charAt(0).toUpperCase()}${data.slice(1)}</li>
            `
            ).join('')
    :
    suggBox.innerHTML = IngredientsArray.map(data =>
    `
        <li id="ingredient" class="col-4" onclick="launchChip('${data.charAt(0).toUpperCase()}${data.slice(1)}')">${data.charAt(0).toUpperCase()}${data.slice(1)}</li>
    `
    ).join('')
}

// Renders the chip section by looping over the list of currentlySelectedIngredients.
const renderChips = () =>
{
    document.getElementById("selectedIngredients").innerHTML = 
    currentlySelectedIngredients.map(ing => 
    `
    <div class="chip ingredients-chip d-flex align-items-center mx-1 mb-2">
        <p class="mb-0 mr-3" id="ingredient-item">${ing}</p>
        <i class="far fa-times-circle fa-lg close-button" onclick="closeChip('${ing}')"></i>
    </div>
    `).join("")
}


function ingredientFiltering()
{
    let filteredResult = filteredRecipes

    currentlySelectedIngredients.forEach(ingredient => 
    {
        filteredResult = filteredResult.filter((recipe) => 
        (
            recipe.ingredients.map(ing => ing.ingredient.toLowerCase()).includes(ingredient.toLowerCase())
        ))
    })
    return filteredResult
}

// Adds an ingredient to the list of currentlySelectedIngredients.
const launchChip = (elem) =>
{
    currentlySelectedIngredients.push(elem)
    renderChips()
    showSuggestions()
    currentlySelectedIngredients.length >= 1 ? displayRecipes(ingredientFiltering()) : displayRecipes(filteredRecipes)
    console.log(currentlySelectedIngredients);
}

// Removes an ingredient from the list of currentlySelectedIngredients.
const closeChip = (element) =>
{
    currentlySelectedIngredients = currentlySelectedIngredients.filter(elem => elem != element)
    renderChips()
    ingredientFiltering()
    currentlySelectedIngredients.length >= 1 ? displayRecipes(ingredientFiltering()) : displayRecipes(filteredRecipes)
    showSuggestions()
    console.log(currentlySelectedIngredients);
}

