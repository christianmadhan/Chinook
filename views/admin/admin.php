<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./admin-style.css">
    <link rel="icon" type="image/png" href="../home/img/music_icon.png"/>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <title>Music Store - Admin</title>
</head> 
<body>
    <nav>
        <a class="link clicked">Home</a>
        <a class="link logout" id="logout">Logout</a>
    </nav>
    <main>
         <hr>
        <div class="header1">
            <h1>Admin Panel</h1>
        </div>
        <hr>
        <div class="actions">
            <button id="trackBtn">Tracks</button>
            <button id="albumBtn">Albums</button>
            <button id="artistBtn">Artist</button>
        </div>

        <!--_______________________________________________________________________________ -->
        <!-- Modals -->
        <div id="alertSuccessModal" class="modal" style="display:none;">
            <!-- Modal content -->
            <div class="modal-content">
                <i  id="closeBtn" class="far fa-times-circle close closeBtn"></i>
                <div id="alertSuccess" class="alert success">
                    Success!.
                </div>
            </div>
        </div>

        <div id="alertDangerModal" class="modal" style="display:none;">
            <!-- Modal content -->
            <div class="modal-content">
                <i  id="closeBtn" class="far fa-times-circle close closeBtn"></i>
                <div id="alertDanger"  class="alert danger">
                    Something bad happened.
                </div>
            </div>
        </div>
   

        <!-- The Modal -->
        <div id="EditModal" class="modal" style="display:none;">
        <!-- Modal content -->
        <div class="modal-content">
            <i  id="closeBtn" class="far fa-times-circle close closeBtn"></i>
            <div class="loader" id="loader4">
                <img src="../../views/home/img/spinner.gif">
            </div>
            <div id="EditContent" style="display:none;"></div>
        </div>
      </div>
    
      <!--_______________________________________________________________________________ -->

        <div class="loader" style="display:none;" id="loader">
        <img src="../home/img/spinner.gif">
    </div>
    
    <div class="container" id="tracks" style="display:none;">
        <input type="text" id="myInput" onkeyup="myFunction()"  placeholder="Search for names.." title="Type in a name">
        </div>

    </main>
<footer>
    
</footer>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.2/dist/jquery.validate.min.js" crossorigin="anonymous"></script> 
    <script src="./admin-script.js" type="module"></script>
</body>
</html>                         