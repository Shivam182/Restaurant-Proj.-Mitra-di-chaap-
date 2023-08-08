import {getElement} from '../../utils/util.js'
const nameField = getElement('#name');
const emailField = getElement('#mail');
const submit_btn = getElement('.submit');



var httpRequest;
const url = 'http://localhost:9090/api/users/1';
const entries = new URLSearchParams(document.location.search);
const userData = {
    'name':'',
    'email':'',
    'password':'shivam123'
}
nameField.value = entries.get('name');
emailField.value = entries.get('mail');


submit_btn.addEventListener('click',function(e){
    e.preventDefault();

    if(nameField.value == '' || emailField.value == ''){
        alert('Make sure all fields are filled');
    }else{
        userData.name = nameField.value;
        userData.email = emailField.value;
        makeRequest(url,userData);
    }

   

});


function makeRequest(url,userData){
    httpRequest = new XMLHttpRequest();
    httpRequest.open('PUT',url,true);
    httpRequest.setRequestHeader('Content-Type','application/json');
    httpRequest.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYW1lc2hAZ21haWwuY29tIiwiZXhwIjoxNjkxNTA3MTAwLCJpYXQiOjE2OTE1MDUzMDB9.h_q9-V3y62WbJqwxKB1-6nGhiUjE9UnrEZRC_Ful0dpw1fN_o8MWr4O6nqrb2pjFB2HlOHg7Ig8Z-EFUHZ1vFQ');
    httpRequest.onreadystatechange = afterSubmit
    httpRequest.send(JSON.stringify(userData));
}


function afterSubmit(){
    console.log(httpRequest.status);
}

