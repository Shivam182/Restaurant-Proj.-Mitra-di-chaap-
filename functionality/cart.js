import { getElement, getStorage } from "../utils/util.js";
const container = getElement(".container");
const cart_itms = getElement(".cart-items");
const cart_value = getElement('.cart-total');

var httpRequest;
var userId;
var cart;
const url = "http://localhost:9090/api/cart/";

var food_url = "http://localhost:9090/api/item/get/";
var food_ids;
var foodItems = [];

const usrToken = getStorage("token");

if (usrToken.length == 0) {
  window.location.href = `login.html`;
}

const email = parseJwt(usrToken).sub;

var usrUrl = `http://localhost:9090/api/users/email/${email}`;
var httpReq1;

getUserId(usrUrl);

function getUserId(url) {
  httpReq1 = new XMLHttpRequest();
  httpReq1.open("GET", url, true);
  httpReq1.setRequestHeader("Authorization", usrToken);
  httpReq1.onreadystatechange = setUID;
  httpReq1.send();
}

function setUID() {
  if (httpReq1.readyState == XMLHttpRequest.DONE && httpReq1.status === 200) {
    const res = JSON.parse(httpReq1.responseText);
    userId = res.id;
    makeRequest(url + userId);
  }
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

function makeRequest(url) {
  httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, true);
  httpRequest.onreadystatechange = getCartItems;
  httpRequest.setRequestHeader("Authorization", usrToken);
  httpRequest.send();
}

function getCartItems() {
  if (
    httpRequest.readyState === XMLHttpRequest.DONE &&
    httpRequest.status === 200
  ) {
    const response = JSON.parse(httpRequest.responseText);
    cart = response;
    food_ids = response.food_item;

    foodReq(food_url + Object.keys(food_ids)[0]);
  }
}

var foodRequest;

var i = 0;

function foodReq(food_url) {
  foodRequest = new XMLHttpRequest();
  foodRequest.open("GET", food_url, true);
  foodRequest.onreadystatechange = setItems;
  foodRequest.send();
}

function setItems() {
  let pr = new Promise((resolve, reject) => {
    if (
      foodRequest.readyState == XMLHttpRequest.DONE &&
      foodRequest.status === 200
    ) {
      foodItems.push(foodRequest.responseText);
      if (i < Object.keys(food_ids).length) {
        i = i + 1;
        foodReq(food_url + Object.keys(food_ids)[i]);
      } else {
      }
    }

    var k = 0;
   var sum = 0;
    var str = foodItems
      .map((item) => {
        const element = JSON.parse(item);
        const itemId = element.itemId;
        var curr_total = parseInt(element.price) * parseInt(Object.values(food_ids)[k]);
        
        sum += curr_total;

        return `
        
         <div class="card " id="${itemId}">
           <div class="card-container">
             <img src="${element.image1}" alt="item image" class="item-image" />
             <h3 class="item-name">${element.title}</h3>
             <h4 class="item-price">$${element.price}</h4>
             <div class="card-btns">
               <button class="increase">

                 <i class="fa fa-plus-square"></i>
                 
               </button>

               <span class="curr-value">${Object.values(food_ids)[k++]} </span>

               <button class="decrease">

                 <i class="fa fa-minus-square"></i>
                 
               </button>
             </div>
             <span id="item-total">$ ${curr_total}</span>
             <button  class="trash-btn">
               <i class="fa fa-trash"></i>
             </button>
           </div>
         </div>

         
 `;
      })
      .join("");

    container.innerHTML = str;
    cart_value.innerHTML = `Sub Total: $ ${sum}/-`;
    // console.log(JSON.stringify(cart))
    cart.total = sum;
    resolve();
  });

  pr.then(() => {
    const del = document.getElementsByClassName("trash-btn");
    const cart_btn = document.querySelectorAll(".checkout-btn");
    const cartTotal = document.getElementsByClassName("item-total");
    const addItemCnt = document.getElementsByClassName("fa-plus-square");
    const subtractItem = document.getElementsByClassName("fa-minus-square");
    const curr_cnt = document.getElementsByClassName('curr-value');

    try {

      


      for (let i = 0; i < del.length; i++) {
        del[i].addEventListener("click", (e) => {
          const id = e.target.parentNode.parentNode.parentNode.id;
          const item = e.target.parentNode.parentNode;

          deleteItem(item, id);
        });

        addItemCnt[i].addEventListener("click", (e) => {

        
          var value = e.target.parentNode.parentNode.childNodes[3].innerHTML;
         
          value = parseInt(value) + 1;
          console.log(JSON.stringify(cart))
         

          e.target.parentNode.parentNode.childNodes[3].innerHTML = value;
          const id = e.target.parentNode.parentNode.parentNode.parentNode.id;

          // increment the cart total 

            
          var item_total;
          const itemPrice = e.target.parentNode.parentNode.parentNode.childNodes[5].innerHTML.substring(1)
         
          e.target.parentNode.parentNode.parentNode.childNodes[9].innerHTML = `$ ${parseInt(itemPrice)*value}`;
          item_total = parseInt(itemPrice)*value;
          var cart_cnt = parseInt(cart.total);
          cart_cnt  = cart_cnt + parseInt(itemPrice);
          cart.total = cart_cnt;
          cart_value.innerHTML = `Sub Total: $ ${cart_cnt}/-`;
        
          updateCount(id, value,cart_cnt);
        });

        subtractItem[i].addEventListener("click", (e) => {

          var value = e.target.parentNode.parentNode.childNodes[3].innerHTML;

          value = parseInt(value) - 1;


          if (value == 0) {
          } else {
            e.target.parentNode.parentNode.childNodes[3].innerHTML = value;
            const id = e.target.parentNode.parentNode.parentNode.parentNode.id;

            var item_total;
            const itemPrice = e.target.parentNode.parentNode.parentNode.childNodes[5].innerHTML.substring(1)
           
  
            e.target.parentNode.parentNode.parentNode.childNodes[9].innerHTML = `$ ${parseInt(itemPrice)*value}`;
            item_total = parseInt(itemPrice)*value;
         
            var cart_cnt = parseInt(cart.total);
            cart_cnt  = cart_cnt - parseInt(itemPrice);
            cart.total = cart_cnt;
            cart_value.innerHTML = `Sub Total: $ ${cart_cnt}/-`

            
            updateCount(id, value,cart_cnt);
          }
        });

       
        // curr_cnt[i].addEventListener('change',(e)=>{
        //   console.log('value change detected ');
        // })



      }
    } catch (error) {}
  });
}

var removeReq;

function deleteItem(item, id) {
  var removeUrl = `http://localhost:9090/api/cart/delete/${cart.id}/${id}`;

  removeReq = new XMLHttpRequest();
  removeReq.open("PUT", removeUrl);
  removeReq.setRequestHeader("Authorization", getStorage("token"));
  removeReq.onreadystatechange = reloadItems;
  removeReq.send();

  item.remove();
}

function reloadItems() {
  if (removeReq.readyState == XMLHttpRequest.DONE && removeReq.status === 200) {
    location.reload();
  }
}

var updateCntReq;

function updateCount(id,value,cart_total){
  var updateUrl = `http://localhost:9090/api/cart/update/${cart.id}/${id}/${value}/${cart_total}`;
  updateCntReq = new XMLHttpRequest();
  updateCntReq.open('PUT',updateUrl);
  updateCntReq.setRequestHeader('Authorization',getStorage('token'));
  updateCntReq.send();
}
