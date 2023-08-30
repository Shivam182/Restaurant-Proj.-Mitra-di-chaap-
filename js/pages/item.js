import {getElement, getStorage} from '../../utils/util.js';

const container = getElement('.main');
const saveReviewBtn = document.querySelector('#review-submit');
const reviewWrite = document.querySelector('#write-review');


const url = new URLSearchParams(document.location.search);
const token = getStorage('token');

var userMail = parseJwt(token).sub;
var getItemRequest;
var updateReviewsRequest;



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
    
          <div class="description-box">
            <p class="content">
             ${response.description}
            </p>
          </div>
    
          <div class="price-cart">
            <h2 class="price">$${response.price}</h2>
            <button class="cart">Add To Cart</button>
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


            container.innerHTML = str + ` <div class="reviews">
            <h2 class="headin">Reviews</h2>
                ${reviews}
            </div>`;

       

        btns();

           
    }

}



function btns() {


    const prev_btn = document.querySelector('#prev');
    const next_btn  = document.querySelector('#next');
    const imageBox = document.querySelector('.image');
    
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
    })
    

}

saveReviewBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    
    var reviewurl = `http://localhost:9090/api/reviews/user/${userMail}/item/${url.get('id')}`;


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