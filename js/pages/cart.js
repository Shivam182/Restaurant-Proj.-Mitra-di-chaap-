import { getElement } from '../../utils/util.js'
import '../common/navbar.js'

const cart_btn = getElement('.checkout-btn');


cart_btn.addEventListener('click',function(){
    location.assign('checkout.html');
});
