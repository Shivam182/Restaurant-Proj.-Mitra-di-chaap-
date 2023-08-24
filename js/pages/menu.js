import "../common/navbar.js";
import { getElement } from "../../utils/util.js";

const dine_in_btn = getElement(".reservation-btn");
const cart_btn = getElement(".goToCart");

dine_in_btn.addEventListener("click", function () {
  location.assign("index.html");
});

cart_btn.addEventListener("click", function () {
  location.assign("cart.html");
});
