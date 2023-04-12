import {getElement} from '../utils/util.js'

const name = getElement('#username1');
const mail = getElement('#mail1');
const password = getElement('#pass1');
const cnfm_pass = getElement('#pass-cnf');
const pincode = getElement('#pincode');
const dob = getElement('#dob');
const pic = getElement('#pic');
const phone = getElement('#phone');

const signup = getElement('#signup-btn');
var httpRequest;
var loginRequest;
const url = 'http://localhost:9090/api/v1/auth/register';
const url2 = 'http://localhost:9090/api/v1/auth/createToken';

signup.addEventListener('click', function(e){
    e.preventDefault();
    // console.log('erfer')
    // console.log('form values: '+name.value + ' '+ mail.value+  ' '+ password.value+ ' '+ cnfm_pass.value + pincode.value + ' '+ dob.value + ' '+pic.value + ' '+ phone.value);
    
const data = {
    'name':`${name.value}`,
    'email':`${mail.value}`,
    'password':`${password.value}`
}

if (validateForm()) {
    makeRequest(url,data);

}else{
    alert('client side form validation failed.');
}
});

function validateForm(){
    var returnValue = true;
    clearErrors();
    // length of email
    if (mail.value.length>50){
        seterror("mail_err", "*Email length is too long");
        returnValue = false;
    }

    // password length
    if (password.value.length<8) {
        seterror('pass_err','*Password is too short');
        returnValue = false;
    }

    // cnf pass === passowrd?
    if (password.value != cnfm_pass.value) {
        seterror('pass_err','*Password does not match');
        returnValue = false;
    }


    return returnValue;
}

function seterror(id, error_message){
    console.log('id: '+id);
    const element = getElement(`#${id}`);
    console.log('err element: '+element);
    element.innerHTML = error_message;
}


function clearErrors(){
    const errors = getElement('.form-err');
    errors.innerHTML = '';
}


function makeRequest(url,data){
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = createToken;
    httpRequest.open('POST',url,true);
    httpRequest.setRequestHeader(
        "Content-Type",
        "application/json"
    )
    httpRequest.send(JSON.stringify(data));
}

function createToken(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {

        if (httpRequest.status === 201) {
            loginRequest = new XMLHttpRequest();
            loginRequest.open('POST',url2,true);
            const login_data = {'username':mail.value,'password':password.value};
            loginRequest.onreadystatechange = loginHandler;
            loginRequest.setRequestHeader(
                "Content-Type","application/json"
            )
            loginRequest.send(JSON.stringify(login_data));
            
          
        }else{
            // console.log('user not created...'+ httpRequest.status);
        }

    }
}

function loginHandler(){

    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        

  if (loginRequest.status === 200) {
    const res = JSON.parse(loginRequest.responseText);
                window.location.href = `index.html?userToken=${res.token}`;
                            console.log('token: '+res.token);
            }

    }

}