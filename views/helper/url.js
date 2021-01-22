function constructUrl(controller, action) {
    var root = "http://chinook-deploy-dev.us-east-1.elasticbeanstalk.com";
    switch (controller) {
        case "album":
            switch (action) {
                case "get-album":
                    return root + "/controller/album/get-album.php";
                case "get-all-albums":
                    return root + "/controller/album/get-all-albums.php";
                default:
                    return root;

            }
        case "artist":
            switch (action) {
                case "get-all-artist":
                    return root + "/controller/artist/get-all-artist.php";
                default:
                    return root;
            }  
        case "auth":
            switch (action) {
                case "login":
                    return root + "/controller/auth/login.php";
                case "newuser":
                    return root + "/controller/auth/newuser.php";
                case "changepassword":
                    return root + "/controller/auth/change-password.php";
                case "checkauth":
                    return root + "/controller/auth/checkauth.php";
                default:
                    return root;
            }  
        case "cart":
            switch (action) {
                case "add-track":
                    return root + "/controller/cart/add-track.php";
                case "get-cart":
                    return root + "/controller/cart/get-cart.php";
                case "purchase-cart":
                    return root + "/controller/cart/purchase.php";
                default:
                    return root;
            }  
        case "customer":
            switch (action) {
                case "get-all-customers":
                    return root + "/controller/customer/get-all-customers.php";
                case "get-single-customer":
                    return root + "/controller/customer/get-single-customer.php";
                case "update-customer":
                    return root + "/controller/customer/update-customer.php";
                default:
                    return root;
            }  
        case "track":
            switch (action) {
                case "get-all-tracks":
                    return root + "/controller/track/get-all-tracks.php";
                case "get-track":
                    return root + "/controller/track/get-track.php";
                default:
                    return root;
            }
        case "redirect":
            switch (action) {
                case "main":
                    return root + "/views/main/main.php";
                default:
                    return root;
            }  
        default:
            return root;
    }
}

function constructAdminUrl(controller, action){
    var root = "http://chinook-deploy-dev.us-east-1.elasticbeanstalk.com";
    switch (controller) {
        case "album":
            switch (action) {
                case "create":
                    return root + "/controller/admin/album/create.php";
                case "delete":
                    return root + "/controller/admin/album/delete.php";
                case "get":
                    return root + "/controller/admin/album/get.php";
                case "update":
                    return root + "/controller/admin/album/update.php";
                default:
                    return root;
            }
        case "artist":
            switch (action) {
                case "create":
                    return root + "/controller/admin/artist/create.php";
                case "delete":
                    return root + "/controller/admin/artist/delete.php";
                case "get":
                    return root + "/controller/admin/artist/get.php";
                case "update":
                    return root + "/controller/admin/artist/update.php";
                default:
                    return root;
            }
        case "track":
            switch (action) {
                case "create":
                    return root + "/controller/admin/track/create.php";
                case "delete":
                    return root + "/controller/admin/track/delete.php";
                case "update":
                    return root + "/controller/admin/track/update.php";
                default:
                    return root;
            }
        case "auth":
            switch (action) {
                case "login":
                    return root + "/controller/admin/login.php";
                case "get-all-albums":
                    return root + "/controller/album/get-all-albums.php";
                default:
                    return root;
            }
        case "redirect":
            switch (action) {
                case "main":
                    return root + "/views/admin/admin.php";
                default:
                    return root;
            }
        default:
            return root;
    }
}

export {constructUrl, constructAdminUrl};