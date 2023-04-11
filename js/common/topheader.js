import { getElement } from "../../utils/util.js";

const top_title = getElement('.top-title');
const bell_icon = getElement('.bellicon');
const person_icon = getElement('.person-icon');
const down_arrow_icon = getElement('.arrow-down-icon');
const notif_box = getElement('.notif-box');
const expand_box = getElement('.expand-box');
const fa_arrow = getElement('.fa-chevron-down');
const login_btn = getElement('#login-btn');
const signup_btn = getElement('#sign-btn');
const login_signup_box = getElement('.login-signup');


const urlSearchParams = new URLSearchParams(window.location.search);



const userToken = urlSearchParams.get('userToken');

if (userToken) {
    login_signup_box.style.display = 'none';
}


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
    // location.assign('profile.html');
    window.location.href = `profile.html?userToken=${userToken}`
});


down_arrow_icon.addEventListener('click', function(){
    // console.log('expand arrow clicked')
    if (notif_box.classList.contains('show')) {
        notif_box.classList.remove('show');
    }
    fa_arrow.classList.toggle('rotate');
    expand_box.classList.toggle('show');
});


login_btn.addEventListener('click',function(){
    location.assign('login.html');
});

signup_btn.addEventListener('click',function(){
    location.assign('login.html');
});


