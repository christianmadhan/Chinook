<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="src/styles/login.css">
    <link rel="icon" type="image/png" href="src/img/music_icon.png"/>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <title>Music Store</title>
</head> 
<body>
    <nav>
        <button class="openlogin" id="openloginBtn">
            Sign In
        </button>
    </nav>
    <hr>
    <main>
        
        <!-- The Modal -->
        <div id="myModal" class="modal">
            
            <!-- Modal content -->
            <div class="modal-content">
                <div class="spanCloseModal close" id="closeModal">
                    <img   src="./src/img/icons/close-window.png">
                </div>
                <div class="spanCloseModal close" id="goBackBtn" style="display:none;">
                <img src="./src/img/icons/back-arrow.png">
                </div>
    <div class="crown" id="adminLoginCrown" style="display:none;">
        <img src="./src/img/icons/crown.png">
    </div>
    <div class="form-table" id="loginDiv">
        <form id="loginForm" action="">
            <input type="email" placeholder="Email" id="email" name="email" >
            <input type="password" placeholder="Password" name="password" id="password" autocomplete="on">
            <h5 class="wrongcredentials" id="unauthorized" style="display:none;">Wrong credentials</h5>
            <button class="login" id="loginBtn">
                Sign In
            </button>
            <button class="adminlogin" id="adminLoginBtn" style="display:none;">
                Login
            </button>
            <div class="signup">
                <a id="gotoSignUp">Don't have an account? Sign up!</a>
            </div>
        </form>
    </div>
    <div class="form-table" id="SignUpDiv" style="display:none;">
        <form id="SignUpForm" action="">
            <input type="email" placeholder="Email" id="signUpEmail" name="signUpEmail" >
            <input type="password" placeholder="Password" name="signUpPassword" id="singUpPassword" autocomplete="on">
            <input type="password" placeholder="Repeat Password" name="repeatPassword" id="singUpRepeatPassword" data-rule-equalTo="#singUpPassword" autocomplete="on">
            <button class="login" id="signUpBtn">
                Create Account
            </button>
        </form>
    </div>
</div>



</main>
<footer>
</footer>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.2/dist/jquery.validate.min.js" crossorigin="anonymous"></script> 
    <script src="./src/script/login.js"></script>
</body>
</html>                         