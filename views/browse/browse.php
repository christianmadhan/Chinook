<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./browse-style.css">
    <link rel="icon" type="image/png" href="../../src/img/music_icon.png"/>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <title>Music Store</title>
</head> 
<body>
    <div class="mobileMenu">
    <i class="fas fa-bars fa-2x"></i>
    </div>
    <nav>
        <a class="link" href="http://localhost/apps/phpvariables/views/main/main.php">Home</a>
        <a class="link" href="http://localhost/apps/phpvariables/views/profile/profile.php">Profile</a>
        <a class="link clicked">Browse</a>
        <a class="link" href="http://localhost/apps/phpvariables/views/cart/cart.php">Cart</a>
        <a class="link logout" id="logout">Logout</a>
    </nav>
    <main>
        <hr>
        <div class="header1">
            <h1>Browse</h1>
        </div>
        <hr>
        <div class="actions">
            <button id="trackBtn">Tracks</button>
            <button id="albumBtn">Albums</button>
            <button id="artistBtn">Artist</button>
        </div>
        <div class="loader" style="display:none;" id="loader">
        <img src="../../src/img/spinner.gif">
        </div>
        <div class="container" id="tracks" style="display:none;">
        <input type="text" id="myInput" onkeyup="myFunction()"  placeholder="Search for names.." title="Type in a name">
        </div>
        <!-- The Modal -->
        <div id="purchasedModal" class="modal" style="display:none;">
            <!-- Modal content -->
            <div class="modal-content">
            <i  id="closeBtn" class="far fa-times-circle close"></i>
            <div class="loader" id="loader2">
            <img src="../../src/img/spinner.gif">
            </div>
            <div id="message" style="display:none;"> 
            </div>
            </div>
        </div>
    </main>
<footer>
    
</footer>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.2/dist/jquery.validate.min.js" crossorigin="anonymous"></script>
    <script src="./browse-script.js"></script>
</body>
</html>                         