// import '../common/topheader.js'
import "../common/navbar.js";

import { getElement } from "../../utils/util.js";
const feedbacks = getElement("#feedback");
const submit = getElement("#submit");

const feed = {
  content: "",
  userId: 1,
};

const user = {
  userId: "",
  name: "",
  mail: "",
};

var httpReq;
var feedURL = "http://localhost:9090/api/feedback/create";

var usrUrl = "http://localhost:9090/api/users/2";

var httpReq1;

getUserDetails(usrUrl);

function getUserDetails(usrUrl) {
  httpReq1 = new XMLHttpRequest();
  httpReq1.open("GET", usrUrl, true);
  httpReq1.setRequestHeader(
    "Authorization",
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYWh1bEBnbWFpbC5jb20iLCJleHAiOjE2ODE0NzgxNjUsImlhdCI6MTY4MTQ3NjM2NX0.wLgwuu76FKgJmFvo6xP-_iExbNJLyetWbf3c2a_3udsfeWwdBhGal6VFKZyzCYpIISFMcO7AYiwpjyEFaBzBNg"
  );
  httpReq1.onreadystatechange = setUserDetails;
  httpReq1.send();
}

function setUserDetails() {
  if (httpReq1.readyState === XMLHttpRequest.DONE && httpReq1.status === 200) {
    const res = JSON.parse(httpReq1.responseText);
    user.mail = res.email;
    user.name = res.name;
    user.userId = res.id;
  }
}

submit.addEventListener("click", function () {
  if (feedbacks.value == "") {
    alert("Please Write the Feedback.");
  } else {
    feed.content = feedbacks.value;
    feed.name = user.name;
    feed.userMail = user.mail;
    sendFeedback(feedURL);
  }
});

function sendFeedback(url) {
  httpReq = new XMLHttpRequest();
  httpReq.open("POST", url, true);
  httpReq.setRequestHeader("Content-Type", "application/json");
  httpReq.setRequestHeader(
    "Authorization",
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYW1lc2hAZ21haWwuY29tIiwiZXhwIjoxNjkxOTM0MDYxLCJpYXQiOjE2OTE5MzIyNjF9.-HNYWthki9H2636KUJoGfl3OjP4n_IovX-owJ70a40CEgdNbtCG_1LjzECpt2NduWr46yWVJpmXZWgUqVl80Jw"
  );

  httpReq.onreadystatechange = showSuccessAlert;
  httpReq.send(JSON.stringify(feed));
}

function showSuccessAlert() {
  if (httpReq.readyState === XMLHttpRequest.DONE && httpReq.status === 200) {
    feedbacks.value = "";
    alert(
      "Your Feedback has been recorded successfully. We will get in touch with you soon."
    );
  }
}
