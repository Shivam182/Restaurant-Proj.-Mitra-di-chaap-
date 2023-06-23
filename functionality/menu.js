import  {getElement} from '../utils/util.js';
const cards_div = getElement('.cards');

var httpRequest;
const url = 'http://localhost:9090/api/items';




makeRequest(url);

function makeRequest(url){
    httpRequest =new XMLHttpRequest();
    httpRequest.open('GET',url,true);
    httpRequest.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYWh1bEBnbWFpbC5jb20iLCJleHAiOjE2ODE0ODcwNzgsImlhdCI6MTY4MTQ4NTI3OH0.HGOrlT-3XwbJSKVCbbCHivPedu3OF7-A8pDM-2ewGjQhkZ6t8tVmfdLwWlmM6dJCn0CmK_UomYUw82W4TUCLKw');
    httpRequest.onreadystatechange = setFoodItems;
    httpRequest.send();
}


function setFoodItems(){
    // console.log('here');
    if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
        const response = JSON.parse(httpRequest.responseText);
        // console.log(JSON.stringify(response));

        const imgURL = 'http://localhost:9090/api/item/image/'

        var str = response.content.map((item)=>{

            // console.log(item);

            return ` <!-- single card -->
            <div class="food-card">
              <div class="card-content">
                <h3 class="item-title">${item.title}</h3>
                <img
                  src="${imgURL+item.itemId}"
                  alt="item image"
                  class="item-image"
                />
                <p class="mini-description">
                  ${item.description}
                </p>
                <div class="inner-container">
                 
                <button class="add-order">Add</button>
                <h3 class="price">$${item.price}</h3>
                </div>
              
              </div>
            </div>
            <!-- end of single card -->`;


        }).join('');

        cards_div.innerHTML = str;
        
       

    }
}