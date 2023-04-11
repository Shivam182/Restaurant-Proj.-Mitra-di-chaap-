import { getElement } from "../../utils/util.js";

const username = getElement('#userName');
const user_name = getElement('#name');
const user_mail = getElement('#mail');
const user_password = getElement('#password');

const urlSearchParams = new URLSearchParams(window.location.search);

const userToken = urlSearchParams.get('userToken');


const url = 'http://localhost:9090/api/users/1';

var httpRequest;

// console.log('user token: ' +userToken);


// if (userToken === null) {
//     console.log('here eeee')
//     window.location.href = 'login.html';
// }

// get user details from the user token 
makeRequest(url);



const name = parseJwt(userToken).sub;
username.innerHTML = name;
// console.log('token value'+ JSON.stringify(parseJwt(userToken)));


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function makeRequest(url){
    httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
        console.log('Cannot create an http request');
        return;
    }

    httpRequest.onreadystatechange = getUserDetails;

    httpRequest.open('GET',url,true);
    // httpRequest.setRequestHeader('Access-Control-Allow-Methods','*');
    // httpRequest.setRequestHeader('Access-Control-Allow-Origin','*');
    httpRequest.setRequestHeader('Authorization',`Bearer ${userToken}`)
    // httpRequest.setRequestHeader(
    //     "Content-Type",
    //     "application/json"
    // )
        
    httpRequest.send();
    // console.log('i ran ......')
}


function getUserDetails(){
//    console.log('helll...');

//    console.log(httpRequest.status);
//    console.log(httpRequest.responseText);

   try {
      if (httpRequest.status === 200) {
        try { 
            var response = JSON.parse(httpRequest.responseText);
            // console.log('user details: '+ httpRequest.responseText.name);
            console.log('response: '+JSON.stringify(response))
            setUserDetails(response.name,response.email);
        } catch (error) {
            console.log('Something went wrong: '+ error);
        }
    }
   } catch (error) {
    console.log('some error: '+error);
   }
  
}


function setUserDetails(name,mail){
    user_name.innerHTML = name+'<i class="fa fa-pencil"></i>';
    user_mail.innerHTML = mail+'<i class="fa fa-pencil"></i>';
}


