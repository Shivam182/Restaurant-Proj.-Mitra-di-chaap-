import { getElement, getStorage } from "../../utils/util.js";
const feedbackDiv = getElement(".feed-table");
const findByName = getElement(".find-name");
const findname = getElement("#find-name");

var httpRequest;
const url = "http://localhost:9090/api/feedback/all";

const token = getStorage('token');

if(token.length == 0) {
  location.href = `login.html`;
}

var searchUrl;

findname.value = "";

makeRequest(url);

findByName.addEventListener("click", function () {
  if (findname.value == "") {
    alert("Please provide input");
  } else {
    searchUrl = `http://localhost:9090/api/feedback/name/${findname.value}`;

    makeRequest(searchUrl);
    feedbackDiv.innerHTML = "";
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

    var str = response
      .map((item) => {
        return `
            <tr>
                    <td>${item.name}</td>
                    <td>${item.id}</td>
                    <td>${item.userMail}</td>
                    <td>${item.content}</td>
                </tr>
            `;
      })
      .join("");

    feedbackDiv.innerHTML = `
        <table>
        <tr>
        <th>UserName</th>
        <th>FeedId</th>
        <th>E-mail</th>
        <th>Message</th>
        </tr>

        ${str}
        </table>
        `;
  }
}
