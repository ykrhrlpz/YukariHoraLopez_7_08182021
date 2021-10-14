
// Selectbox----------------------------------------

// const selected = document.querySelector('.selected')
// const optionContainer = document.querySelector('.options-container')
// const searchBox = document.querySelector('.search-box input')

// const optionsList = document.querySelectorAll('.option')

// selected.addEventListener('click', () => {
//     optionContainer.classList.toggle("active")

//     //Refresh input value every time they close dropbox
//     searchBox.value = ""
//     filterList("")

//     //gives focus directly when users open droobox
//     if (optionContainer.classList.contains("active"))
//     {
//         searchBox.focus()
//     }    
// })

// optionsList.forEach( option => {
//     option.addEventListener('click', () => {
//         selected.innerHTML = option.querySelector('label').innerHTML
//         optionContainer.classList.remove('active')
//     })
// } )

// searchBox.addEventListener('keyup', function(e) {
//     filterList(e.target.value)
// })

// function filterList(searchTerm)
// {
//     searchTerm = searchTerm.toLowerCase()
//     optionsList.forEach(option => {
//         let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase()
//         if (label.indexOf(searchTerm) != -1)
//         {
//             option.style.display = "block"
//         }
//         else
//         {
//             option.style.display = "none"
//         }
//     });
// }

// Dropdown

// var myArray = new Array("1", "2", "3", "4", "5");


// // Get dropdown element from DOM
// var dropdown = document.getElementById("selectNumber");

// // Loop through the array
// for (var i = 0; i < myArray.length; ++i) {
//     // Append the element to the end of Array list
//     dropdown[dropdown.length] = new Option(myArray[i], myArray[i]);
// }

// console.log(dropdown);


/* Dropdown with search bar */
