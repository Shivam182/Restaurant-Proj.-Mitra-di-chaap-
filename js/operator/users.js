import { getElement } from "../../utils/util.js";
const usrs = getElement(".user-table");

var httpRequest;
const url = "http://localhost:9090/api/users/all";

makeRequest(url);

function makeRequest(url) {
  httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, true);
  httpRequest.setRequestHeader(
    "Authorization",
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYW1lc2hAZ21haWwuY29tIiwiZXhwIjoxNjkxNDE1NjEwLCJpYXQiOjE2OTE0MTM4MTB9.7rEUY03TBWpVK0EZ3NNgDADGanw5oTAvgG7EPlYm-lBNPvkM8W_IeCXUgtBuVNDUYd_34i6H9XSN5yuL_ZsEjA"
  );
  httpRequest.onreadystatechange = setUsers;
  httpRequest.send();
}

function setUsers() {
  // console.log(httpRequest.status)

  if (
    httpRequest.readyState === XMLHttpRequest.DONE &&
    httpRequest.status === 200
  ) {
    const response = JSON.parse(httpRequest.responseText);
    console.log(JSON.stringify(response)); // data recieved successfully

    var str = response
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
