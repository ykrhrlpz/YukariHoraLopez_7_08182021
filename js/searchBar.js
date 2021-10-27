const recipesList = document.getElementById('recipesList')
const searchBar = document.getElementById('searchWrapper')
let filteredRecipes = []
let searchString = ""

function linearSearch(arr, elem)
{
    let result = false
    let elemLength = elem.length
    let loopLength = arr.length - elemLength
    if (loopLength < 0)
    {
        return false
    }
    for (let i = 0; i <= loopLength; i++)
    {
        if (arr.slice(i, i + elemLength) === elem)
        { 
            result = true
        }
    }
    return result
}

function searchBarFiltering(value)
{
    searchString = value.toLowerCase()
    filteredRecipes = filteredRecipes.filter(recipe => 
    {
        if(recipe.name) 
            if(linearSearch(recipe.name.toLowerCase(), searchString))
                return true
        if(recipe.ingredients) 
            if(recipe.ingredients.filter(item => linearSearch(item.ingredient.toLowerCase(), searchString)).length > 0)
                return true
        if(recipe.description)
            if(linearSearch(recipe.description.toLowerCase(), searchString))
                return true
    })
}

searchBar.addEventListener('keyup', (e) => updateFilters(e.target.value))

function generateIngredients(ingredients) 
{
	return ingredients.map(ingredient => 
    `
        <small class="card-text mb-1"><strong>${ingredient.ingredient}:</strong> ${ingredient.quantity ? ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}</small>
    `).join('')
}

function displayRecipes(recipes)
{
    const htmlString = recipes.map((recipe) =>  
        `   
        <div class="card col-sm-12 col-md-6 col-lg-4 mb-4">
            <div class="card-img-bg"></div>
            <div class="card-body">
                <div class="row mb-4">
                    <h5 class="card-title col-8 m-0 text-truncate">${recipe.name}</h5>
                    <div class="col-4 d-flex align-items-center">
                        <i class="far fa-clock mr-1"></i>
                        <p class="m-0">${recipe.time} min</p>
                    </div>   
                </div>
                <div class="row">
                    <div class="col-6 d-flex flex-column">
                        ${generateIngredients(recipe.ingredients)}
                    </div>
                    <small class="col-6 card-text text-left text-truncate text-truncate--2">
                        ${recipe.description}
                    </small>   
                </div>
            </div>
        </div>
        `
    ).join('')
    recipesList.innerHTML = htmlString
}

function updateFilters(textValue)
{
    // Always update recipes to the initial values
    filteredRecipes = recipes
    textValue.length >= 3 ? searchBarFiltering(textValue) : searchString = ""
    currentlySelectedUtensils.length >= 1 && utensilFiltering()
    currentlySelectedIngredients.length >= 1 && ingredientFiltering()
    currentlySelectedDevices.length >= 1 && deviceFiltering()

    if(filteredRecipes.length >= 1) 
        if(filteredRecipes.length !== recipes.length) displayRecipes(filteredRecipes)
        else displayRecipes([])
    else displayNoRecipe()
}

function displayNoRecipe()
{
    recipesList.innerHTML = `<div class="my-5 w-100 text-center lead">No recipe matches your criteria... you can search for "apple pie", "fish" etc....</div>`
}