import { getElement, getStorage } from "../utils/util.js";
const featured_section = getElement(".featured");

var httpRequest;
var featured_items = {
  featured: ["9", "3", "7"],
  items: [],
};

var url = "http://localhost:9090/api/item/get/";
var addToCartUrl ;
var userUrl;

var foodItemId;

var userToken = getStorage('token');

var userId;

httpRequest = new XMLHttpRequest();
makeRequest(0, featured_items.featured.length);

function makeRequest(i, length) {
  if (i >= length) {
    setFootItems(featured_items);
    return;
  }

  httpRequest.open("GET", url + featured_items.featured[i]);
  // httpRequest.setRequestHeader(
  //   "Authorization",
  //   "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYWh1bEBnbWFpbC5jb20iLCJleHAiOjE2ODE0NzgxNjUsImlhdCI6MTY4MTQ3NjM2NX0.wLgwuu76FKgJmFvo6xP-_iExbNJLyetWbf3c2a_3udsfeWwdBhGal6VFKZyzCYpIISFMcO7AYiwpjyEFaBzBNg"
  // );
  httpRequest.onreadystatechange = () => {
    if (
      httpRequest.readyState === XMLHttpRequest.DONE &&
      httpRequest.status === 200
    ) {
      var data = JSON.parse(httpRequest.responseText);
      featured_items.items.push(JSON.stringify(data));
      makeRequest(i + 1, featured_items.featured.length);
    }
  };

  httpRequest.send();
}

function setFootItems(featured_items) {
  var str = featured_items.items
    .map((item) => {
      const element = JSON.parse(item);

      return `
    <div class="food-card" id={${element.itemId}}>
      <div class="card-content">
      <h3 class="item-title">${element.title}</h3>
      <img src="${element.image1}" alt="food image" />
      <p class="mini-description">
        ${element.description}
      </p>
      <button class="add-order">order</button>
      <h3 class="price">$${element.price}</h3>
       
      </div>
    </div>`;
    })
    .join("");



  featured_section.innerHTML = `` + str;
  activateBtns();
}

var getUserReq;

function getuser(url) {

  getUserReq = new XMLHttpRequest();

  getUserReq.open('GET', url);

  getUserReq.setRequestHeader('Authorization', userToken);

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


function activateBtns() {
  const order_btns = document.getElementsByClassName('add-order');

  for(var i = 0; i < order_btns.length; i++) {

    order_btns[i].addEventListener('click', (e)=>{
        
      // console.log(e.target.parentNode.parentNode.id);

      

      if(!userToken || userToken.length == 0) {
        location.assign('login.html');
        return;
      }

       foodItemId  = e.target.parentNode.parentNode.id[1];
      // console.log(foodItemId);
      userUrl = `http://localhost:9090/api/users/email/`+ parseJwt(userToken).sub;

      getuser(userUrl);

      
    })
  }

  
}


var cartAddReq;

function addItemToCartRequest(cartUrl) {

  cartAddReq = new XMLHttpRequest();

  cartAddReq.open('PUT', cartUrl);
  cartAddReq.setRequestHeader('Authorization',userToken);
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