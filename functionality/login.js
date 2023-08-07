import {getElement} from '../utils/util.js';


const form = getElement('#login-form');
const user  = getElement('#username');
const password = getElement('#password');
const error_message = getElement('.err-msg');


var httpRequest;
var url ='http://localhost:9090/api/v1/auth/createToken';

form.addEventListener('submit',function(e){
    e.preventDefault();
    
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Cannot create an http request');
        return;
    }

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('POST',url,true);
    
    httpRequest.setRequestHeader('Access-Control-Allow-Methods','*');
    httpRequest.setRequestHeader('Access-Control-Allow-Origin','*');
    httpRequest.setRequestHeader(
        "Content-Type",
        "application/json"
    )

    var data = {
        "username":`${user.value}`,
        "password":`${password.value}`
    }

    httpRequest.send(JSON.stringify(data));
   
});


function alertContents(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {

        try {
              // alert(httpRequest.responseText);
            const response = JSON.parse(httpRequest.responseText);

            // USER SUCCESSFULLY LOGGED IN
            if(httpRequest.status === 200){
                // location.assign('index.html');
                window.location.href = `index.html?userToken=${response.token}`;
            }


            // USER NOT FOUND 
            if (httpRequest.status === 404 | 500) {
            // console.log('user not found !!!')
                error_message.style.display = 'block';
                user.value ='';
                password.value = '';
                user.addEventListener('click',()=>{
                    error_message.style.display = 'none';
                })

        }
            // alert(response.token);
        } catch (error) {
            console.log(error);
             
        }
       
    }
}