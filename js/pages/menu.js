import "../common/navbar.js";
import { getElement, getStorage } from "../../utils/util.js";

const dine_in_btn = getElement(".reservation-btn");
const cart_btn = getElement(".goToCart");

const userToken = getStorage('token');


dine_in_btn.addEventListener("click", function () {
  location.assign("index.html");
});

cart_btn.addEventListener("click", function () {

  // check if user logged in or not

 if(!userToken || userToken.length == 0){
  location.assign('login.html');
  
  return;
 }

  location.assign("cart.html");
});
