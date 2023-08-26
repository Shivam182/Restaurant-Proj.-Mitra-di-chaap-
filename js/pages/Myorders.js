import { getElement, getStorage } from "../../utils/util.js";

const order_div = getElement(".orders-table");
const orders_container = getElement(".orders-container");
const no_orders_div = getElement(".no-orders");

const token = getStorage("token");

if (token.length == 0) {
  window.location.href = `login.html`;
}

var httpRequest;

var ordersUrl;
var email = parseJwt(token).sub;

ordersUrl = `http://localhost:9090/api/order/email/${email}`;

getOrders(ordersUrl);

function getOrders(url) {
  httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, true);
  httpRequest.setRequestHeader("Authorization", token);
  httpRequest.onreadystatechange = setOrders;
  httpRequest.send();
}

function setOrders() {
  if (
    httpRequest.readyState === XMLHttpRequest.DONE &&
    httpRequest.status === 200
  ) {
    const response = JSON.parse(httpRequest.responseText);

    // console.log(JSON.stringify(response));

    var str = response
      .map((item) => {
        return ` 
          <tr>
            <td>${item.orderId}</td>
            <td>${item.status}</td>
            <td>${item.orderedOn}</td>
            <td>${item.price}</td>
            <td>${item.address}</td>
          </tr>
         `;
      })
      .join("");

    orders_container.innerHTML = `
    <table>
    <tr>
    <th>Order Id</th>
    <th>Status</th>
    <th>Ordered On</th>
    <th>Price</th>
    <th>Address</th>
  </tr>
    
  ${str}

    </table>
    `;
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
