import * as urlHelper from '../helper/url.js';

$( document ).ready(() => {
    if(sessionStorage.getItem('auth') == null){
        sessionStorage.clear();
        location.href = urlHelper.constructUrl();
    }else {
        $('#loader').show();
        var url = urlHelper.constructUrl('customer', 'get-single-customer');
        var data = {
            auth: sessionStorage.getItem("auth")
        }
        $.ajax({
           type: "POST",
           url: url,
           data: JSON.stringify(data),
           contentType: "application/json",
           statusCode: {
               401: (res) => {
                   console.log(res);
                    sessionStorage.clear();
                   alert('Your session Has expired, please log in again.');
                   location.href = urlHelper.constructUrl();
               },
               200: (response) => {
                $('#loader').hide();
                $('#profileForm').show();
                $('#email').val(response[0].Email);
                $('#firstname').val(response[0].FirstName);
                $('#lastname').val(response[0].LastName);
                $('#company').val(response[0].Company);
                $('#address').val(response[0].Address);
                $('#city').val(response[0].City);
                $('#state').val(response[0].State);
                $('#country').val(response[0].Country);
                $('#postalCode').val(response[0].PostalCode);
                $('#phone').val(response[0].Phone);
                $('#fax').val(response[0].Fax);   
               }
           }
       });
    }
});

$('#logout').on('click', function(){
    sessionStorage.clear();
    location.href = urlHelper.constructUrl();
});

$('.fas').on('click', function() {
    $(this).parent().find('input').prop("disabled", false); 
    $('#submitEditListElm').show();
});

$('#changePassBtn').on('click', function(){
    $('#changePasswordModal').show();
});

$('#changePassSubmitBtn').on('click', function(){
    var url = urlHelper.constructUrl('auth', 'changepassword');
    var data = {
        auth: sessionStorage.getItem("auth"),
        Password: $('#newpassword').val()
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        statusCode: {
            401: () => {
                alert('Your session Has expired, please log in again.');
                location.href = urlHelper.constructUrl();
            },
            200: () => {
                $('#changePasswordModal').hide();
                $('#alertSuccessModal').show();
            }
        }
    }).fail(function(){
        $('#alertDangerModal').show();
    });
});


$('#submitBtn').on('click', function() {
    if($("#profileForm").valid()){
        $('#profileForm').hide();
        $('#loader').show();
        var url = urlHelper.constructUrl('customer', 'update-customer');
        var data = {
            auth: sessionStorage.getItem("auth"),
            Firstname: $('#firstname').val(),
            Lastname: $('#lastname').val(),
            Company: $('#company').val(),
            Address: $('#address').val(),
            City: $('#city').val(),
            State: $('#state').val(),
            Country: $('#country').val(),
            PostalCode: $('#postalCode').val(),
            Phone: $('#phone').val(),
            Fax: $('#fax').val(),
            Email: $('#email').val()
        };
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json",
            statusCode: {
                401: () => {
                    alert('Your session Has expired, please log in again.');
                    location.href = urlHelper.constructUrl();
                },
                200: (response) => {
                    location.reload();
                }
            }
        });
        
    }
});


$('.closeBtn').on('click', function(e){
    $('#changePasswordModal').hide();
    $('#alertSuccessModal').hide();
    $('#alertDangerModal').hide();
});