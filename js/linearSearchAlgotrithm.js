let array = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

let ingredientsArray = [ "apple", "banana", "coconut", "pineapple", "cheese", "egg" ]

function linearSearch(arr, elem)
{
    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i] === elem)
        {

        //get the index of the element
            return i
        }
    }
    // return -1
    return 'No recipe matches your ctiteria...You can search for "apple pie", "fish" etc...';
}


console.log(linearSearch(ingredientsArray, "Eggplant"));

