
document.getElementById('error').style.display = 'none'

const loadCategories = ()=>{

    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    .then(res => res.json())
    .then(data => displayFood(data.categories))
}

loadCategories()
const displayCategories = (categories)=>{

   const categoriesDisplay = document.getElementById('categories')

    categories.forEach(category => {
        const div = document.createElement("div");
        div.classList.add('border-2','px-2','rounded','bg-blue-500')
        div.innerHTML = `
        <div onclick="loadMealDetails(${category.idCategory})" class="cursor-pointer">
            <img class="h-[250px] w-full" src="${category.strCategoryThumb}" alt="">
            <div>
                <h3 class="font-2xl my-2 font-semibold">${category.strCategory}</h3>
                <p>${category.strCategoryDescription.slice(0, 150)}</p>
                </div>
            </div> 
       
         `

         categoriesDisplay.appendChild(div)
    })


}

document.getElementById('search-button').addEventListener('click', function () {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value

    if (searchInput.value = "") {
        document.getElementById('error').style.display = 'block'
        return

    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
            .then(res => res.json())
            .then(data => displayFood(data.meals))
    }

})

const displayFood = (foods) => {

    if (foods == null) {
        document.getElementById('error').style.display = 'block'
    }

    const displayDiv = document.getElementById('search-display');

    displayDiv.innerHTML = ''

    const displaySingleFood = document.getElementById('display-single-food');

    // === clear the previous content ====//

    displaySingleFood.textContent = ""

    // clear the categories
    const categoryDisplay = document.getElementById('categories')
    categoryDisplay.innerHTML = ""


    foods.forEach(food => {
        const div = document.createElement("div");
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetails(${food.idMeal})" class="cursor-pointer">
            <img class="h-[250px] w-full" src="${food.strMealThumb}" alt="">
            <div>
                <h3 class="font-2xl my-2 font-semibold">${food.strMeal}</h3>
                <p>${food.strInstructions.slice(0, 150)}</p>
                </div>
            </div> 
       
         `
        document.getElementById('error').style.display = 'none'

        displayDiv.appendChild(div)
    })

    const searchInput = document.getElementById('search-input');
    searchInput.value = ""
}

const loadMealDetails = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => displaySingleFood(data.meals[0]))
}


const displaySingleFood = (food) => {

    const displaySingleFood = document.getElementById('display-single-food');

    // === clear the previous content ====//

    displaySingleFood.textContent = ""
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="my-10">
            <img class="w-full h[500px] " src="${food.strMealThumb}" alt="">
            <div>
                <h3 class="font-2xl my-2 font-semibold">${food.strMeal}</h3>
                <p>${food.strInstructions}</p>
                </div>
            </div> 
    
        `
    displaySingleFood.appendChild(div)
}