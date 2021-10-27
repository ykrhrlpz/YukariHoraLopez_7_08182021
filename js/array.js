// create an array of Ingredients
let ingredientsGroup = []
function createIngredientsArray()
{
    // for each loop to get array of ingredient
    recipes.forEach(recipe => recipe.ingredients.forEach(item => 
    {
        if(!ingredientsGroup.includes(item.ingredient.toLowerCase())) 
            ingredientsGroup.push(item.ingredient.toLowerCase())
    }))

    return ingredientsGroup
}

createIngredientsArray()

// create an array of Devices
let devicesGroup = []
function createDevicesArray()
{
    recipes.forEach(recipe => 
    {
        if(!devicesGroup.includes(recipe.appliance.toLowerCase()))
            devicesGroup.push(recipe.appliance.toLowerCase())
    })
    return devicesGroup
}

createDevicesArray()

// create an array of Utensils
let utensilsGroup = []
function createUtensilsArray()
{
     recipes.forEach(recipe => 
        recipe.ustensils.forEach(item => 
        {
            if(!utensilsGroup.includes(item.toLowerCase()))
                utensilsGroup.push(item.toLowerCase())
        }))

    return utensilsGroup;
}

createUtensilsArray()

function generateDropboxItems(arr) 
{
	return arr.map(item => 
        `
        <li class="dropdown-item col-4">
            ${item.charAt(0).toUpperCase() + item.slice(1)}
        </li>
        `)
        .join('')
}