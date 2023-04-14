import { getElement } from "../utils/util.js";


var httpRequest;
const url = 'http://localhost:9090/api/cart/1';



makeRequest(url);

function makeRequest(url){
    httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',url,true);

    httpRequest.onreadystatechange = setCartItems;
    httpRequest.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYWh1bEBnbWFpbC5jb20iLCJleHAiOjE2ODEzOTcwNjQsImlhdCI6MTY4MTM5NTI2NH0.dgwv2W_ETwf8yJH-VHrTeuU-ntgpSdqZCzFh2VZjc9SKIovvEWQ1LcAfv3AhAwhh-d0BGvh5KZS-EeVbWPECPg');
    httpRequest.send();
}


function setCartItems(){
    if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
        const response = JSON.parse(httpRequest.responseText);
        console.log(JSON.stringify(response));
    }
}
