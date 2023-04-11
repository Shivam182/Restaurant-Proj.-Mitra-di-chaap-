// import '../common/topheader.js'
import '../common/navbar.js'
import { getElement } from '../../utils/util.js'

// console.log('at menu')

var httpRequest;
const url = 'http://localhost:9090/api/items'


const dine_in_btn = getElement('.reservation-btn');
const cart_btn = getElement('.goToCart');


// console.log(cart_btn)

dine_in_btn.addEventListener('click', function(){
    location.assign('index.html');
    console.log('current location: ');
    console.log()
});

cart_btn.addEventListener('click',function(){
    console.log('clicked')
    location.assign('cart.html')
});



makeRequest(url);




function makeRequest(url){
    httpRequest = new XMLHttpRequest();

    httpRequest.open('GET',url,true);
    httpRequest.onreadystatechange = getAllItems;
    httpRequest.setRequestHeader('Authorization',`Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaGl2YW1AZ21haWwuY29tIiwiZXhwIjoxNjgxMTE2NzI1LCJpYXQiOjE2ODExMTQ5MjV9.sOwXDExmmrcfceeEONf_w0MxQsy1FDd4wC5s0B-QHou7USUJov6ahIHZVIGSpITHxpf_zgWvkFTN3F4v9WuX2A`);
    console.log('i ran');

    httpRequest.send();
}


function getAllItems(){
    try {
         if (httpRequest.status === 200) {
        const response = JSON.parse(httpRequest.responseText);
        console.log('response : '+ JSON.stringify(response));
    }
    } catch (error) {
        console.log(error);
    }

   

}