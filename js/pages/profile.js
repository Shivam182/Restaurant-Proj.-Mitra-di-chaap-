import { getElement,getStorage } from "../../utils/util.js";

const username = getElement("#userName");
const user_name = getElement("#name");
const user_mail = getElement("#mail");
const user_password = getElement("#password");
const dashboard = getElement('#operator-access');
const edit_password = getElement('#edit-password');
const logout = getElement('#logout-btn');


const edit_btn = getElement("#edt-btn");

const userToken = getStorage('token');
const role = getStorage('role');

if(!userToken || userToken.length == 0){
  window.location.href = `login.html`;
}

if(role == 'NORMAL'){
  dashboard.style.display = 'none';
}


const email = parseJwt(userToken).sub;

const url = "http://localhost:9090/api/users/email/" + email;

var httpRequest;




// get user details from the user token
makeRequest(url);

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

function makeRequest(url) {
  httpRequest = new XMLHttpRequest();
  if (!httpRequest) {
    return;
  }

  httpRequest.onreadystatechange = getUserDetails;

  httpRequest.open("GET", url, true);

  httpRequest.setRequestHeader("Authorization", userToken);

  httpRequest.send();
}

function getUserDetails() {
  try {
    if (httpRequest.status === 200) {
      try {
        var response = JSON.parse(httpRequest.responseText);
        user_name.innerHTML = response.name;
        user_mail.innerHTML = response.email;
        username.innerHTML = response.name;
      } catch (error) {
        // alert('Sorry for the Inconvienience , Some error has occured. Please try after sometime.' + error);
      }
    }
  } catch (error) {}
}



edit_btn.addEventListener("click", function () {
  location.href = `edit.html`;
});

edit_password.addEventListener('click', () =>{


  // console.log('i have been clicked');
});


logout.addEventListener('click', function () {
  localStorage.clear();
  location.href = `index.html`;
})