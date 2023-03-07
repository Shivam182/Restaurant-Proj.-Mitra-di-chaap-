import { getElement } from "../../utils/util.js";

const logo_container = getElement(".logo-container");
const search_btn = getElement(".search-btn");
const order_online_btn = getElement(".order-online-btn");
const dine_in_btn = getElement(".reservation-btn");
const search_box = getElement(".search-box");
const search_query = getElement(".search-query");

logo_container.addEventListener("mouseover", function () {
  // change the cursor to pointer on hover
  logo_container.style.cursor = "pointer";
});

logo_container.addEventListener("click", function () {
  location.assign("index.html");
});

search_btn.addEventListener("click", function () {
  search_box.classList.toggle("show");
  // console.log(search_box.classList.contains('show'))
});

search_query.addEventListener("click", function () {
  // search action........
});

order_online_btn.addEventListener("click", function () {
  window.scrollTo(0, 600);
});

dine_in_btn.addEventListener("click", function () {
  if (window.location.href == "http://127.0.0.1:5500/menu.html") {
    location.assign("index.html");
    return;
  }
  window.scrollTo(0, 1000);
});
