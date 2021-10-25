/* Dropdown with search bar */

// Global variables
let currentlySelectedIngredients = []
let IngredientsArray = []
let userIngredientsData

//getting all required elements
const ingredientSearchWrapper = document.getElementById("ingredients-search-input")
const ingredientInputBox = ingredientSearchWrapper.querySelector("input")
const ingredientSuggBox = ingredientSearchWrapper.querySelector(".autocom-box")


//if user press any key and release
ingredientInputBox.onkeyup = (e) =>
{
    userIngredientsData = e.target.value.toLowerCase() // user entered data, we turn it to lower case

    if (userIngredientsData)
    {
        ingredientSearchWrapper.classList.add("active") // show autocomplete box
  
 
    }
    else
    {
        ingredientSearchWrapper.classList.remove("active") // hide autocomplete box
    }

    showIngrdientsSuggestions()
}


ingredientInputBox.onfocus = (e) =>
{
    utensilSearchWrapper.classList.remove("active")
    deviceSearchWrapper.classList.remove("active")

    deviceInputBox.setAttribute("placeholder", "Ingredients")
    utensilInputBox.setAttribute("placeholder", "Ingredients")

    ingredientSearchWrapper.classList.add("active") // show autocomplete box
    ingredientInputBox.style.borderRadius="5px 5px 0 0"
    ingredientInputBox.setAttribute("placeholder", "search an ingredient")
    // ingredientSearchWrapper.classList.add("flex-grow-2") 
    showIngrdientsSuggestions()
    document.onclick = (e) => 
    {
        
        if( e.target.id == "ingredient") null
        else if (e.target.id == "search-input-ingredients") null
        else 
        {
            ingredientSearchWrapper.classList.remove("active")
            ingredientInputBox.style.borderRadius="5px"
            ingredientInputBox.setAttribute("placeholder", "Ingredients")
           
          
            // Remove onclick event from document
            document.onclick = null
        }
    } 
}

//  Updates ingredients suggestion and excludes anything already present in the chips.
const updateIngredientSuggestions = () => IngredientsArray = userIngredientsData 
? 
    ingredientsGroup.filter(ing => !currentlySelectedIngredients.includes(`${ing.charAt(0).toUpperCase()}${ing.slice(1)}`)).filter((data) => data.startsWith(userIngredientsData))
: 
    ingredientsGroup.filter(ing => !currentlySelectedIngredients.includes(`${ing.charAt(0).toUpperCase()}${ing.slice(1)}`)) 

// Displays the list of suggestions LI elements.
function showIngrdientsSuggestions()
{
    updateIngredientSuggestions()
    userIngredientsData 
    ?
        ingredientSuggBox.innerHTML = !IngredientsArray.length 
        ? 
            '<li>' + ingredientInputBox.value + '</li>' 
        : 
            IngredientsArray.map(data =>
            `
                <li id="ingredient" class="col-4" onclick="launchIngredientChip('${data.charAt(0).toUpperCase()}${data.slice(1)}')">${data.charAt(0).toUpperCase()}${data.slice(1)}</li>
            `
            ).join('')
    :
    ingredientSuggBox.innerHTML = IngredientsArray.map(data =>
    `
        <li id="ingredient" class="col-4" onclick="launchIngredientChip('${data.charAt(0).toUpperCase()}${data.slice(1)}')">${data.charAt(0).toUpperCase()}${data.slice(1)}</li>
    `
    ).join('')
}

// Renders the chip section by looping over the list of currentlySelectedIngredients.
const renderIngredientsChips = () =>
{
    document.getElementById("selectedIngredients").innerHTML = 
    currentlySelectedIngredients.map(ing => 
    `
    <div class="chip ingredients-chip d-flex align-items-center mx-1 mb-2">
        <p class="mb-0 mr-3" id="ingredient-item">${ing}</p>
        <i class="far fa-times-circle fa-lg close-button" onclick="closeIngredientChip('${ing}')"></i>
    </div>
    `).join("")
}


function ingredientFiltering()
{
    currentlySelectedIngredients.forEach(ingredient => 
    {
        filteredRecipes = filteredRecipes.filter((recipe) => 
        (
            recipe.ingredients.map(ing => ing.ingredient.toLowerCase()).includes(ingredient.toLowerCase())
        ))
    })
}

// Adds an ingredient to the list of currentlySelectedIngredients.
const launchIngredientChip = (elem) =>
{
    currentlySelectedIngredients.push(elem)
    renderIngredientsChips()
    showIngrdientsSuggestions()
    updateFilters(searchString)
}

// Removes an ingredient from the list of currentlySelectedIngredients.
const closeIngredientChip = (element) =>
{
    currentlySelectedIngredients = currentlySelectedIngredients.filter(elem => elem != element)
    renderIngredientsChips()
    ingredientFiltering()
    showIngrdientsSuggestions()
    updateFilters(searchString)
}
