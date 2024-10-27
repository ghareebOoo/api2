$(".fa-bars").on("click", function() {
    $(this).toggleClass("fa-xmark");
    $(".sidebar").toggleClass("move");
    $(".sidebar .links ul a").toggleClass("top");
});

$(".loading .loader").fadeOut(3000, function() {
    $(".loading").hide(); 
});



async function fetchMealData() {
    try {
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        let data = await response.json();
        const container = document.querySelector(".my-image");
        let myData = '';
        if (data.meals) {
            data.meals.forEach(meal => {
                myData += `
                <div class="image" onclick = "informationMeal('${meal.idMeal}')">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="layer">
                        <h2>${meal.strMeal}</h2>
                    </div>
                </div>
                `;
            });
            container.innerHTML = myData; 
        }
    } catch(error) {
        console.error("meal error");
    }
}
fetchMealData();


async function informationMeal(mealId){
    try{
        let container = document.querySelector(".my-image");
        container.innerHTML="";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        let data = await response.json()
        let defaultMeal = document.querySelector(".information");
        let myData = "";
        if(data.meals){
            data.meals.forEach(meal=>{
                myData += `
                <div class = "info" >
                <div class = "image">
                <img src ="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <h2>${meal.strMeal}</h2>
                </div>
                <div class="instrc">
                <h3>Instructions</h3>
                <p>${meal.strInstructions}</p>
                <h4>Area:${meal.strArea}</h4>
                <h5>Category:${meal.strCategory}</h5>
                <ul>
                Recipes :
                <li>${meal.strMeasure1}</li>
                <li>${meal.strMeasure2}</li>
                <li>${meal.strMeasure3}</li>
                <li>${meal.strMeasure4}</li>
                <li>${meal.strMeasure5}</li>
                <li>${meal.strMeasure6}</li>
                <li>${meal.strMeasure7}</li>
                </ul>
                <div class="my-span">Tags :
                <span>${meal.strTags}</span>
                <div>
                   <a href="${meal.strSource}" target="_blank">source</a>
                   <a href="${meal.strYoutube}" target="_blank">youtube</a>
                </div>
                </div>
                </div>
                </div>
                `
            })
            defaultMeal.innerHTML = myData;
        }
    }catch(error){
        console.error("Error info");
    }
}
informationMeal();

async function searchName() {
    let querry = document.querySelector(".input-name").value; 
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${querry}`);
        let data = await response.json();
        const container = document.querySelector(".default");
        let myData = '';
        if(data.meals){
            data.meals.forEach(search=>{
                myData +=`
                <div class="image">
                <img src="${search.strMealThumb}" alt="${search.strMeal}"/>
                <div class="layer">
                <h2>${search.strMeal}</h2>
                </div>
                </div>
                `
            })
            container.innerHTML = myData;
        }
    } catch (error) {
        console.error("Error search");
    }
}
document.querySelector(".input-name").addEventListener("input", searchName);

async function searchLetter() {
    let letter = document.querySelector(".input-letter").value; 
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        let data = await response.json();
        let container = document.querySelector(".default");
        let myData = '';
        if(data.meals){
            data.meals.forEach(search=>{
                myData +=`
                <div class="image">
                <img src="${search.strMealThumb}" alt="${search.strMeal}"/>
                <div class="layer">
                <h2>${search.strMeal}</h2>
                </div>
                </div>
                `
            })
            container.innerHTML = myData;
        }
    } catch (error) {
        console.error("Error search");
    }
}
document.querySelector(".input-letter").addEventListener("input", searchLetter);

async function fetchCategory() {
    try {
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        let data = await response.json();
        let container = document.querySelector(".my-categories");
        let myData = '';
        if (data.categories) {
            data.categories.forEach(category => {
                myData += `
                <div onclick="sameCategory('${category.strCategory}')" class="image">
                    <img  src="${category.strCategoryThumb}" alt="${category.strCategory}"/>
                    <div class="layer">
                        <h2>${category.strCategory}</h2>
                        <p>${category.strCategoryDescription.slice(0, 80)}</p>
                    </div>
                </div>
                `;
            });
            container.innerHTML = myData; 
        }
    } catch (error) {
        console.error("Error fetching categories");
    }
}
fetchCategory();

 async function sameCategory(category) {
    try {
        let container = document.querySelector(".my-categories");
        container.innerHTML = "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        let data = await response.json();
        const defaultCategories = document.querySelector(".default");
        let myData = ""; 
        if(data.meals){
            data.meals.forEach(category=>{
                myData += `
                <div class="image">
                    <img  src="${category.strMealThumb}" alt="${category.strMeal}"/>
                    <div class="layer">
                        <h2>${category.strMeal}</h2>
                    </div>
                </div>
                `;
            })
            defaultCategories.innerHTML = myData;
        }
    } catch (error) {
        console.error("Error fetching same category");
    }
}


async function areaFetch() {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let data = await response.json();
        let container = document.querySelector(".my-area");
        let myData = '';
        if (data.meals) {
            data.meals.forEach(area => {
                myData += `
                <div onclick = "sameArea('${area.strArea}')">
                   <i class="fa-solid fa-house-laptop"></i>
                   <h2>${area.strArea}</h2>
                </div>
                `;
            });
            container.innerHTML = myData; 
        }
    } catch (error) {
        console.error("error ingrident");
    }
}
areaFetch();
let areaAnchor = document.querySelector(".area");
areaAnchor.addEventListener("click" , areaFetch);
async function sameArea(category) {
    try {
        let container = document.querySelector(".my-area");
        container.innerHTML = "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${category}`);
        let data = await response.json();
        let defaultArea = document.querySelector(".default");
        let myData = '';
        if(data.meals){
            data.meals.forEach(area=>{
                myData += `
                <div class="image">
                    <img  src="${area.strMealThumb}" alt="${area.strMeal}"/>
                    <div class="layer">
                        <h2>${area.strMeal}</h2>
                    </div>
                </div>
                `;
            })
            defaultArea.innerHTML = myData;
        }
    } catch (error) {
        console.error("Error in sameArea function");
    }
};


