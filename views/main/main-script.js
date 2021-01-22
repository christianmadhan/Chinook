import * as urlHelper from '../helper/url.js';

$( document ).ready(() => {
    if(sessionStorage.getItem('auth') == null){
        location.href = urlHelper.constructUrl();
    } else {
        var data = {
            "auth": sessionStorage.getItem('auth')
        }
        $.ajax({
            type: "POST",
            crossDomain: true,
            url: urlHelper.constructUrl('auth', 'checkauth'),
            data: JSON.stringify(data),
            contentType: "application/json",
            statusCode: {
                401: function() {
                    sessionStorage.clear();
                    alert('Your session Has expired, please log in again.');
                    location.href = urlHelper.constructUrl();
                }
            }
        });
    }
});

$('#logout').on('click', () => {
    sessionStorage.clear();
    location.href = urlHelper.constructUrl();
});
