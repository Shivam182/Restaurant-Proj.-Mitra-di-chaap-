import { getElement } from "../utils/util.js";
const featured_section = getElement(".featured");

var httpRequest;
var featured_items = {
  featured: ["9", "3", "7"],
  items: [],
};

var url = "http://localhost:9090/api/item/get/";

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
    <div class="food-card">
      <div class="card-content">
      <h3 class="item-title">${element.title}</h3>
        <img src="${element.image1}" alt="food image" />
        <p class="mini-description">
        ${element.description}
        </p>
        <div class="inner-container">
        <button class="add-order">order</button>
        <h3 class="price">$${element.price}</h3>
        </div>
      </div>
    </div>`;
    })
    .join("");

  featured_section.innerHTML = str;
}
