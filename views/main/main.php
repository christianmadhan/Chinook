<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./main-style.css">
    <link rel="icon" type="image/png" href="../home/img/music_icon.png"/>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <title>Music Store</title>
</head> 
<body>
    <nav>
        <a class="link clicked">Home</a>
        <a class="link" href="http://chinook-deploy-dev.us-east-1.elasticbeanstalk.com//views/profile/profile.php">Profile</a>
        <a class="link" href="http://chinook-deploy-dev.us-east-1.elasticbeanstalk.com//views/browse/browse.php">Browse</a>
        <a class="link" href="http://chinook-deploy-dev.us-east-1.elasticbeanstalk.com//views/cart/cart.php">Cart</a>
        <a class="link logout" id="logout">Logout</a>
    </nav>
    <main>
         <hr>
        <div class="header1">
            <div class="welcome">
            <img style="background-color: #1f1f1f;" src="../home/img/icons/store.png" height="100">
            </div>
        </div>
        <hr>

        <section class="welcome">
        <h1>Welcome Home!</h1>
        </section>
        <section class="welcome">
            <p>
                Use the menu on the left to view your profile, browse music or see/buy items from your cart.
            </p>
        </section>
        <section class="welcome">
            <p>
                Have fun!
            </p>
        </section>
    </main>
<footer>
    
</footer>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.2/dist/jquery.validate.min.js" crossorigin="anonymous"></script> 
    <script src="./main-script.js" type="module"></script>
</body>
</html>                         