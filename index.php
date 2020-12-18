<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./views/home/styles/login.css">
    <link rel="icon" type="image/png" href="./views/home/img/music_icon.png"/>
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
    <div class="welcome">
    <img style="background-color: #1f1f1f;" src="./views/home/img/icons/store.png" height="100">
    </div>
    <main>
        
    <!-- The Modal -->
    <div id="userModal" class="modal">      
        <!-- Modal content -->
        <div class="modal-content">
            <div class="spanCloseModal close" id="closeModal">
                <img   src="./views/home//img/icons/close-window.png">
            </div>
            <div class="spanCloseModal close" id="goBackBtn" style="display:none;">
            <img src="./views/home/img/icons/back-arrow.png">
            </div>
        <div class="form-table" id="loginDiv">
            <form id="loginForm" action="">
                <input type="email" placeholder="Email" id="email" name="email" >
                <input type="password" placeholder="Password" name="password" id="password" autocomplete="on">
                <h5 class="wrongcredentials" id="unauthorized" style="display:none;">Wrong credentials</h5>
                <button class="login" id="loginBtn">
                    Sign In
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
</div>

<div id="adminModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content" id="adminModal">
        <div class="spanCloseModal close" id="closeModalAdmin">
            <img   src="./views/home/img/icons/close-window.png">
        </div>
    <div class="crown" id="adminLoginCrown">
        <img src="./views/home/img/icons/crown.png">
    </div>
    <div class="form-table">
        <form id="AdminloginForm">
            <input type="password" placeholder="Password" name="adminPassword" id="adminPassword" autocomplete="on">
            <h5 class="wrongcredentials" id="unauthorizedAdmin" style="display:none;">Wrong credentials</h5>
            <button class="adminlogin" type="button" id="adminLoginBtn">
                Login
            </button>
        </form>
    </div>
    </div>
</div>

<section class="welcome">
<h1>Welcome to Chinook Abrided</h1>
</section>
<section class="welcome">
    <p>
        We are a music store that enables you to browse and buy over 500+ songs 
    </p>
</section>
<section class="welcome">
    <p>
        To get started, create a new user or sign in!
    </p>
</section>
<hr>


</main>
<footer>
    &copy;  Christian Witt
</footer>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.2/dist/jquery.validate.min.js" crossorigin="anonymous"></script> 
    <script src="./views/home/script/login.js" type="module"></script>
</body>
</html>                         