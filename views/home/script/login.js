import * as urlHelper from '../../helper/url.js';

var num = 0;

$( document ).ready(function() {
    if(sessionStorage.getItem('auth')) {
        location.href = urlHelper.constructUrl("redirect", "main");
    }
    $('#loginForm').validate({
        errorClass: "error fail-alert",
        validClass: "valid success-alert",
        rules: {
            email: {
              required: true,
              minlength: 6
            },
            password: {
                required: true,
                minlength: 1
              }
          },
    });
});

// -----------------------------------------------
$('#openloginBtn').on('click', function() {
    $('#userModal').fadeIn( "slow", function() {});
});

$('#closeModal').on('click', function() {
    $('#userModal').fadeOut("slow", function(){});
    $('#adminModal').fadeOut("slow", function(){});

});

$('#closeModalAdmin').on('click', function() {
    $('#adminModal').fadeOut("slow", function(){});

});
// event = keyup or keydown
document.addEventListener('keyup', event => {
    if (event.code === 'AltLeft') {
        num++;
    }
    if(num == 3){
        num = 0;
        $('#userModal').hide();
        $('#adminModal').fadeIn("slow");
    }
});

$('#loginBtn').on('click', function(e) {
   if($("#loginForm").valid()){
       e.preventDefault();
    var data = {
        "Email": $('#email').val(),
        "Password": $('#password').val(),
     }
     var url = urlHelper.constructUrl('auth', 'login');

     $.ajax({
         type: "POST",
         url: url,
         crossDomain: true,
         contentType: "application/json",
         data: JSON.stringify(data),
         statusCode: {
            401: function() {
              $('#unauthorized').show();
            },
            200: (response) => {
                console.log(response);
                $('#unauthorized').hide();
                sessionStorage.setItem('auth', response);
                location.href = urlHelper.constructUrl("redirect", "main");
            }
          }
       }).fail(function(){
        
       });

   }    
});


$('#adminLoginBtn').on('click', function(e) {
    if($('#AdminloginForm').validate()){
        var dataPass = {
            Password: $('#adminPassword').val(),
         }
         var url = urlHelper.constructAdminUrl('auth', 'login')
         console.log('hello?');
        $.ajax({
            type: "POST",
            crossDomain: true,
            url: url,
            data: JSON.stringify(dataPass),
            success: function(response) {
                $('#unauthorizedAdmin').hide();
                sessionStorage.setItem('auth', response);
                location.href = urlHelper.constructAdminUrl('redirect', 'main');
            },
          }).fail(function(){
            $('#unauthorizedAdmin').show();
          });
    }
});


$('#SignUpForm').on('click', function(e) {

    $('#SignUpForm').validate({
        errorClass: "error fail-alert",
        validClass: "valid success-alert",
        rules: {
            signUpEmail: {
              required: true,
              minlength: 6
            },
            signUpPassword: {
                required: true,
                minlength: 4
              },
              repeatPassword: {
                required: true,
                minlength: 4,
                equalTo: "#singUpPassword"
              }
          },
    });


    if($("#SignUpForm").valid()){
        e.preventDefault();
     var data = {
         "Email": $('#signUpEmail').val(),
         "Password": $('#singUpPassword').val(),
         "RepeatPassword": $('#singUpRepeatPassword').val(),
      }
      var url = urlHelper.constructUrl('auth', 'newuser');
      $.ajax({
          type: "POST",
          crossDomain: true,
          url: url,
          contentType: "application/json",
          data: JSON.stringify(data),
          statusCode: {
             401: function() {
               $('#unauthorized').show();
             },
             200: () => {
                 $('#unauthorized').hide();
              var urlLogin = urlHelper.constructUrl('auth', 'login');
              var dataLogin = {
                "Email": $('#signUpEmail').val(),
                "Password": $('#singUpPassword').val(),
                 }
                $.ajax({
                    type: "POST",
                    url: urlLogin,
                    crossDomain: true,
                    contentType: "application/json",
                    data: JSON.stringify(dataLogin),
                    statusCode: {
                       401: function() {
                         $('#unauthorized').show();
                       },
                       200: (response) => {
                           $('#unauthorized').hide();
                           sessionStorage.setItem('auth', response);
                           location.href = urlHelper.constructUrl("redirect", "main");
                       }
                     }
                  });
             }
           }
        });
      
    }    
 });




$('#gotoSignUp').on('click', () => {
    $('#loginDiv').hide();
    $('#closeModal').hide();

    $('#goBackBtn').show();
    $('#SignUpDiv').show();
});

$('#goBackBtn').on('click', () => {
    $('#SignUpDiv').hide();
    $('#goBackBtn').hide();
    
    $('#closeModal').show();
    $('#loginDiv').show();
});