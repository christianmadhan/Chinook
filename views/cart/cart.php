<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="cart-style.css">
    <link rel="icon" type="image/png" href="../../src/img/music_icon.png"/>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <title>Music Store</title>
</head> 
<body>
    <nav>
        <a class="link" href="http://localhost/apps/Chinook/views/main/main.php">Home</a>
        <a class="link" href="http://localhost/apps/Chinook/views/profile/profile.php">Profile</a>
        <a class="link" href="http://localhost/apps/Chinook/views/browse/browse.php">Browse</a>
        <a class="link clicked">Cart</a>
        <a class="link logout" id="logout">Logout</a>
    </nav>
    <main>
        <hr>
        <div class="header1">
            <h1>Cart</h1>
        </div>
        <hr>
        <section>
        <div class="col-25">
            <div class="container" id="cart">
            <h4>Cart <span><i class="fa fa-shopping-cart"></i></span></h4>
            </div>
        </div>
        <div class="col-25">
            <div class="container">
                <h3>Billing Address</h3>
                <form id="billingInfo">
                <ul class="wrapper">
                <li class="form-row">
                <label for="Address">Address</label>
                <input  name="Address" type="text" id="Address" required> 
                </li>
                <li class="form-row">
                <label for="City">City</label>
                <input  name="City" type="text" id="City" required>
                </li>
                <li class="form-row">
                <label for="State">State</label>
                <input  name="State" type="text" id="State" required> 
                </li>
                <li class="form-row">
                <label for="Country">Country</label>
                <input  name="Country" type="text" id="Country" required>
                </li>
                <li class="form-row">
                <label for="PostalCode">PostalCode</label>
                <input  name="PostalCode" type="number" id="PostalCode" required>
                </li>
            </ul>
                </form>
            </div>
        </div>
        </section>
        <section class="col-25">
            <button class="submitbutton" id="buyBtn">Buy</button>
        </section>

        <!-- The Modal -->
        <div id="purchasedModal" class="modal" style="display:none;">
            <!-- Modal content -->
            <div class="modal-content">
            <span class="close" id="closeBtn">&times;</span>
            <div class="loader" id="loader">
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
    <script src="./cart-script.js"></script>
</body>
</html>                         