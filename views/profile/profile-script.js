$( document ).ready(() => {
    if(sessionStorage.getItem('auth') == null){
        sessionStorage.clear();
        location.href = "http://localhost/apps/phpvariables/index.php";
    }else {
        $('#loader').show();
        var url = "http://localhost/apps/phpvariables/controller/customer/get-single-customer.php";
        data = {
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
                   location.href = "http://localhost/apps/phpvariables/index.php";
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
    location.href = "http://localhost/apps/phpvariables/index.php";
});

$('.fas').on('click', function() {
    $(this).parent().find('input').prop("disabled", false); 
    $('#submitEditListElm').show();
});

$('#submitBtn').on('click', function() {
    if($("#profileForm").valid()){
        $('#profileForm').hide();
        $('#loader').show();
        var url = "http://localhost/apps/phpvariables/controller/customer/update-customer.php";
        data = {
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
                    location.href = "http://localhost/apps/phpvariables/index.php";
                },
                200: (response) => {
                    location.reload();
                }
            }
        });
        
    }
});