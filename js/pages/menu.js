// import '../common/topheader.js'
import '../common/navbar.js'
import { getElement } from '../../utils/util.js'

// console.log('at menu')




const dine_in_btn = getElement('.reservation-btn');
const cart_btn = getElement('.goToCart');




// console.log(cart_btn)

dine_in_btn.addEventListener('click', function(){
    location.assign('index.html');
    console.log('current location: ');
    console.log()
});

cart_btn.addEventListener('click',function(){
    // console.log('clicked')
    location.assign('cart.html')
});


