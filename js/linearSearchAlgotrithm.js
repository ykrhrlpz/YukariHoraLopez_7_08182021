
// let list = ['a1b', 'c2a', 'b3c', 'a2b']
const recipesList = document.getElementById('recipesList')
const searchBar = document.getElementById('searchWrapper')


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

let filteredRecipes = recipes

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase()

  
    // Filter recipe only when a user enters more than 3 letters in the search bar 
    if (searchString.length > 2) 
    {
        filteredRecipes = recipes.filter(recipe => 
        recipe.name 
        && 
            linearSearch(recipe.name.toLowerCase(), searchString)
        || 
        recipe.ingredients 
        &&
            // returning true if it finds ingredient, if not, return false
            recipe.ingredients.filter(item => linearSearch(item.ingredient.toLowerCase(), searchString)).length > 0
        ||
        recipe.description
        &&
            linearSearch(recipe.description.toLowerCase(), searchString)) 
        displayRecipes(filteredRecipes)
        console.log(filteredRecipes);
    }  

    // to be removed after taking care of onblur event
    else
    {
        filteredRecipes = recipes
        displayRecipes(filteredRecipes)
    }
})



function generateIngredients(ingredients) 
{
	return ingredients.map(ingredient => 
    `
        <small class="card-text mb-1"><strong>${ingredient.ingredient}:</strong> ${ingredient.quantity ? ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}</small>
    `).join('')
}

function displayRecipes(recipes)
{
    const htmlString = recipes.map((recipe) => {

        return `
        <div class="card col-4 mb-4">
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
    })
    .join('')
    recipesList.innerHTML = htmlString
}

function fetchData()
{
    displayRecipes(recipes)
}


// fetchData()

