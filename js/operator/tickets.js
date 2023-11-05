import { getElement, getStorage } from "../../utils/util.js";

const searchName = getElement('#find-name');
const searchNameBtn = getElement('.find-name')
const searchUserId = getElement('#find-userid')
const searchUserIdBtn = getElement('.find-userid')
const searchTime = getElement('#find-time');
const searchTimeBtn = getElement('.find-time');

const searchTable = getElement('#find-table');
const searchTableBtn = getElement('.find-table');

const ticketsTable = getElement('.tickets-table');


// BIND THE SETITEMS CALLBACK WITH RELATIVE HTTP REQUEST


var usertoken = getStorage('token');

if(usertoken.length == 0) {
    location.href = `login.html`;
}

var alltktUrl = `http://localhost:9090/api/ticketing/all`;

var searchIdUrl
var searchNameUrl 
var searchTableUrl 
var searchTimeUrl


var httpRequest1;
var httpRequest2;
var httpRequest3;
var httpRequest4;
var httpRequest5;


getAllTickets(alltktUrl)


searchNameBtn.addEventListener('click', ()=>{

    const text = searchName.value;

    if(text == "") {
        alert('Please Provide Input');
    }else{
        
        searchNameUrl = `http://localhost:9090/api/ticketing/tickets/name`;
        searchNameReq(searchNameUrl);
        ticketsTable.innerHTML = "";


    }

})

searchTimeBtn.addEventListener('click', ()=>{
const text = searchTime.value;

    if(text == "") {
        alert('Please Provide Input');
    }else{
        searchTimeUrl  = `http://localhost:9090/api/ticketing/tickets/time`;
        searchTimeReq();
        ticketsTable.innerHTML = "";

        
    }
})

searchUserIdBtn.addEventListener('click', ()=>{
    const text = searchUserId.value;

    if(text == "") {
        alert('Please Provide Input');
    }else{
        searchIdUrl  = `http://localhost:9090/api/ticketing/tickets/user`;
        searchUserIdReq(searchIdUrl);
        ticketsTable.innerHTML = "";

        
    }
})


searchTableBtn.addEventListener('click', ()=>{
    const text = searchTable.value;

    if(text == "") {
        alert('Please Provide Input');
    }else{

        searchTableUrl = `http://localhost:9090/api/ticketing/tickets/size`;
        searchTableReq(searchTableUrl);
        ticketsTable.innerHTML = "";

        
    }
})

function getAllTickets(url) {

    httpRequest1 = new XMLHttpRequest();

    httpRequest1.open('GET', url, true);
    httpRequest1.setRequestHeader('Authorization', usertoken);
    httpRequest1.onreadystatechange = setItems;
    httpRequest1.send();

}

function searchNameReq(url) {
    httpRequest2 = new XMLHttpRequest();

    httpRequest2.open('GET', url, true);
    httpRequest2.setRequestHeader('Authorization', usertoken);
    httpRequest2.onreadystatechange = setItems;
    httpRequest2.send();
}

function searchTimeReq(url) {
    httpRequest3 = new XMLHttpRequest();

    httpRequest3.open('GET', url, true);
    httpRequest3.setRequestHeader('Authorization', usertoken);
    httpRequest3.onreadystatechange = setItems;
    httpRequest3.send();
}

function searchTableReq(url) {
    httpRequest4 = new XMLHttpRequest();

    httpRequest4.open('GET', url, true);
    httpRequest4.setRequestHeader('Authorization', usertoken);
    httpRequest4.onreadystatechange = setItems;
    httpRequest4.send();
}

function searchUserIdReq(url) {
    httpRequest5 = new XMLHttpRequest();

    httpRequest5.open('GET', url, true);
    httpRequest5.setRequestHeader('Authorization', usertoken);
    httpRequest5.onreadystatechange = setItems;
    httpRequest5.send();
}


function setItems () {

}
