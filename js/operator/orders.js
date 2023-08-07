import { getElement } from "../../utils/util.js";
const orderDiv = getElement('.order-table');

var httpRequest;
const url = 'http://localhost:9090/api/order/all';

makeRequest(url);


function makeRequest(url){
    httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',url,true);
    httpRequest.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYWh1bEBnbWFpbC5jb20iLCJleHAiOjE2ODE0ODcwNzgsImlhdCI6MTY4MTQ4NTI3OH0.HGOrlT-3XwbJSKVCbbCHivPedu3OF7-A8pDM-2ewGjQhkZ6t8tVmfdLwWlmM6dJCn0CmK_UomYUw82W4TUCLKw');
    httpRequest.onreadystatechange = setItems;
    httpRequest.send();
}


function setItems () {

    console.log(httpRequest.status)

    if(httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200){

        const response = JSON.parse(httpRequest.responseText);

        // console.log(JSON.stringify(response));

        var str = response.map((item)=>{
            return `
            <tr>
                    <td>${item.id}</td>
                    <td>${item.status}</td>
                    <td>${item.price}</td>
                    <td>2/3/23</td>
            </tr>
            `
        }).join('');


        orderDiv.innerHTML = `
        <table>
        <tr>
                    <th>OrderId</th>
                    <th>Order Status</th>
                    <th>Price</th>
                    <th>Placed On</th>
                </tr>
                ${str}
        </table>
        `;

    }
}