/**
 * TODO:
 * @ SHOW FOOD ITEMS
 * @ SHOW PRICE AND ADD TO CART
 * @ DESIGN CART PAGE/CARD
 * @ SHOW DETAILS OF FOOD
 * @ USING MEAL DB API
 *
 */

const getFoods = () => {
  const data = document.getElementById('search-field');
  const searchBy = document.getElementById("search-by");
  const searcHtml = `Search By: <b>${data.value ? data.value : 'ALL'}</b>`;
  searchBy.innerHTML =  searcHtml;
  toggleSpinner('block');
  // Get food item using meal db api
  fetchFoods(data.value);
  data.value = '';
  return false;
}

/**
 * TODO:
 * @param {Disply block/none} displyHandler 
 */
const toggleSpinner = displyHandler => {
  document.getElementById('spinner').style.display = displyHandler;

  let contentDisplay = displyHandler === 'none' ? 'block' : 'none';
  document.querySelector(".search-content").style.display =
    contentDisplay;
}


/**
 * TODO:
 * @param {Getting food list using Meal DB API based on search data} data 
 */
const fetchFoods = data => {
  const foodName = data;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
  fetch(url)
  .then(response => response.json())
  .then( data => displayFoods(data.meals))
  .catch(() => dataNotFound())
}


/**
 * TODO:
 * @ Will work when data not found
 */
const dataNotFound = () => {
  const searchBy = document.getElementById('search-by').innerText;
  const notFound = `<div class="food-item text-center">
                      <img src="" class="w-100">
                      <h4 class="mt-1">Nothing exists here</h4>
                      <p>We couldn't find any results for your search. (${searchBy})</p>
                    </div>`;
  document.getElementById("display-foods").innerHTML = notFound;
  toggleSpinner("none");
}


/**
 * TODO:
 * @param {Show all food items beased on search data} data 
 */
const displayFoods = data => {

  let html = '';
  for (const item of data) {

    html += `<div class="col-md-3 mt-3">
                <div class="food-item">
                  <img src="${item.strMealThumb}" class="w-100"/>
                  <div class="d-flex justify-content-between mt-3">
                    <h4>${item.strMeal}</h4>
                    <span onclick="foodDetails(${item.idMeal})" class="btn btn-danger">View Details</span>
                  </div>
                </div>
              </div>`;
  }
  document.getElementById('display-foods').innerHTML = html;
  toggleSpinner("none");
}


/**
 * TODO: 
 * @param {Show Food Deatils information: API Calls} mealId 
 */
const foodDetails = mealId => {
  toggleSpinner("block");
  const detailsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(detailsUrl)
  .then(response => response.json())
  .then(data => displayDetails(data.meals))
  .catch(error => console.log(error))
}


/**
 * TODO: 
 * @param {Disply Details information based on food id} data 
 */
const displayDetails = data => {
  console.log(data);
    let html = "";
    for (const item of data) {
      html += `<div class="row food-item pt-4 pb-4">
                  <div class="col-md-4">
                    <img src="${item.strMealThumb}" class="img-fluid rounded-start" alt="thumb" />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${item.strMeal}</h5>
                      <p class="card-text">
                        ${item.strInstructions}
                      </p>
                    </div>
                  </div>
                </div>`;
    }
    document.getElementById("display-foods").innerHTML = html;
    toggleSpinner("none");
}

// Calls Main Method for show all items
getFoods();