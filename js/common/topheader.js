import { getElement } from "../../utils/util.js";

const top_title = getElement('.top-title');
const bell_icon = getElement('.bellicon');
const person_icon = getElement('.person-icon');
const down_arrow_icon = getElement('.arrow-down-icon');
const notif_box = getElement('.notif-box');
const expand_box = getElement('.expand-box');
const fa_arrow = getElement('.fa-chevron-down');



top_title.addEventListener('click', function(){

    // navigate to another url and can return back.
    location.assign('menu.html');
});

bell_icon.addEventListener('click',function(){
    // console.log('bell icon pressed')

    if (expand_box.classList.contains('show')) {
        expand_box.classList.remove('show');
    }

    notif_box.classList.toggle('show');
});

person_icon.addEventListener('click', function(){
    location.assign('profile.html');
});


down_arrow_icon.addEventListener('click', function(){
    // console.log('expand arrow clicked')
    if (notif_box.classList.contains('show')) {
        notif_box.classList.remove('show');
    }
    fa_arrow.classList.toggle('rotate');
    expand_box.classList.toggle('show');
});







