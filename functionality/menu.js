import { getElement, getStorage } from "../utils/util.js";
const cards_div = getElement(".cards");
const priceSelector = getElement("#price-slider");
const food_cards = document.getElementsByClassName('food-card');


/**
 * 1. Make all requests very arranged & minimal.
 * 2. Make Use of JS Promise API.
 * 3. Use all the event handlers.
 */




var httpRequest;
const url = "http://localhost:9090/api/items";

var httpRe1;
var cat;
var selectCatURL;

var httpRe2;
var catId = 0;

var fileteredUrl;

var selectPrice;
var httpRe3;
var priceURL;

var userUrl;
var addToCartUrl;

var userId;
var foodItemId;

const filters = getElement(".filter-items");

var token = getStorage('token');

// const myPromise = new Promise((resolve, reject)=>{

  priceSelector.addEventListener("change", (e) => {
    selectPrice = e.target.value;
    priceURL = `http://localhost:9090/api/item/price/10/${selectPrice}`;
  
    getItemsByPrice(priceURL);
    cards_div.innerHTML = '';
  });
  
  function getItemsByPrice(url) {
    httpRe3 = new XMLHttpRequest();
    httpRe3.open("GET", url, true);
    httpRe3.onreadystatechange = setItemsByPrice;
    httpRe3.send();
  }
  
  function setItemsByPrice() {
    if (httpRe3.readyState === XMLHttpRequest.DONE && httpRe3.status === 200) {
      var res = JSON.parse(httpRe3.responseText);
  
      var str = res
        .map((item) => {

          const id = item.id;

          return ` <!-- single card -->
        <div class="food-card">
          <div class="card-content" id="${id}">
            <h3 class="item-title">${item.title}</h3>
            <img
              src="${item.image1}"
              alt="item image"
              class="item-image"
            />
            <p class="mini-description">
              ${item.description}
            </p>
            <div class="inner-container">
             
            <button class="add-order">Add</button>
            <h3 class="price">$${item.price}</h3>
            </div>
          
          </div>
        </div>
        <!-- end of single card -->`;
        })
        .join("");
  
      cards_div.innerHTML = str;
      // resolve();
      k();
    }
  }
  
  
  
  function getFilteredItems(url) {
    httpRe2 = new XMLHttpRequest();
    httpRe2.open("GET", url, true);
    httpRe2.onreadystatechange = setFilteredItems;
    httpRe2.send();
  }
  
  function setFilteredItems() {
    if (httpRe2.readyState === XMLHttpRequest.DONE && httpRe2.status === 200) {
      var response = JSON.parse(httpRe2.responseText);
  
      var str = response
        .map((item) => {

         const id = item.itemId;

          return ` <!-- single card -->
        <div class="food-card" id="${id}">
          <div class="card-content">
            <h3 class="item-title">${item.title}</h3>
            <img
              src="${item.image1}"
              alt="item image"
              class="item-image"
            />
            <p class="mini-description">
              ${item.description}
            </p>
            <div class="inner-container">
             
            <button class="add-order">Add</button>
            <h3 class="price">$${item.price}</h3>
            </div>
          
          </div>
        </div>
        <!-- end of single card -->`;
        })
        .join("");
  
      cards_div.innerHTML = str;
      // resolve();
      k();
    }
  }
  
  makeRequest(url);
  
  function makeRequest(url) {
    httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url, true);
    httpRequest.onreadystatechange = setFoodItems;
    httpRequest.send();
  }
  
  function setFoodItems() {
    if (
      httpRequest.readyState === XMLHttpRequest.DONE &&
      httpRequest.status === 200
    ) {
      const response = JSON.parse(httpRequest.responseText);

      // console.log(JSON.stringify(response));

      

      var str = response.content
        .map((item) => {

            // console.log(item.itemId);
            const id = item.itemId;

          return ` <!-- single card -->
              <div class="food-card" id="${id}">
                <div class="card-content">
                  <h3 class="item-title">${item.title}</h3>
                  <img
                    src="${item.image1}"
                    alt="item image"
                    class="item-image"
                  />
                  <p class="mini-description">
                    ${item.description}
                  </p>
                  <button class="add-order">Add</button>
                  <h3 class="price">$${item.price}</h3>
                
                </div>
              </div>
              <!-- end of single card -->`;
        })
        .join("");
  
      cards_div.innerHTML = str;
      // resolve();
      k();
    }
  }
  
  
  filters.addEventListener("click", (e) => {
    cat = e.target.textContent;
    selectCatURL = `http://localhost:9090/api/categories/name/${cat}`;
  
    getCategory(selectCatURL);
  
    if (catId === 0) {
      fileteredUrl = url;
    } else {
      fileteredUrl = `http://localhost:9090/api/category/${catId}/items`;
      getFilteredItems(fileteredUrl);
      // makeRequest(fileteredUrl);
      cards_div.innerHTML = '';
    }
  });
  
  function getCategory(url) {
    httpRe1 = new XMLHttpRequest();
    httpRe1.open("GET", url, true);
    httpRe1.onreadystatechange = setCat;
    httpRe1.send();
  }
  
  function setCat() {
    if (httpRe1.readyState === XMLHttpRequest.DONE && httpRe1.status === 200) {
      var res = JSON.parse(httpRe1.responseText);
      catId = res.categoryId;
    }
  }

  


// });


function k(){

  

  for(let i  = 0; i < food_cards.length; i++){
      
      food_cards[i].addEventListener('click', (e)=>{

          // console.log(food_cards[i].childNodes[1].parentNode.id);

          const item_id = food_cards[i].childNodes[1].parentNode.id;

          

          // window.location.href = `item.html?id=${item_id}`;

      });

      // console.log(food_cards[i].childNodes[1].childNodes[7])

      food_cards[i].childNodes[1].childNodes[7].addEventListener('click', (e)=>{

        // add the item to the cart and on successful addition redirect to the cart:

          // console.log('hy' + token)
          // check if user logged in:
         

          foodItemId = food_cards[i].childNodes[1].parentNode.id;

          userUrl = `http://localhost:9090/api/users/email/`+ parseJwt(token).sub;

          getuser(userUrl);


      })

  }

 
}




var getUserReq;

function getuser(url) {

  getUserReq = new XMLHttpRequest();

  getUserReq.open('GET', url);

  getUserReq.setRequestHeader('Authorization', token);

  getUserReq.onreadystatechange =  () => {

    if(getUserReq.readyState == XMLHttpRequest.DONE && getUserReq.status === 200) {
      var res = JSON.parse(getUserReq.responseText);

      // console.log(JSON.stringify(res));


      userId = res.id;

      addToCartUrl = `http://localhost:9090/api/cart/add` + `/${userId}/${foodItemId}/1`;
      addItemToCartRequest(addToCartUrl);

    }else if(getUserReq.status == 401) {
      location.href = `login.html`;
      // console.log(getUserReq.status)
    }

  }

  getUserReq.send();

}



var cartAddReq;

function addItemToCartRequest(cartUrl) {

  cartAddReq = new XMLHttpRequest();

  cartAddReq.open('PUT', cartUrl);
  cartAddReq.setRequestHeader('Authorization',token);
  cartAddReq.onreadystatechange = () => {

    if(cartAddReq.readyState == XMLHttpRequest.DONE && cartAddReq.status === 200) {
      location.assign(`cart.html`);
    }else {
      // console.log(cartAddReq)
    }

  }

  cartAddReq.send();
}


function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

