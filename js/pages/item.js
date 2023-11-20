import {getElement, getStorage} from '../../utils/util.js';

const container = getElement('.main');
const saveReviewBtn = document.querySelector('#review-submit');
const reviewWrite = document.querySelector('#write-review');


/**
 * PENDING :
 * 
 * 1. Implement Review Submission by user.
 * 2. Implement Add To Cart Button Functionality.
 * 
 */


const url = new URLSearchParams(document.location.search);
const token = getStorage('token');

var userId;
var addToCartUrl;
var foodItemId = url.get('id');

if(!token || token.length == 0) {
    location.href =  `login.html`;
}

var userMail = parseJwt(token).sub;
var getItemRequest;
var updateReviewsRequest;


var userUrl = `http://localhost:9090/api/users/email/${userMail}`;
var getItemUrl = `http://localhost:9090/api/item/get/${url.get('id')}`;

const imagesArray = []

getItemRequestFunction(getItemUrl);

function getItemRequestFunction(url) {

    getItemRequest = new XMLHttpRequest();
    getItemRequest.open('GET', url, true);
    getItemRequest.setRequestHeader('Authorization', token);
    getItemRequest.onreadystatechange = setItemsData;
    getItemRequest.send();

}


function setItemsData() {

    if(getItemRequest.readyState == XMLHttpRequest.DONE && getItemRequest.status === 200){

            const response = JSON.parse(getItemRequest.responseText);

            // console.log(JSON.stringify(response));
            imagesArray[0] = response.image1;
            imagesArray[1] = response.image2;
            imagesArray[2] = response.image3;


            var str = `
            <div class="item-box">
                <div class="item-name">${response.title}</div>
            <div class="image-carousel">
              <button id="prev"><</button>
              <img src="${imagesArray[0]}" alt="food image" class="image" />
              <button id="next">></button>
            </div>
          </div> 
          
          <div class="price-cart">
            <h2 class="price">$${response.price}</h2>
            <button class="cart">Add To Cart</button>
          </div>
    
          <div class="description-box">
            <p class="content">
             ${response.description}
            </p>
          </div>
         
    
          
            `;

            var reviews = response.reviews.map((item)=>{

                return `
                <div class="review-box" id=${item.userId}>
                <h3 class="user-data">${item.userName}</h3>
                <p class="review-text">
                   ${item.content}
                </p>
                </div>
                `
            }).join('')


            container.innerHTML = str + `<div class="reviews">
            <h2 class="headin">Reviews</h2>
                <div class="rev-container"> ${reviews}</div>
               
            </div>`;

       

        btns();

           
    }

}



function btns() {


    const prev_btn = document.querySelector('#prev');
    const next_btn  = document.querySelector('#next');
    const imageBox = document.querySelector('.image');

    const submit_review_btn = document.querySelector('#review-submit');
    const cart_add_btn = document.querySelector('.cart');
    
    var index  = 1;

    prev_btn.addEventListener('click', (e)=>{

        if(index < 0) {
            index  = 2;
        }

        imageBox.setAttribute('src',imagesArray[index--]);
    });


    next_btn.addEventListener('click', (e)=>{
            if(index > 2 ){
                index = 0;
            }

            imageBox.setAttribute('src',imagesArray[index++]);
    });

    cart_add_btn.addEventListener('click', (e)=>{

        
        getuser(userUrl);

    });

    submit_review_btn.addEventListener('click', (e)=>{


    })
    

}

saveReviewBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    
    var reviewurl = `http://localhost:9090/api/reviews/user/${userMail}/item/${foodItemId}`;


    const reviewData = {
        'content':''
    }

    

    if (reviewWrite.value == '') {
        alert('Please Write the review');
    }else{
        reviewData.content = reviewWrite.value;
        saveReview(reviewurl, reviewData);
        reviewWrite.value = '';
    }

    
})



function saveReview(reviewUrl, data) {

    updateReviewsRequest = new XMLHttpRequest();
    updateReviewsRequest.open('POST', reviewUrl, true);
    updateReviewsRequest.setRequestHeader('Authorization', token);
    updateReviewsRequest.setRequestHeader('Content-Type','application/json');
    updateReviewsRequest.onreadystatechange = reloadPage;
    updateReviewsRequest.send(JSON.stringify(data));

}

function reloadPage (){

    console.log(updateReviewsRequest.status);
    
    if(updateReviewsRequest.readyState == XMLHttpRequest.DONE && updateReviewsRequest.status === 200){

        // refresh the page

        console.log(updateReviewsRequest.responseText);




    }

}



var getUserReq;

function getuser(url) {

  getUserReq = new XMLHttpRequest();

  getUserReq.open('GET', url);

  getUserReq.setRequestHeader('Authorization', token);

  getUserReq.onreadystatechange =  () => {

    if(getUserReq.readyState == XMLHttpRequest.DONE && getUserReq.status === 200) {
      var res = JSON.parse(getUserReq.responseText);

      // console.log(JSON.stringify(res));


      userId = res.id;

      addToCartUrl = `http://localhost:9090/api/cart/add` + `/${userId}/${foodItemId}/1`;
      addItemToCartRequest(addToCartUrl);

    }else if(getUserReq.status == 401) {
      location.href = `login.html`;
      // console.log(getUserReq.status)
    }

  }

  getUserReq.send();

}

var cartAddReq;

function addItemToCartRequest(cartUrl) {

  cartAddReq = new XMLHttpRequest();

  cartAddReq.open('PUT', cartUrl);
  cartAddReq.setRequestHeader('Authorization',token);
  cartAddReq.onreadystatechange = () => {

    if(cartAddReq.readyState == XMLHttpRequest.DONE && cartAddReq.status === 200) {
      location.assign(`cart.html`);
    }else {
      // console.log(cartAddReq)
    }

  }

  cartAddReq.send();
}



function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  
    return JSON.parse(jsonPayload);
  }