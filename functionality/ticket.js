import { getElement } from "../utils/util.js";
const ticket = getElement(".tickets");

var httpReq;
var usrId;

var urlprams = new URLSearchParams(document.location.search);

usrId = urlprams.get("userId");

var tktUrl = `http://localhost:9090/api/ticketing/tickets/user/${usrId}`;
var httpReq;

const tktData = {
  name: "",
  time: "",
  tableSize: "",
  id: "",
};

getTickets(tktUrl);

function getTickets(url) {
  httpReq = new XMLHttpRequest();
  httpReq.open("GET", url, true);
  httpReq.setRequestHeader(
    "Authorization",
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYW1lc2hAZ21haWwuY29tIiwiZXhwIjoxNjkyMDE3NjQ2LCJpYXQiOjE2OTIwMTU4NDZ9.PEVkXdMRzWjNjbCXeclDTzll257YXWvFZ_2Dh4lHnscy3fHo92O4a0QQF-lajwMJ6Zt_5Vv__mBqq8jr1S0ZDQ"
  );
  httpReq.onreadystatechange = setItems;
  httpReq.send();
}

function setItems() {
  if (httpReq.readyState === XMLHttpRequest.DONE && httpReq.status === 200) {
    const res = JSON.parse(httpReq.responseText);

    var str = res
      .map((item) => {
        return `<div class="ticket">
            <h1 id="name">Name : ${item.name}</h1>
            <h2 id="table-size">Table Size : ${item.tableSize}</h2>
            <h2 id="time">Time : ${item.time}</h2>
            <h3 id="ticket-id">Ticket Id : ${item.id}</h3>
            <p id="warn">Please note that default time allocation is for 1 hour per table. <br> If you want the booking to continue for more hours, Please book it in separate ticket. <br> Thank You Mr.Shivam <br> <br> Please Save this ticket for further reference.</p>
          </div>
            `;
      })
      .join("");

    ticket.innerHTML = str;
  }
}
