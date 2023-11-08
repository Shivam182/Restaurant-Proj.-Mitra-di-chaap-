import { getElement, getStorage } from "../../utils/util.js";

const logo_container = getElement(".logo-container");
const search_btn = getElement(".search-btn");
const order_online_btn = getElement(".order-online-btn");
const dine_in_btn = getElement(".reservation-btn");
const search_box = getElement(".search-box");
const search_query = getElement(".search-query");

const close_search_btn = getElement(".fa-close");
const result_area = getElement(".result-area");


var token = getStorage('token');

var httpRequest;

logo_container.addEventListener("mouseover", function () {
  // change the cursor to pointer on hover
  logo_container.style.cursor = "pointer";
});

logo_container.addEventListener("click", function () {
  location.assign("index.html");
});

search_btn.addEventListener("click", function () {
  search_box.classList.toggle("show");
});

try {
  search_query.addEventListener("click", function () {
    const query = document.getElementById("search-box").value;
    const url = `http://localhost:9090/api/query/${query}`;

    makeRequest(url);

    result_area.style.display = "flex";
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

  close_search_btn.addEventListener("click", function () {
    search_box.classList.remove("show");
    result_area.classList.remove("show");
  });

  function makeRequest(url) {
    httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url, true);

    httpRequest.setRequestHeader(
      "Authorization",
token    );
    httpRequest.onreadystatechange = setItems;
    httpRequest.send();
  }

  function setItems() {
    if (
      httpRequest.readyState === XMLHttpRequest.DONE &&
      httpRequest.status === 200
    ) {
      const response = JSON.parse(httpRequest.responseText);

      var str = response
        .map((item) => {
          return `
      <h4 class="result">
      <a href="">${item.title}</a>
      <p >${item.description}</p>
    </h4>
      `;
        })
        .join("");

      result_area.innerHTML = str;
    }
  }
} catch (error) {}
