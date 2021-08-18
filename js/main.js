const searchForm = document.querySelector('form')
const searchResultDiv = document.querySelector('.search-result')
const container = document.querySelector('container')
let searchQuery = ''

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    searchQuery = e.target.querySelector('input').value
    console.log(searchQuery);
})

function fetchData()
{
    generateHTML(recipes)
}

function generateHTML(results)
{
    let generatedHTML = ''
    results.map(result => {
        generatedHTML +=
        `
        <div class="card">
            <div class="card-img-bg"></div>
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 class="card-title">${result.name}</h5>
                    <div class="position-relative w-50 text-right">
                        <i class="far fa-clock watch-icon"></i>
                        <p class="card-text">${result.time} min</p>
                    </div>
                    
                </div>
                <div class="d-flex flex-column justify-content-between pb-3">
                    
                    ${generatIngredients(result.ingredients)}

                    <small class="col-6 card-text text-left p-0">
                    ${result.description}
                    </small>
                </div>
            </div>
        </div>
    
        `
    })
    .join('')

    searchResultDiv.innerHTML = generatedHTML
}

fetchData()

function generatIngredients(ingredients) 
{
	return ingredients.map(ingredient => 
    `
        <small class="card-text"><strong>${ingredient.ingredient}:</strong> ${ingredient.quantity ? ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}</small>
    `).join('')
}