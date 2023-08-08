import { getElement } from "../../utils/util.js";
const file_input = getElement('#file-input');
const show_img = getElement('.chosen-images');
const submit = getElement('.submit');

const images = [];
var catId  = 3;
const url = `http://localhost:9090/api/item/category/${catId}`;
var httpRequest;

const itemData = {
    "title":"",
    "price":"",
    "description":"",
    // "images":[]
}


file_input.onchange = () =>{
    const selectedFile = file_input.files[0];
    images.push(selectedFile);
    preview();

    // console.log(images)
}

function preview() {

   
        var str = images.forEach((item)=>{

        const reader = new FileReader();

        reader.readAsDataURL(item);

        reader.addEventListener('load',function(){
            var img = document.createElement('img');
            img.setAttribute('src',reader.result);
            show_img.appendChild(img);
        });
       
    });



    show_img.innerHTML = str;
}


submit.addEventListener('click',function(e){
    e.preventDefault();

    var title = getElement('#name');
    var price = getElement('#price');
    // var imgs = images;
    var description = getElement('#desc');

    if(title.value = '' || price.value == '' || imgs.length === 0 || description.value == ''){
        alert('Make sure all fields are filled');
    }else{

        itemData.title = title.value;
        itemData.price = price.value;
        itemData.description = description.value;
        itemData.images = images;

        makeRequest(url,itemData);
    }


    
});

function makeRequest(url, itemData){

    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST',url,true);
    httpRequest.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYW1lc2hAZ21haWwuY29tIiwiZXhwIjoxNjkxNTAyMzA0LCJpYXQiOjE2OTE1MDA1MDR9.NBmrhCSgBxwnDi9VsyqVJI01LSBOWVzXNgtJ2tdbEa48a0lkAKth73xvLPK4qpnNEB7V4EZ1KcF8zMTw3BuotA');
    httpRequest.setRequestHeader('Content-Type','application/json')
    httpRequest.onreadystatechange = afterSubmit;
    httpRequest.send(JSON.stringify(itemData));

}

function afterSubmit(){
    console.log(httpRequest.status);
}



