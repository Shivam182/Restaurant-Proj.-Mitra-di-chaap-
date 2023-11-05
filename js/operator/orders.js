import { getElement, getStorage } from "../../utils/util.js";
const orderDiv = getElement(".order-table");

const searchId = getElement("#find-id");
const searchStatus = getElement("#find-status");
const searchIdBtn = getElement(".find-id");
const searchStatusBtn = getElement(".find-status");

var httpRequest;
const url = "http://localhost:9090/api/order/all";

var token = getStorage('token');

if(token.length == 0) {
  location.href = `login.html`;
}

var idFilterUrl;
var statusFilterUrl;

searchId.value = "";
searchStatus.value = "";

makeRequest(url);

searchIdBtn.addEventListener("click", function () {
  const text = searchId.value;

  if (text == "") {
    alert("Please Provide Input.");
  } else {
    idFilterUrl = `http://localhost:9090/api/order/${text}`;
    makeRequest(idFilterUrl);
    orderDiv.innerHTML = "";
  }
});

searchStatusBtn.addEventListener("click", function () {
  const txt = searchStatus.value;

  if (txt == "") {
    alert("Please provide input");
  } else {
    statusFilterUrl = `http://localhost:9090/api/order/status/${txt}`;
    makeRequest(statusFilterUrl);
    orderDiv.innerHTML = "";
  }
});

function makeRequest(url) {
  httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, true);
  httpRequest.setRequestHeader(
    "Authorization",
token);
  httpRequest.onreadystatechange = setItems;
  httpRequest.send();
}

function setItems() {
  if (
    httpRequest.readyState === XMLHttpRequest.DONE &&
    httpRequest.status === 200
  ) {
    const response = JSON.parse(httpRequest.responseText);
    console.log(JSON.stringify(response))
    var str;

    if (response.length >= 0) {
      str = response
        .map((item) => {
          return `
        <tr>
                <td>${item.orderId}</td>
                <td>${item.status}</td>
                <td>${item.price}</td>
                <td>${item.orderedOn}</td>
        </tr>
        `;
        })
        .join("");
    } else {
      str = `
                <tr>
                <td>${response.orderId}</td>
                <td>${response.status}</td>
                <td>${response.price}</td>
                <td>${response.orderedOn}</td>
                </tr>
                `;
    }

    orderDiv.innerHTML = `
        <table>
        <tr>
                    <th>OrderId</th>
                    <th>Order Status</th>
                    <th>Price</th>
                    <th>Placed On</th>
                </tr>
                ${str}
        </table>
        `;
  }
}
