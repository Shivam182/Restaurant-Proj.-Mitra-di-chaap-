import { getElement } from '../../utils/util.js'
import '../common/navbar.js'
import '../common/topheader.js'

const order_now = getElement('.order-now');
const order_btn = getElement('.order-btn');
const find_table_btn = getElement('.find-table');
const featured_section = getElement('.featured');

order_now.addEventListener('click', function(){
    location.assign('menu.html');
});

order_btn.addEventListener('click', function(){
    location.assign('menu.html');
});

find_table_btn.addEventListener('click', function(){
    // open ticket modal
});

