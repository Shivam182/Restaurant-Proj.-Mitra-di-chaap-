import { getElement, getStorage } from "../../utils/util.js";
const itemsDiv = getElement(".inventory-table");

const searchName = getElement("#find-name");
const searchCat = getElement("#find-cat");
const searchNameBtn = getElement(".find-name");
const searchCatBtn = getElement(".find-cat");

var httpRequest;
const url = "http://localhost:9090/api/items";

var token = getStorage('token');

if(token.length == 0) {
  location.href = `login.html`;
}


var nameFilterUrl;
var catFilterUrl;

makeRequest(url);

searchNameBtn.addEventListener("click", function () {
  const text = searchName.value;

  if (text == "") {
    alert("Please Provide Input.");
  } else {
    nameFilterUrl = `http://localhost:9090/api/query/${text}`;
    makeRequest(nameFilterUrl);
    itemsDiv.innerHTML = "";
  }
});

searchCatBtn.addEventListener("click", function () {
  const txt = searchCat.value;

  if (txt == "") {
    alert("Please provide input");
  } else {
    catFilterUrl = `http://localhost:9090/api/category/${txt}/items`;
    makeRequest(catFilterUrl);
    itemsDiv.innerHTML = "";
  }
});

function makeRequest(url) {
  httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, true);
  httpRequest.setRequestHeader(
    "Authorization",
token  );
  httpRequest.onreadystatechange = setItems;
  httpRequest.send();
}

function setItems() {
  if (
    httpRequest.readyState === XMLHttpRequest.DONE &&
    httpRequest.status === 200
  ) {
    const response = JSON.parse(httpRequest.responseText);

    var str;

    if (response.content) {
      str = response.content
        .map((item) => {
          return `
            <tr>
            <td>${item.itemId}</td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>${item.stock}</td>
            <td>${item.ratings}</td>
            <td>View_Link</td>
            <td>Edit_Product</td>
            </tr>
            `;
        })
        .join("");
    } else {
      str = response
        .map((item) => {
          return `
            <tr>
            <td>${item.itemId}</td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>${item.stock}</td>
            <td>${item.ratings}</td>
            <td>View_Link</td>
            <td>Edit_Product</td>
            </tr>
            `;
        })
        .join("");
    }

    itemsDiv.innerHTML = `
        <table>
        <tr>
        <th>Item Id</th>
        <th>Name</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Ratings</th>
        <th>View_Link</th>
        <th>Edit Product</th>
    </tr>

    ${str}
        </table>
        `;
  }
}
