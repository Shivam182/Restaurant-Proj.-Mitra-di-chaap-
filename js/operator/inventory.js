import { getElement } from "../../utils/util.js";
const itemsDiv = getElement('.inventory-table');


var httpRequest;
const url = 'http://localhost:9090/api/items';

makeRequest(url);


function makeRequest(url){
    httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',url,true);
    httpRequest.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYWh1bEBnbWFpbC5jb20iLCJleHAiOjE2ODE0ODcwNzgsImlhdCI6MTY4MTQ4NTI3OH0.HGOrlT-3XwbJSKVCbbCHivPedu3OF7-A8pDM-2ewGjQhkZ6t8tVmfdLwWlmM6dJCn0CmK_UomYUw82W4TUCLKw')
    httpRequest.onreadystatechange = setItems;
    httpRequest.send();
}

function setItems() {


    if(httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200){
        const response = JSON.parse(httpRequest.responseText);
        
        var str = response.content.map((item)=>{
            return `
            <tr>
            <td>${item.itemId}</td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>15</td>
            <td>4.2</td>
            <td>View_Link</td>
            <td>Edit_Product</td>
            </tr>
            `;
        }).join('');

        itemsDiv.innerHTML = `
        <table>
        <tr>
        <th>Item Id</th>
        <th>Name</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Ratings</th>
        <th>View_Link</th>
        <th>Edit Product</th>
    </tr>

    ${str}
        </table>
        `
    }
}