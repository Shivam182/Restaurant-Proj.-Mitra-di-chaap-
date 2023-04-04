import { getElement } from '../../utils/util.js'
import '../common/navbar.js'
import '../common/topheader.js'

const order_now = getElement('.order-now');
const order_btn = getElement('.order-btn');
const find_table_btn = getElement('.find-table');
const featured_section = getElement('.featured');
const add_order_btn = getElement('.add-order');


order_now.addEventListener('click', function(){
    location.assign('menu.html');
});

order_btn.addEventListener('click', function(){
    location.assign('menu.html');
});

find_table_btn.addEventListener('click', function(){
    // open ticket modal
});

