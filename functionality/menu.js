import  {getElement} from '../utils/util.js';
const cards_div = getElement('.cards');

var httpRequest;
const url = 'http://localhost:9090/api/items';



makeRequest(url);

function makeRequest(url){
    httpRequest =new XMLHttpRequest();
    httpRequest.open('GET',url,true);
    httpRequest.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYWh1bEBnbWFpbC5jb20iLCJleHAiOjE2ODE0NzM0MTgsImlhdCI6MTY4MTQ3MTYxOH0.5suTg9u16gOpAJT2WwP5ExU_m2uVpC1c6JYeykM5h1OXjfwVBpcc8M51c_JTkT1hJWw7NP4bf7YLzdvllLZsyQ');
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
            <div class="card">
              <div class="card-body">
                <h3 class="item-title">${item.title}</h3>
                <img
                  src="${imgURL+item.itemId}"
                  alt="item image"
                  class="item-image"
                />
                <p class="mini-desc">
                  ${item.description}
                </p>
                <h3 class="price">${item.price}</h3>
                <button class="addTocart">Add</button>
              </div>
            </div>
            <!-- end of single card -->`;


        }).join('');

        cards_div.innerHTML = str;
        
       

    }
}