import { getElement, getStorage } from "../utils/util.js";
const ticket = getElement(".tickets");

var httpReq;
var usrId;

/**
 * GENERATE TICKETS DYNAMICALLLY 
 */


var urlprams = new URLSearchParams(document.location.search);

usrId = urlprams.get("userId");

const token = getStorage("token");

if(token.length == 0) {
  window.location.href = `login.html`;
}

var tktUrl = `http://localhost:9090/api/ticketing/tickets/user/${usrId}`;
var httpReq;

getTickets(tktUrl);

function getTickets(url) {
  httpReq = new XMLHttpRequest();
  httpReq.open("GET", url, true);
  httpReq.setRequestHeader("Authorization", token);
  httpReq.setRequestHeader('Content-Type', 'application/json');
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
