import { getElement, getStorage } from "../../utils/util.js";

const searchName = getElement("#find-name");
const searchNameBtn = getElement(".find-name");
const searchUserId = getElement("#find-userid");
const searchUserIdBtn = getElement(".find-userid");
const searchTime = getElement("#find-time");
const searchTimeBtn = getElement(".find-time");

const searchTable = getElement("#find-table");
const searchTableBtn = getElement(".find-table");

const ticketsTable = getElement(".tickets-table");

var usertoken = getStorage("token");

if (usertoken.length == 0) {
  location.href = `login.html`;
}

var alltktUrl = `http://localhost:9090/api/ticketing/all`;

var searchIdUrl;
var searchNameUrl;
var searchTableUrl;
var searchTimeUrl;

var httpRequest1;
var httpRequest2;
var httpRequest3;
var httpRequest4;
var httpRequest5;

getAllTickets(alltktUrl);

searchNameBtn.addEventListener("click", () => {
  const text = searchName.value;

  if (text == "") {
    alert("Please Provide Input");
  } else {
    searchNameUrl = `http://localhost:9090/api/ticketing/tickets/name/` + text;
    searchNameReq(searchNameUrl);
    ticketsTable.innerHTML = "";
  }
});

searchTimeBtn.addEventListener("click", () => {
  const text = searchTime.value;

  if (text == "") {
    alert("Please Provide Input");
  } else {
    searchTimeUrl = `http://localhost:9090/api/ticketing/tickets/time/` + text;
    searchTimeReq(searchTimeUrl);
    ticketsTable.innerHTML = "";
  }
});

searchUserIdBtn.addEventListener("click", () => {
  const text = searchUserId.value;

  if (text == "") {
    alert("Please Provide Input");
  } else {
    searchIdUrl = `http://localhost:9090/api/ticketing/tickets/user/` + text;
    searchUserIdReq(searchIdUrl);
    ticketsTable.innerHTML = "";
  }
});

searchTableBtn.addEventListener("click", () => {
  const text = searchTable.value;

  if (text == "") {
    alert("Please Provide Input");
  } else {
    searchTableUrl = `http://localhost:9090/api/ticketing/tickets/size/` + text;
    searchTableReq(searchTableUrl);
    ticketsTable.innerHTML = "";
  }
});

function getAllTickets(url) {
  httpRequest1 = new XMLHttpRequest();

  httpRequest1.open("GET", url, true);
  httpRequest1.setRequestHeader("Authorization", usertoken);

  var req = httpRequest1;
  httpRequest1.onreadystatechange = setItems.bind(req);
  httpRequest1.send();
}

function searchNameReq(url) {
  httpRequest2 = new XMLHttpRequest();

  httpRequest2.open("GET", url, true);
  httpRequest2.setRequestHeader("Authorization", usertoken);
  var req = httpRequest2;
  httpRequest2.onreadystatechange = setItems.bind(req);
  httpRequest2.send();
}

function searchTimeReq(url) {
  httpRequest3 = new XMLHttpRequest();

  httpRequest3.open("GET", url, true);
  httpRequest3.setRequestHeader("Authorization", usertoken);
  var req = httpRequest3;
  httpRequest3.onreadystatechange = setItems.bind(httpRequest3);
  httpRequest3.send();
}

function searchTableReq(url) {
  httpRequest4 = new XMLHttpRequest();

  httpRequest4.open("GET", url, true);
  httpRequest4.setRequestHeader("Authorization", usertoken);

  var req = httpRequest4;
  httpRequest4.onreadystatechange = setItems.bind(req);
  httpRequest4.send();
}

function searchUserIdReq(url) {
  httpRequest5 = new XMLHttpRequest();

  httpRequest5.open("GET", url, true);
  httpRequest5.setRequestHeader("Authorization", usertoken);

  var req = httpRequest5;
  httpRequest5.onreadystatechange = setItems.bind(req);
  httpRequest5.send();
}

function setItems() {
  // console.log(this)
  if (this.readyState == XMLHttpRequest.DONE && this.status === 200) {
    var response = JSON.parse(this.responseText);

    // console.log(JSON.stringify(response));

    var str = "";

    // anything else except zero is considered to be as true
    if (response.length) {
      str = response
        .map((item) => {
          return `
          <tr>
          <td>${item.id}</td>
          <td>NA</td>
          <td>${item.name}</td>
          <td>${item.time}</td>
          <td>${item.tableSize}</td> 
          </tr> 
              `;
        })
        .join("");

      ticketsTable.innerHTML = `
    <table>
    <tr>
    <th>TID</th>
    <th>Date</th>
    <th>Name</th>
    <th>Time</th>
    <th>Table Size</th>
    </tr>
    ${str}
    </table>
    `;
    } else {
      alert('No Data !!')
    }
  }
}
