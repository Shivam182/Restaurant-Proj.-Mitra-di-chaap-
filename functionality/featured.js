import { getElement } from "../utils/util.js";
const featured_section = getElement('.featured');
const img = getElement('.img-img');
console.log(img)
// get featured item's ids from operator backend and fetch those items from customer backend.



var httpRequest;
var featured_items= {
    'featured':['9','10','11'],
    'items':[]
};

var url = 'http://localhost:9090/api/item/';

const images = [];




 httpRequest = new XMLHttpRequest();
makeRequest(0,featured_items.featured.length);






function makeRequest(i,length){
    if (i >= length) {
        setFootItems(featured_items);
        return;
    }

       
        httpRequest.open('GET',url+featured_items.featured[i]);
        httpRequest.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYWh1bEBnbWFpbC5jb20iLCJleHAiOjE2ODE0NzE1MDcsImlhdCI6MTY4MTQ2OTcwN30.cuhNvSTq2jU15AXE3AGp-ZoJ-JH1UQbbhugEqx9k8BWmDtKKVdu58EA4qd9DCgG_RLRzBtv-kgl8d-7-qfrgiw');
        httpRequest.onreadystatechange = ()=>{
            if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
              
                featured_items.items.push(JSON.stringify(data));
                makeRequest(i+1,featured_items.featured.length);
            }
        }

        httpRequest.send();
   
}

function setFootItems(featured_items){
   var str = featured_items.items.map(item => {
    const element = JSON.parse(item);
    const imgURL = 'http://localhost:9090/api/item/image/'

    // img.src = 'http://localhost:9090/api/item/image/9'
         return `
    <div class="food-card">
      <div class="card-content">
      <h3 class="item-title">${element.title}</h3>
        <img class="img-img" src="${imgURL+element.itemId}" alt="food image" />
        <p class="mini-description">
        ${element.description}
        </p>
        <h3 class="price">${element.price}</h3>
        <button class="add-order">order</button>
      </div>
    </div>`;



   }).join('');

//    console.log(str);

featured_section.innerHTML = str;
   
}


