import { getElement, getStorage } from "../utils/util.js";
const ticket = getElement(".tickets");

var httpReq;
var usrId;

/**
 * GENERATE TICKETS DYNAMICALLLY 
 */

var userUrl = `http://localhost:9090/api/users/email/`;




const token = getStorage("token");

if( token.length == 0) {
  window.location.href = `login.html`;
}else {
  getuser();
}

var tktUrl = `http://localhost:9090/api/ticketing/tickets/user/`;
var httpReq;



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
    // console.log(JSON.stringify(res));
    var str = res
      .map((item) => {
        return `<div class="ticket">
            <h1 id="name">Name : ${item.name}</h1>
            <h2 id="table-size">Table Size : ${item.tableSize}</h2>
            <h2 id="time">Time : ${item.time}</h2>
            <h3 id="ticket-id">Ticket Id : ${item.id}</h3>
            <p id="warn">Please note that default time allocation is for 1 hour per table. <br> If you want the booking to continue for more hours, Please book it in separate ticket. <br> Thank You Mr.${item.name} <br> <br> Please Save this ticket for further reference.</p>
          </div>
            `;
      })
      .join("");

    ticket.innerHTML = str;
  }
}

var getUserReq;

function getuser() {

  getUserReq = new XMLHttpRequest();

  userUrl = userUrl + parseJwt(token).sub;
  getUserReq.open('GET', userUrl);

  getUserReq.setRequestHeader('Authorization', token);

  getUserReq.onreadystatechange =  () => {

    if(getUserReq.readyState == XMLHttpRequest.DONE && getUserReq.status === 200) {
      var res = JSON.parse(getUserReq.responseText);

      // console.log(JSON.stringify(res));

      usrId = res.id;
      // console.log('hi')

      tktUrl = tktUrl + usrId;

      getTickets(tktUrl);
    }else {
      // console.log(getUserReq.status)
    }

  }

  getUserReq.send();

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