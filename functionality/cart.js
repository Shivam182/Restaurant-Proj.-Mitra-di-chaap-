import { getElement } from "../utils/util.js";
const container = getElement(".container");

var httpRequest;
const url = "http://localhost:9090/api/cart/1";
var food_url = "http://localhost:9090/api/item/";
var imgURL = "http://localhost:9090/api/item/image/";
var food_ids ;
var foodItems = [];
var cart;

makeRequest(url);

function makeRequest(url) {
  httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, true);

  httpRequest.onreadystatechange = getCartItems;
  httpRequest.setRequestHeader(
    "Authorization",
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaGl2YW1AZ21haWwuY29tIiwiZXhwIjoxNjgxNjMxMDY0LCJpYXQiOjE2ODE2MjkyNjR9.M7iVZ8npycgcnGg0-G7DJKAwxD8A9IC1ThbrdVrOAAoXaBBRPeWuis438e_7HEI-J9gFfL7fHc-LJ77UyRbMvQ"
  );
  httpRequest.send();
}

function getCartItems() {
  if (
    httpRequest.readyState === XMLHttpRequest.DONE &&
    httpRequest.status === 200
  ) {
    const response = JSON.parse(httpRequest.responseText);
    console.log("cart: " + JSON.stringify(response));
    cart = response;
    console.log('food item: '+ JSON.stringify(response.food_item));
    food_ids = response.food_item;
    const countCards = Object.keys(food_ids).length;
    const firstKey = Object.keys(food_ids)[0];
    // console.log(response.food_item);

    getFoodItems(parseInt(firstKey), countCards);
    // console.log(foodItems);
  }
}


var m = 0;
function getFoodItems(i, length) {
  // console.log('food url: '+food_url+i);

  if (m >= length) {
    console.log("food items array: " + foodItems);
    setItems(foodItems);
    return;
  }

  const foodRequest = new XMLHttpRequest();
  foodRequest.open("GET", food_url + i, true);
  foodRequest.onload = () => {
    foodItems.push(foodRequest.responseText);
    // console.log('item: '+foodRequest.responseText)
    m++;
    getFoodItems(i + 1, length);
  };
  foodRequest.setRequestHeader(
    "Authorization",
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaGl2YW1AZ21haWwuY29tIiwiZXhwIjoxNjgxNjMxMDY0LCJpYXQiOjE2ODE2MjkyNjR9.M7iVZ8npycgcnGg0-G7DJKAwxD8A9IC1ThbrdVrOAAoXaBBRPeWuis438e_7HEI-J9gFfL7fHc-LJ77UyRbMvQ"
  );
  foodRequest.send();

  // if (foodRequest.readyState === XMLHttpRequest.DONE && foodRequest.status === 200) {
  //     console.log('food items array: '+ foodItems);
  // }
}

function setItems(foods) {

    console.log(Object.values(food_ids));
    var i = 0;
  // console.log(container);
    // console.log('apna cart ' +JSON.stringify(cart))
  var str = foods
    .map((item) => {
      const element = JSON.parse(item);
        // console.log(JSON.parse(element))
        // console.log(element)
        const itemId = element.itemId;
        // console.log('count : '+ food_ids.itemId);
      return `
        <div class="card">
          <div class="card-container">
            <img src="${
              imgURL + itemId
            }" alt="item image" class="item-image" />
            <h3 class="item-name">${element.title}</h3>
            <div class="card-btns">
              <button class="increase">
                <i class="fa fa-plus-square"></i>
              </button><span>${Object.values(food_ids)[i++]} </span
              ><button class="decrease">
                <i class="fa fa-minus-square"></i>
              </button>
            </div>
            <span>$${cart.total}</span>
            <button class="trash-btn">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
`;
    })
    .join("");

  container.innerHTML = str;
}
