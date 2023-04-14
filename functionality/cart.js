import { getElement } from "../utils/util.js";
const container = getElement('.container');

var httpRequest;
const url = 'http://localhost:9090/api/cart/1';
var food_url = 'http://localhost:9090/api/item/'
var food_ids = [];
var foodItems = [];

makeRequest(url);

function makeRequest(url){
    httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',url,true);

    httpRequest.onreadystatechange = getCartItems;
    httpRequest.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaGl2YW1AZ21haWwuY29tIiwiZXhwIjoxNjgxNDg5MzY3LCJpYXQiOjE2ODE0ODc1Njd9.Cc6L3cUFtVrssO9HxiARdCBkzOuY9yJM3uEX_Y0wtBWoFTSg3UYdbAg9DqOeZGtRvYUEnc_lZa49aggJ19Wm6A');
    httpRequest.send();
}


function getCartItems(){
    if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
        const response = JSON.parse(httpRequest.responseText);
        // console.log(response.food_item);
        // console.log(response.food_item);
        getFoodItems(response.food_item[0],response.food_item.length);
        // console.log(foodItems);
    }
}

var m = 0;
function getFoodItems(i,length) {
    // console.log('food url: '+food_url+i);

    if (m>=length) {
        console.log('food items array: '+ foodItems);
        setItems(foodItems);
        return;
    }

    const foodRequest = new XMLHttpRequest();
    foodRequest.open('GET',food_url+i,true);
    foodRequest.onload=()=>{
        foodItems.push(foodRequest.responseText);
        // console.log('item: '+foodRequest.responseText)
        m++;
        getFoodItems(i+1,length);

    }
    foodRequest.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaGl2YW1AZ21haWwuY29tIiwiZXhwIjoxNjgxNDg5MzY3LCJpYXQiOjE2ODE0ODc1Njd9.Cc6L3cUFtVrssO9HxiARdCBkzOuY9yJM3uEX_Y0wtBWoFTSg3UYdbAg9DqOeZGtRvYUEnc_lZa49aggJ19Wm6A');
    foodRequest.send();

    // if (foodRequest.readyState === XMLHttpRequest.DONE && foodRequest.status === 200) {
    //     console.log('food items array: '+ foodItems);
    // }
}

function setItems(foods){

    // console.log(container);

    var str = foods.map((item)=>{
        const element = JSON.parse(item);

        return ``;

        
    }).join('');

    // <!--single item here -->
    //       <div class="card">
    //         <div class="card-container">
    //           <img src="" alt="item image" class="item-image" />
    //           <h3 class="item-name">item name</h3>
    //           <div class="card-btns">
    //             <button class="incease">
    //               <i class="fa fa-plus-square"></i>
    //             </button><span>0</span
    //             ><button class="decrease">
    //               <i class="fa fa-minus-square"></i>
    //             </button>
    //           </div>
    //           <span>$12</span>
    //           <button class="trash-btn">
    //             <i class="fa fa-trash"></i>
    //           </button>
    //         </div>
    //       </div>

    container.innerHTML = str;

}