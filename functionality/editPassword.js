import {getStorage} from '../utils/util.js'
const userMail = document.querySelector("#email");
const userPassword = document.querySelector("#password");

const newPassword = document.querySelector("#new_password");

const verify_pass = document.querySelector("#verify-password");
var new_password;
const main_container = document.querySelector(".main");
var update_password;

var verifyRequest;
const verify_url = `http://localhost:9090/api/v1/auth/verify`;

var updatePasswordRequest;
var updatePassUrl = `http://localhost:9090/api/users/updatePassword`;

const data = {
  username: "",
  password: "",
};

const userData = {
  name: "",
  email: "",
  password: "",
  id: "",
};

var getUserRequest;
var userUrl = `http://localhost:9090/api/users/email/`;

verify_pass.addEventListener("click", (e) => {
  if (userMail.value == "" || userPassword.value == "") {
    alert("Please fill all the details");
  } else {
    data.username = userMail.value;
    data.password = userPassword.value;

    verifyUserData(verify_url, data);
  }
});

function verifyUserData(url, data) {
  verifyRequest = new XMLHttpRequest();
  verifyRequest.open("POST", url, true);
  verifyRequest.setRequestHeader("Content-Type", "application/json");
  verifyRequest.onreadystatechange = afterVerify;
  verifyRequest.send(JSON.stringify(data));



  // fetch user details ..

  getUserRequest = new XMLHttpRequest();
    getUserRequest.open('GET',userUrl + data.username, true);
    getUserRequest.setRequestHeader('Authorization', getStorage('token'));
    getUserRequest.onreadystatechange = setUserData;
    getUserRequest.send();
}

function setUserData (){
    if(getUserRequest.readyState == XMLHttpRequest.DONE && getUserRequest.status === 200){
        const res = JSON.parse(getUserRequest.responseText);

        console.log(JSON.stringify(res));

        userData.name = res.name;
        userData.email = res.email;
        userData.id = res.id
        

    }

}

function afterVerify() {


  if (
    verifyRequest.readyState == XMLHttpRequest.DONE &&
    verifyRequest.status == 200
  ) {
    const res = JSON.parse(verifyRequest.responseText);

    // show up the update password box...

    main_container.innerHTML += `<input placeholder="Enter new Password" type="password" id="new_password">
        <button id="update-password">Update Password</button>`;

        update_password = document.querySelector("#update-password");
        new_password = document.querySelector("#new_password");


        k();

   
  }else {
    alert('Bad Credentials');
  }


}

function k() {


  update_password.addEventListener("click", (e) => {
    if (new_password.value == "") {
      alert("Please Enter New Password");
    } else {
      userData.password = new_password.value;
      updateUserPassword(updatePassUrl, userData);
    }
  });

  function updateUserPassword(url, userData) {

    updatePasswordRequest = new XMLHttpRequest();
    updatePasswordRequest.open('PUT', url, true);
    updatePasswordRequest.setRequestHeader('Authorization', getStorage('token'));
    updatePasswordRequest.setRequestHeader('Content-Type', 'application/json');
    updatePasswordRequest.onreadystatechange = passwordChangeSuccess;
    updatePasswordRequest.send(JSON.stringify(userData));

  }


  function passwordChangeSuccess () {

    if(updatePasswordRequest.readyState == XMLHttpRequest.DONE && updatePasswordRequest.status === 200){
        alert('Your password has been changed successfully !!');

        window.location.href = `profile.html`;
    }

  }


}
