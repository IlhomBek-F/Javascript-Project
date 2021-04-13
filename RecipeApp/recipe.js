const mealsEl = document.getElementById("meals");
const favId = document.getElementById("favorite");
const searchMeal = document.getElementById("searchMeal");
const searchBtn = document.getElementById("search");
const showFavoriteMeals = document.getElementById("your-favorite-meals");
const showUl = document.getElementById("favorite-meal");

const mealInfo = document.getElementById("meal-container");

getRandom();
fetchFavMeal();

async function getRandom() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const resData = await response.json();

  const reandomMeal = resData.meals[0];

  console.log(reandomMeal);

  addMeal(reandomMeal, true);

  // mealInformation(reandomMeal);
}

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );

  const responData = await resp.json();

  const responMeal = responData.meals[0];

  return responMeal;
}

async function getMealBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const respData = await resp.json();
  const meals = await respData.meals;

  return meals;
}

// function mealInformation(mealData) {
//   console.log(mealData);
// }

function addMeal(mealData, random = false) {
  const newMealDiv = document.createElement("div");
  newMealDiv.classList.add("meal");
  newMealDiv.innerHTML = `<div class="meal-header">

  ${random ? '    <span class="random">Random Recipe</span>  ' : ""}
    <img
      src="${mealData.strMealThumb}"
    />
  </div>
  <div class="meal-body">
    <h4>${mealData.strMeal}</h4>
    <button class="favBtn fav-btn"><i class="fa fa-heart"></i></button>
    <a  href="${
      mealData.strYoutube
    }" target="_blank" ><button class="favBtn youtube"><i class="fab fa-youtube"></i></button></a>
    <a href="${mealData.strSource} "target="_blank">
<button class="favBtn" id="infoBtn"><i class="fas fa-info"></i></button>
</a>
    </div>
</div>`;

  const btn = newMealDiv.querySelector(".meal-body .favBtn");

  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealFromLocal(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      AddtoLocal(mealData.idMeal);
      btn.classList.add("active");
      fetchFavMeal();
    }
  });

  mealsEl.appendChild(newMealDiv);
}

function AddtoLocal(jsonMealId) {
  const mealIds = getFromLocal();

  localStorage.setItem(
    "mealForLocal",
    JSON.stringify([...mealIds, jsonMealId])
  );
}

function removeMealFromLocal(jsonMealId) {
  const mealIds = getFromLocal();

  localStorage.setItem(
    "mealForLocal",
    JSON.stringify(mealIds.filter((id) => id !== jsonMealId))
  );
}

function getFromLocal() {
  const mealIds = JSON.parse(localStorage.getItem("mealForLocal"));

  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeal() {
  const mealIds = getFromLocal();
  favId.innerHTML = "";
  showUl.innerHTML = "";

  for (var i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];

    meal = await getMealById(mealId);

    addMealToFavorite(meal);
  }
}

function addMealToFavorite(favMeal) {
  const favLi = document.createElement("li");
  favLi.innerHTML = `<img
       src="${favMeal.strMealThumb}"
       alt=""
     /><span>${favMeal.strMeal}</span>
   
  `;

  favId.appendChild(favLi);
}

searchBtn.addEventListener("click", async () => {
  const valueSearch = searchMeal.value;
  const meals = await getMealBySearch(valueSearch);

  if (valueSearch === "") {
    alert("Please enter your meal's name!");
  } else {
    meals.forEach((element) => {
      addMeal(element);
    });
  }

  searchMeal.value = "";
});

showFavoriteMeals.addEventListener("click", () => {
  fromFavToRandom();
});

async function fromFavToRandom() {
  const mealIds = getFromLocal();
  for (var i = 0; i < mealIds.length; i++) {
    const mealId = await mealIds[i];
    meal = await getMealById(mealId);
    showFavMeal(meal);
  }
}

function showFavMeal(meal) {
  const showFavoriteMeal = document.createElement("li");
  showFavoriteMeal.innerHTML = `
   <img
     src="${meal.strMealThumb}"
     alt=""
   />
   <div class="li">
   <h4>${meal.strMeal}</h4>
   <div class="icons">
   <button id="trash" class="favBtn  fav-btn"><i class="fa fa-trash"></i></button>
         <a  href="${meal.strYoutube}" target="_blank" ><button class="favBtn youtube"><i class="fab fa-youtube"></i></button></a>
          <a href="${meal.strSource} "target="_blank">
      <button onclick="location.reload()" class="favBtn" id="infoBtn"><i class="fas fa-info"></i></button>
      </a>
      </div>
      </div>
   `;

  const clearBtn = showFavoriteMeal.querySelector("#trash");

  clearBtn.addEventListener("click", () => {
    removeMealFromLocal(meal.idMeal);
    fetchFavMeal();
    getRandom();
  });

  showUl.appendChild(showFavoriteMeal);
  mealsEl.innerHTML = "";
}
