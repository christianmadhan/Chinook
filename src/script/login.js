var num = 0;

$( document ).ready(function() {
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
    $('#myModal').fadeIn( "slow", function() {
        // Animation complete
      });
});

$('#closeModal').on('click', function() {
    $('#myModal').fadeOut( "slow", function() {
        // Animation complete
      });
});

// event = keyup or keydown
document.addEventListener('keyup', event => {
    if (event.code === 'AltLeft') {
        num++;
        console.log(num);
    }
    if(num == 3){
        num = 0;
        $('#adminLoginCrown').fadeIn('slow', function(){});
        $('#adminLoginBtn').fadeIn('slow', function(){});
        $('#loginBtn').hide();
    }
});

$('#loginBtn').on('click', function(e) {
   if($("#loginForm").valid()){
       e.preventDefault();
    data = {
        "Email": $('#email').val(),
        "Password": $('#password').val(),
     }
     var url = "http://localhost/apps/Chinook/controller/auth/login.php";
     $.ajax({
         type: "POST",
         url: url,
         contentType: "application/json",
         data: JSON.stringify(data),
         statusCode: {
            401: function() {
              $('#unauthorized').show();
            },
            200: (response) => {
                $('#unauthorized').hide();
                sessionStorage.setItem('auth', response);
                window.location.href = "http://localhost:/apps/Chinook/views/main/main.php";
            }
          }
       }).done((response) => {
            console.log(response);
       })
     
   }    
});


$('#adminloginBtn').on('click', function() {
    data = {
        "email": $('#email').val(),
        "email": $('#password').val(),
     }

     var url = "http://localhost/apps/Chinook/controller/auth/login.php";
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function(response) {
            console.log(response)
        },
      });
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
     data = {
         "Email": $('#signUpEmail').val(),
         "Password": $('#singUpPassword').val(),
         "RepeatPassword": $('#singUpRepeatPassword').val(),
      }      
      var url = "http://localhost/apps/Chinook/controller/auth/newuser.php";
      $.ajax({
          type: "POST",
          url: url,
          contentType: "application/json",
          data: JSON.stringify(data),
          statusCode: {
             401: function() {
               $('#unauthorized').show();
             },
             200: (response) => {
                 $('#unauthorized').hide();
                 sessionStorage.setItem('auth', response);
                 window.location.href = "http://localhost:/apps/Chinook/views/main/main.php";
             }
           }
        }).done((response) => {
             console.log(response);
        })
      
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