async function ingredientFetch() {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let data = await response.json();
        data.meals.length = 22;
        let container = document.querySelector(".my-ingredients");
        let myData = '';
        if (data.meals) {
            data.meals.forEach(ingrid => {
                myData += `
                <div onclick = " sameIngred('${ingrid.strIngredient}')">
                   <i class="fa-solid fa-drumstick-bite"></i>
                   <h2>${ingrid.strIngredient}</h2>
                   <p>${ingrid.strDescription.slice(0 , 40)}</p>
                </div>
                `;
            });
            container.innerHTML = myData; 
        }
    } catch (error) {
        console.error("error ingrident");
    }
}
ingredientFetch();
let ingredientAnchor = document.querySelector(".ingredient"); 
ingredientAnchor.addEventListener("click", ingredientFetch);


 async function sameIngred(category){
    try{
        let container = document.querySelector(".my-ingredients");
        container.innerHTML = '';
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${category}`);
        let data = await response.json();
        let defaultIngredint = document.querySelector(".default");
        let myData = '';
        if(data.meals){
            data.meals.forEach(ingredint=>{
                myData += `
                <div class="image">
                    <img  src="${ingredint.strMealThumb}" alt="${ingredint.strMeal}"/>
                    <div class="layer">
                        <h2>${ingredint.strMeal}</h2>
                    </div>
                </div>
                `;
            })
            defaultIngredint.innerHTML = myData;
        }
    }catch(error){
        console.error("Error sameIngred");
    }
}


let Myname = document.querySelector(".input-name");
let email = document.querySelector(".input-email");
let phone = document.querySelector(".input-phone");
let age = document.querySelector(".input-age");
let pass = document.querySelector(".input-pass");
let repass = document.querySelector(".input-repass");
let submit = document.querySelector(".contact button");


let nameRegex = /^[A-Z][a-z]{2,}\s[A-Z][a-z]{2,}/;
let emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
let phoneRegex = /\d+/;
let ageRegex = /\d+/;
let passwordRegex = /^[A-Z][a-z]{3,}\d+/;
let RepasswordRegex = /^[A-Z][a-z]{3,}\d+/;

function validate(ele ,regex){
    if(regex.test(ele.value)){
        return true;
    }
}
Myname.oninput = function(){
   if( validate(Myname , nameRegex)){
    Myname.nextElementSibling.style.display = "none";
   }else{
    Myname.nextElementSibling.style.display = "block";
   }
}
email.oninput = function(){
    if( validate(email , emailRegex)){
     email.nextElementSibling.style.display = "none";
    }else{
     email.nextElementSibling.style.display = "block";
    }
}
phone.oninput = function(){
    if( validate(phone , phoneRegex)){
     phone.nextElementSibling.style.display = "none";
    }else{
     phone.nextElementSibling.style.display = "block";
    }
}
age.oninput = function(){
    if( validate(age , ageRegex)){
     age.nextElementSibling.style.display = "none";
    }else{
     age.nextElementSibling.style.display = "block";
    }
}
pass.oninput = function(){
    if( validate(pass , passwordRegex)){
     pass.nextElementSibling.style.display = "none";
    }else{
     pass.nextElementSibling.style.display = "block";
    }
}
repass.oninput = function(){
    if( validate(repass , RepasswordRegex)){
     repass.nextElementSibling.style.display = "none";
    }else{
     repass.nextElementSibling.style.display = "block";
    }
}

submit.onclick = function() {
    if (
        validate(Myname, nameRegex) &&
        validate(email, emailRegex) &&
        validate(phone, phoneRegex) &&
        validate(age, ageRegex) &&
        validate(pass, passwordRegex) &&
        validate(repass, RepasswordRegex) &&
        pass.value === repass.value 
    ){
        submit.style.color = "white";
        submit.style.cursor = "pointer";
        submit.style.backgroundColor = "red";
        submit.style.borderColor = "red";
        submit.style.outline = "4px solid #ff000059";
    }
}










