import { getElement, getStorage } from "../../utils/util.js";
const nameField = getElement("#name");
const emailField = getElement("#mail");
const submit_btn = getElement(".submit");

const token = getStorage("token");

var email = parseJwt(token).sub;
var userId;
var httpRequest;
var updateRequest;
const url = "http://localhost:9090/api/users/email/" + email;

var updateUrl;

const userData = {
  name: "",
  email: "",
  password: "",
};

getUserDetails(url);

function getUserDetails(url) {
  httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, true);
  httpRequest.setRequestHeader("Authorization", token);
  httpRequest.onreadystatechange = setUserDetails;
  httpRequest.send();
}

function setUserDetails() {
  if (
    httpRequest.readyState === XMLHttpRequest.DONE &&
    httpRequest.status === 200
  ) {
    const response = JSON.parse(httpRequest.responseText);

    userData.name = response.name;
    userData.email = response.email;
    userId = response.id;
    userData.password = response.password;

    nameField.value = userData.name;
    emailField.value = userData.email;
  }
}

submit_btn.addEventListener("click", function (e) {
  e.preventDefault();

  if (nameField.value == "" || emailField.value == "") {
    alert("Make sure all fields are filled");
  } else {
    userData.name = nameField.value;
    userData.email = emailField.value;

    updateUrl = `http://localhost:9090/api/users/${userId}`;
    makeRequest(updateUrl + userId, userData);
  }
});

function makeRequest(url, userData) {
  updateRequest = new XMLHttpRequest();
  updateRequest.open("PUT", updateUrl, true);
  updateRequest.setRequestHeader("Content-Type", "application/json");
  updateRequest.setRequestHeader("Authorization", token);
  updateRequest.onreadystatechange = afterSubmit;
  updateRequest.send(JSON.stringify(userData));
}

function afterSubmit() {
  if (
    updateRequest.readyState === XMLHttpRequest.DONE &&
    updateRequest.status === 200
  ) {
    alert("Your Profile has been updated successfully"); // this is a blocking code.
    window.location.href = `profile.html`;
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
