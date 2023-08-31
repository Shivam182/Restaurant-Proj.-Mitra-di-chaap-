import { getElement, getStorage } from "../../utils/util.js";
import "../common/navbar.js";
import "../common/topheader.js";

const order_now = getElement(".order-now");
const order_btn = getElement(".order-btn");
const find_table_btn = getElement(".find-table");
const featured_section = getElement(".featured");
const add_order_btn = getElement(".add-order");
const partydate = getElement("#party-date");
const partysize = getElement("#party_size");
const partytime = getElement("#party-time");

var httpReq;
var tktUrl = "http://localhost:9090/api/ticketing/create";
var usrUrl = "http://localhost:9090/api/users/2";

const ticketData = {
  name: "",
  time: "",
  tableSize: "",
  id: "",
  userId: "",
};

const user = {
  name: "",
  id: "",
};

fetchUser(usrUrl);
var httpReq1;

function fetchUser(url) {
  httpReq1 = new XMLHttpRequest();
  httpReq1.open("GET", url, true);
  httpReq1.setRequestHeader(
    "Authorization",
      getStorage('token')
    );
  httpReq1.onreadystatechange = setUserDetails;
  httpReq1.send();
}

function setUserDetails() {
  if (httpReq1.readyState === XMLHttpRequest.DONE && httpReq1.status === 200) {
    const res = JSON.parse(httpReq1.responseText);
    user.name = res.name;
    user.id = res.id;
  }
}

order_now.addEventListener("click", function () {
  location.assign("menu.html");
});

order_btn.addEventListener("click", function () {
  location.assign("menu.html"); // must go to cart directly. with the element.
});

find_table_btn.addEventListener("click", function () {
  if (partydate.value == "" || partysize.value == "" || partytime.value == "") {
    alert("Please Fill All The Fields.");
  } else {
    const d = new Date();
    ticketData.name = user.name;
    ticketData.tableSize = partysize.value;
    ticketData.time = partytime.value;
    ticketData.userId = user.id;

    findTable(tktUrl);
  }
});

function findTable(url) {
  httpReq = new XMLHttpRequest();
  httpReq.open("POST", url, true);
  httpReq.setRequestHeader("Content-Type", "application/json");
  httpReq.setRequestHeader(
    "Authorization", getStorage('token')  );
  httpReq.onreadystatechange = showTicket;
  httpReq.send(JSON.stringify(ticketData));
}

function showTicket() {
  if (httpReq.readyState === XMLHttpRequest.DONE && httpReq.status === 200) {
    // move to ticket page and there only load the ticket

    window.location.href = `ticket.html?userId=${user.id}`;
  }
}
