import { getElement } from "../../utils/util.js";
const feedbackDiv = getElement('.feed-table');


var httpRequest;
const url = 'http://localhost:9090/api/feedback/all';

makeRequest(url);


function makeRequest(url) {
    httpRequest  = new XMLHttpRequest();
    httpRequest.open('GET',url,true);
    httpRequest.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYWh1bEBnbWFpbC5jb20iLCJleHAiOjE2ODE0ODcwNzgsImlhdCI6MTY4MTQ4NTI3OH0.HGOrlT-3XwbJSKVCbbCHivPedu3OF7-A8pDM-2ewGjQhkZ6t8tVmfdLwWlmM6dJCn0CmK_UomYUw82W4TUCLKw')
    httpRequest.onreadystatechange = setItems;
    httpRequest.send();
}

function setItems () {

    if(httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200){
        const response = JSON.parse(httpRequest.responseText);

        var str = response.map((item)=>{
            return `
            <tr>
                    <td>${item.name}</td>
                    <td>${item.id}</td>
                    <td>${item.email}</td>
                    <td>Message_Link</td>
                </tr>
            `;
        }).join('');


        feedbackDiv.innerHTML = `
        <table>
        <tr>
        <th>UserName</th>
        <th>FeedId</th>
        <th>E-mail</th>
        <th>Message</th>
        </tr>

        ${str}
        </table>
        `
    }

}