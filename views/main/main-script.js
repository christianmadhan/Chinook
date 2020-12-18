import * as urlHelper from '../helper/url.js';

$( document ).ready(() => {
    if(sessionStorage.getItem('auth') == null){
        location.href = urlHelper.constructUrl();
    }
});

$('#logout').on('click', () => {
    sessionStorage.clear();
    location.href = urlHelper.constructUrl();
});
