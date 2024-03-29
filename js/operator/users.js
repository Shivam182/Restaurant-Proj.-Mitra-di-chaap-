import { getElement, getStorage } from "../../utils/util.js";
const usrs = getElement(".user-table");

const searchId = getElement("#find-id");
const searchName = getElement("#find-name");
const searchIdBtn = getElement(".find-id");
const searchNameBtn = getElement(".find-name");

var httpRequest;
const url = "http://localhost:9090/api/users/all";

var token = getStorage('token');

if(token.length == 0) {
  location.href = `login.html`;
}

var nameFilterUrl;
var idFilterUrl;

makeRequest(url);

searchIdBtn.addEventListener("click", function () {
  const text = searchId.value;

  if (text == "") {
    alert("Please Provide Input.");
  } else {
    idFilterUrl = `http://localhost:9090/api/users/${text}`;
    makeRequest(idFilterUrl);
    usrs.innerHTML = "";
  }
});

searchNameBtn.addEventListener("click", function () {
  const txt = searchName.value;

  if (txt == "") {
    alert("Please provide input");
  } else {
    nameFilterUrl = `http://localhost:9090/api/users/name/${txt}`;
    makeRequest(nameFilterUrl);
    usrs.innerHTML = "";
  }
});

function makeRequest(url) {
  httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, true);
  httpRequest.setRequestHeader(
    "Authorization",
token  );
  httpRequest.onreadystatechange = setUsers;
  httpRequest.send();
}

function setUsers() {
  if (
    httpRequest.readyState === XMLHttpRequest.DONE &&
    httpRequest.status === 200
  ) {
    const response = JSON.parse(httpRequest.responseText);

    var str;

    if (response.length) {
      str = response
        .map((item) => {
          return `
        <tr>
        <td>${item.name}</td>
        <td>${item.id}</td>
        <td>${item.email}</td>
        <td>Cart Link</td>
        </tr> 
            `;
        })
        .join("");
    } else {
      var str = `
        <tr>
        <td>${response.name}</td>
        <td>${response.id}</td>
        <td>${response.email}</td>
        <td>Cart Link</td>
        </tr> 
        `;
    }

    usrs.innerHTML = `
    <table>
    <tr>
    <th>UserName</th>
    <th>Id</th>
    <th>E-mail</th>
    <th>Cart</th>
    </tr>
    ${str}
    </table>
    `;
  }
}
