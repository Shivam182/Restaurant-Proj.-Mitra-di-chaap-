import { getElement } from "../../utils/util.js";

const login = getElement('.login')
const signup = getElement('.signup');
const login_box =getElement('.login-box');
const signup_box = getElement('.signup-box');


login.addEventListener('click', function(){
    login.style.backgroundColor = 'burlywood';

    if (!login_box.classList.contains('show')) {
          login_box.classList.add('show');
          signup_box.classList.remove('show');
          signup.style.backgroundColor = 'white'
    }

    return;
  
});

signup.addEventListener('click', function(){

    signup.style.backgroundColor = 'burlywood';

    if (!signup_box.classList.contains('show')) {
        login_box.classList.remove('show');
        signup_box.classList.add('show');
        login.style.backgroundColor = 'white';
    }

    return;
});