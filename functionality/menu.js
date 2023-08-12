import  {getElement} from '../utils/util.js';
const cards_div = getElement('.cards');
const priceSelector = getElement('#price-slider');

var httpRequest;
const url = 'http://localhost:9090/api/items';

var httpRe1;
var cat;
var selectCatURL;

var httpRe2;
var catId = 0;

var fileteredUrl;

var selectPrice;
var httpRe3;
var priceURL;

const filters = getElement('.filter-items');


priceSelector.addEventListener('change',(e)=>{

  // e.preventDefault();
  // console.log(e.target.value)

  selectPrice = e.target.value;
  priceURL = `http://localhost:9090/api/item/price/10/${selectPrice}`;

  getItemsByPrice(priceURL);


});


function getItemsByPrice(url) {
  
  httpRe3 = new XMLHttpRequest();
  httpRe3.open('GET',url,true);
  httpRe3.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYWh1bEBnbWFpbC5jb20iLCJleHAiOjE2ODE0NzgxNjUsImlhdCI6MTY4MTQ3NjM2NX0.wLgwuu76FKgJmFvo6xP-_iExbNJLyetWbf3c2a_3udsfeWwdBhGal6VFKZyzCYpIISFMcO7AYiwpjyEFaBzBNg');
  httpRe3.onreadystatechange = setItemsByPrice;
  httpRe3.send();

}

function setItemsByPrice(){


  if(httpRe3.readyState === XMLHttpRequest.DONE && httpRe3.status === 200){
    var res = JSON.parse(httpRe3.responseText);

    var str = res.map((item)=>{

      // console.log(item);

      return ` <!-- single card -->
      <div class="food-card">
        <div class="card-content">
          <h3 class="item-title">${item.title}</h3>
          <img
            src="${item.image1}"
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


filters.addEventListener('click',(e)=>{
  // e.preventDefault();
  // console.log(e.target.textContent)
  cat = e.target.textContent;
  selectCatURL = `http://localhost:9090/api/categories/name/${cat}`;

  getCategory(selectCatURL);
   
  if(catId === 0){
    fileteredUrl = url;
  }else{
    fileteredUrl = `http://localhost:9090/api/category/${catId}/items`;
    getFilteredItems(fileteredUrl);
  }

})


function getCategory(url){
  httpRe1 = new XMLHttpRequest();
  httpRe1.open('GET',url,true);
  httpRe1.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYWh1bEBnbWFpbC5jb20iLCJleHAiOjE2ODE0NzgxNjUsImlhdCI6MTY4MTQ3NjM2NX0.wLgwuu76FKgJmFvo6xP-_iExbNJLyetWbf3c2a_3udsfeWwdBhGal6VFKZyzCYpIISFMcO7AYiwpjyEFaBzBNg');
  httpRe1.onreadystatechange = setCat;
  httpRe1.send();
}

function setCat(){
  if(httpRe1.readyState === XMLHttpRequest.DONE && httpRe1.status === 200){
    var res = JSON.parse(httpRe1.responseText);

    catId  = res.categoryId;
  }
}

function getFilteredItems(url){
  httpRe2 = new XMLHttpRequest(); 
  httpRe2.open('GET',url,true);
  httpRe2.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYWh1bEBnbWFpbC5jb20iLCJleHAiOjE2ODE0NzgxNjUsImlhdCI6MTY4MTQ3NjM2NX0.wLgwuu76FKgJmFvo6xP-_iExbNJLyetWbf3c2a_3udsfeWwdBhGal6VFKZyzCYpIISFMcO7AYiwpjyEFaBzBNg');
  httpRe2.onreadystatechange = setFilteredItems;
  httpRe2.send();
 
}

function setFilteredItems(){

  if(httpRe2.readyState === XMLHttpRequest.DONE && httpRe2.status === 200){
    var response = JSON.parse(httpRe2.responseText);

    // console.log(JSON.stringify(response));


    var str = response.map((item)=>{

      // console.log(item);

      return ` <!-- single card -->
      <div class="food-card">
        <div class="card-content">
          <h3 class="item-title">${item.title}</h3>
          <img
            src="${item.image1}"
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

        // const imgURL = 'http://localhost:9090/api/item/image/'

        var str = response.content.map((item)=>{

            // console.log(item);

            return ` <!-- single card -->
            <div class="food-card">
              <div class="card-content">
                <h3 class="item-title">${item.title}</h3>
                <img
                  src="${item.image1}"
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