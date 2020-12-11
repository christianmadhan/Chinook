<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./profile-style.css">
    <link rel="icon" type="image/png" href="../../src/img/music_icon.png"/>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <title>Music Store</title>
</head> 
<body>
    <nav>
        <a class="link" href="http://localhost/apps/Chinook/views/main/main.php">Home</a>
        <a class="link clicked">Profile</a>
        <a class="link" href="http://localhost/apps/Chinook/views/browse/browse.php">Browse</a>
        <a class="link" href="http://localhost/apps/Chinook/views/cart/cart.php">Cart</a>
        <a class="link logout" id="logout">Logout</a>

    </nav>
    <main>
        <hr>
        <div class="header1">
            <h1>Profile</h1>
        </div>
        <hr>
        <div class="container">
        <div class="loader" style="display:none;" id="loader">
        <img src="../../src/img/spinner.gif">
        </div>
        <form style="display:none;" id="profileForm">
  <ul class="wrapper">
    <li class="form-row">
      <label for="email">Email</label>
      <input  name="email" type="email" id="email" disabled>
      <i class="fas fa-edit fa-2x"></i>
    </li>
    <li class="form-row">
      <label for="firstname">First Name</label>
      <input  type="text" id="firstname" disabled>
      <i class="fas fa-edit fa-2x"></i>
    </li>
    <li class="form-row">
      <label for="lastname">Last Name</label>
      <input  type="text" id="lastname" disabled>
      <i class="fas fa-edit fa-2x"></i>
    </li>
    <li class="form-row">
      <label for="company">Company</label>
      <input  type="text" id="company" disabled>
      <i class="fas fa-edit fa-2x"></i>
    </li>
    <li class="form-row">
      <label for="address">Address</label>
      <input  type="text" id="address" disabled>
      <i class="fas fa-edit fa-2x"></i>
    </li>
    <li class="form-row">
      <label for="city">City</label>
      <input  type="text" id="city" disabled>
      <i class="fas fa-edit fa-2x"></i>
    </li>
    <li class="form-row">
      <label for="state">State</label>
      <input  type="text" id="state" disabled>
      <i class="fas fa-edit fa-2x"></i>
    </li>
    <li class="form-row">
      <label for="country">Country</label>
      <input  type="text" id="country" disabled>
      <i class="fas fa-edit fa-2x"></i>
    </li>
    <li class="form-row">
      <label for="postalCode">Postal Code</label>
      <input  type="number" id="postalCode" disabled>
      <i class="fas fa-edit fa-2x"></i>
    </li>
    <li class="form-row">
      <label for="phone">Phone</label>
      <input  type="number" id="phone" disabled>
      <i class="fas fa-edit fa-2x"></i>
    </li>
    <li class="form-row">
      <label for="fax">Fax</label>
      <input  type="number" id="fax" disabled>
      <i class="fas fa-edit fa-2x"></i>
    </li>
    <li class="changePassRow">
      <button class="changePass" id="changePassBtn">Change Password</button>
    </li>
    <li class="form-row" style="display:none;" id="submitEditListElm">
      <button type="button" class="submitbutton" id="submitBtn">Submit</button>
    </li>
  </ul>
</form>
        </div>
    </main>
<footer>
    
</footer>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.2/dist/jquery.validate.min.js" crossorigin="anonymous"></script> 
    <script src="./profile-script.js"></script>
</body>
</html>                         