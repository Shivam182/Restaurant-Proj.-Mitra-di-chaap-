import { getElement } from "../../utils/util.js";

const login = getElement(".login");
const signup = getElement(".signup");
const login_box = getElement(".login-box");
const signup_box = getElement(".signup-box");

login.addEventListener("click", function () {
  login.style.backgroundColor = "#7B6C69";
  login.style.color = "white";

  if (!login_box.classList.contains("show")) {
    login_box.classList.add("show");
    signup_box.classList.remove("show");
    signup.style.backgroundColor = "white";
    signup.style.color = "black";
  }

  return;
});

signup.addEventListener("click", function () {
  signup.style.backgroundColor = "#7B6C69";
  signup.style.color = "white";
  if (!signup_box.classList.contains("show")) {
    login_box.classList.remove("show");
    signup_box.classList.add("show");
    login.style.backgroundColor = "white";
    login.style.color = "black";
  }

  return;
});
