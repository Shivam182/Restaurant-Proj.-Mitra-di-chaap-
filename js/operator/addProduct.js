import { getElement, getStorage } from "../../utils/util.js";
const file_input = getElement("#image");
const show_img = getElement(".chosen-images");
const submit = getElement(".submit");



/**
 * !!!!! CAUTION: The image upload service is only working with postman. 
 */


var userToken = getStorage('token');

const images = [];
var url; 
var imgUrl;
var httpRequest1;
var httpRequest;

const itemData = {
  title: "",
  price: "",
  description: "",
  stock: "",
  catID:"",
};

const imgData = {
  image: [],
};

file_input.onchange = () => {
  const selectedFile = file_input.files[0];
  images.push(selectedFile);
  preview();
};

function preview() {
  var str = images.forEach((item) => {
    const reader = new FileReader();

    reader.readAsDataURL(item);

    reader.addEventListener("load", function () {
      var img = document.createElement("img");
      img.setAttribute("src", reader.result);
      show_img.appendChild(img);
    });
  });

  show_img.innerHTML = str;
}

submit.addEventListener("click", function (e) {
  e.preventDefault();

  var title = getElement("#item-name");
  var price = getElement("#price");
  // var imgs = images;
  var description = getElement("#desc");
  var stk = getElement("#stock");
  var category = getElement('#cat');

  if (
    title.value == "" ||
    price.value == "" ||
    images.length == 0 ||
    description.value == "" ||
    stk.value == "" || 
    category.value == 0
  ) {
    alert("Make sure all fields are filled");
  } else {
    itemData.title = title.value;
    itemData.price = price.value;
    itemData.description = description.value;
    itemData.stock = stk.value;

    url = `http://localhost:9090/api/item/category/${category.value}`;

    makeRequest(url, itemData);

    
    var formData = new FormData();
    formData.append("image", images);

    imgUrl = `http://localhost:9090/api/item/image/upload/17`;

    // uploadImage(imgUrl, formData);
  }
});

function makeRequest(url, itemData) {
  httpRequest = new XMLHttpRequest();
  httpRequest.open("POST", url, true);
  httpRequest.setRequestHeader(
    "Authorization",
userToken  );
  httpRequest.setRequestHeader("Content-Type", "application/json");
  httpRequest.onreadystatechange = afterSubmit;
  httpRequest.send(JSON.stringify(itemData));
}

function afterSubmit() {}

function uploadImage(url, data) {
  httpRequest1 = new XMLHttpRequest();
  httpRequest1.open("PUT", url);
  httpRequest1.setRequestHeader(
    "Content-Type",
    "multipart/form-data; boundary=WebAppBoundary"
  );
  httpRequest1.setRequestHeader(
    "Authorization",
userToken  );
  httpRequest1.send(data);
}
