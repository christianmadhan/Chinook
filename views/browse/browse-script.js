$( document ).ready(() => {
    if(sessionStorage.getItem('auth') == null){
        location.href = "http://localhost/apps/phpvariables/index.php";
    }
});

$('#trackBtn').on('click', function() {
    $('#tracks').empty();
    $('#loader').show();
    var url = "http://localhost/apps/phpvariables/controller/track/get-all-tracks.php";
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        //data: JSON.stringify(data),
        statusCode: {
            401: function() {
                
            },
            200: (response) => {
               $('#tracks').append(`
               <input type="text" id="myInput" onkeyup="myFunction()"  placeholder="Search for names.." title="Type in a name">
               <table  id="tracksTable">
               <tr>
               <th scope="col">Name</th>
               <th scope="col">Composer</th>
               <th scope="col">Milliseconds</th>
               <th scope="col">Bytes</th>
               <th scope="col">UnitPrice</th>
               <th scope="col">Quantity</th>
               <th scope="col">Add to cart</th>
               </tr>
               </table>
               `)
               $.each(response, function(index) {
                   $('#tracksTable').append(
                       `<tr>
                       <td>
                       ${response[index].Name}
                       </td>
                       <td>
                       ${response[index].Composer}
                       </td>
                       <td>
                       ${response[index].Milliseconds}
                       </td>
                       <td>
                       ${response[index].Bytes}
                       </td>
                       <td>
                       ${response[index].UnitPrice}
                       </td>
                       <td>
                       <input style="color:white;" type="number" id="quantity" min="1" max="10" value="1">
                       </td>
                       <td>
                       <span class="buyTrack">
                       <i data-track="${response[index].TrackId}" track-price="${response[index].UnitPrice}" class="fas fa-cart-plus fa-2x"></i>
                       </span>
                       </td>
                       </tr>
                       `
                       );
                    });

                $('.buyTrack').on('click', function(){
                    var elmId = $(this).find('i').attr('data-track');
                    var UnitPrice = $(this).find('i').attr('track-price');

                    var quantity = $(this).parent().parent().find('input').val();
                    if(quantity <= 10 && quantity > 0){
                        var total = UnitPrice * quantity;
                        data = {
                            "auth": sessionStorage.getItem('auth'),
                            "trackId": elmId,
                            "quantity": quantity,
                            "unitPrice": total
                        }
                        var url = "http://localhost/apps/phpvariables/controller/cart/add-track.php";
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: JSON.stringify(data),
                            contentType: "application/json",
                            statusCode: {
                                401: () => {
                                    alert('Your session Has expired, please log in again.');
                                    location.href = "http://localhost/apps/phpvariables/index.php";
                                },
                                200: (response) => {
                                    alert('Track purchued!');
                                }
                            }
                        });
                    } else {
                        alert("quantity not allowed");
                    }
                });
                $('#loader').hide();
                $('#tracks').show();

            }
        }
    });    
});


$('#albumBtn').on('click', function() {
    $('#loader').show();
    $('#tracks').empty();
    var url = "http://localhost/apps/phpvariables/controller/album/get-all-albums.php";
     $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        //data: JSON.stringify(data),
        statusCode: {
            401: function() {
                
            },
            200: (response) => {
                $('#tracks').append(`
                <input type="text" id="myInput" onkeyup="myFunction()"  placeholder="Search for names.." title="Type in a name">
                <table  id="tracksTable">
                <tr>
                <th scope="col">Album Title</th>
                <th scope="col">Artist Name</th>
                <th scope="col">View Album</th>
                </tr>
                </table>
                `);
                $.each(response, function(index) {
                    $('#tracksTable').append(
                        `<tr>
                        <td>
                        ${response[index].Title}
                        </td>
                        <td>
                        ${response[index].Name}
                        </td>
                        <td>
                        <span class="openAlbum">
                        <i data-track="${response[index].AlbumId}" data-album="${response[index].Title}"class="fas fa-compact-disc fa-2x"></i>
                        </span>
                        </td>
                        </tr>`
                        );
                    });

                    $('.openAlbum').on('click', function(){
                        var elmId = $(this).find('i').attr('data-track');
                        var albumName = $(this).find('i').attr('data-album');
                        getAlbum(elmId,albumName);
                        $('#purchasedModal').show();

                    });

                    $('#loader').hide();
                    $('#tracks').show();
                }
            }
        });
    });

$('#artistBtn').on('click', function() {
    $('#loader').show();
    $('#tracks').empty();
    var url = "http://localhost/apps/phpvariables/controller/artist/get-all-artist.php";
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        //data: JSON.stringify(data),
        statusCode: {
            401: function() {
                
            },
            200: (response) => {
                $('#tracks').append(`
                <input type="text" id="myInput" onkeyup="myFunction()"  placeholder="Search for names.." title="Type in a name">
                <table  id="tracksTable">
                <tr>
                <th scope="col">ArtistId</th>
                <th scope="col">Name</th>
                </tr>
                </table>
                `)
                $.each(response, function(index) {
                    $('#tracksTable').append(
                        `<tr>
                        <td>
                        ${response[index].ArtistId}
                        </td>
                        <td>
                        ${response[index].Name}
                        </td>
                        </tr>`
                        );
                    });
                    $('#loader').hide();
                    $('#tracks').show();
            }
        }
    });
});

        
function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tracksTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
}


// ------------------------------------------------------------------------

function getAlbum(trackId, albumName){
    var album_url = "http://localhost/apps/phpvariables/controller/album/get-album.php";
    data = {
        AlbumId: trackId
    };
    $.ajax({
        type: "POST",
        url: album_url,
        contentType: "application/json",
        data: JSON.stringify(data),
        statusCode: {
            401: function() {
                
            },
            404: function(res) {
                console.log(res.responseText);
            },
            200: (response) => {
                $('#message').empty();
                $('#message').append(`
                <h3 style="display:flex; justify-content:center; color:white;">${albumName}</h3>
                <table  id="tracksTable2">
                <tr>
                <th scope="col">Track Name</th>
                <th scope="col">Composer</th>
                <th scope="col">Miliseconds</th>
                <th scope="col">Bytes</th>
                <th scope="col">UnitPrice</th>
                <th scope="col">GenreName</th>
                <th scope="col">MediaName</th>
                <th scope="col">Quantity</th>
                <th scope="col">Add to cart</th>
                </tr>
                </table>
                `)
                $.each(response, function(index) {
                    $('#tracksTable2').append(
                        `<tr>
                        <td>
                        ${response[index].Name}
                        </td>
                        <td>
                        ${response[index].Composer}
                        </td>
                        <td>
                        ${response[index].Milliseconds}
                        </td>
                        <td>
                        ${response[index].Bytes}
                        </td>
                        <td>
                        ${response[index].UnitPrice}
                        </td>
                        <td>
                        ${response[index].GenreName}
                        </td>
                        <td>
                        ${response[index].MediaName}
                        </td>
                        <td>
                        <input style="color:white;" type="number" id="quantity" min="1" max="10" value="1">
                        </td>
                        <td>
                        <span class="buyTrack">
                        <i data-track="${response[index].TrackId}" track-price="${response[index].UnitPrice}" class="fas fa-cart-plus fa-2x"></i>
                        </span>
                        </td>        
                        </tr>`
                        );
                    });
                    $('.buyTrack').on('click', function(){
                        var elmId = $(this).find('i').attr('data-track');
                        var UnitPrice = $(this).find('i').attr('track-price');
    
                        var quantity = $(this).parent().parent().find('input').val();
                        if(quantity <= 10 && quantity > 0){
                            var total = UnitPrice * quantity;
                            data = {
                                "auth": sessionStorage.getItem('auth'),
                                "trackId": elmId,
                                "quantity": quantity,
                                "unitPrice": total
                            }
                            var url = "http://localhost/apps/phpvariables/controller/cart/add-track.php";
                            $.ajax({
                                type: "POST",
                                url: url,
                                data: JSON.stringify(data),
                                contentType: "application/json",
                                statusCode: {
                                    401: () => {
                                        alert('Your session Has expired, please log in again.');
                                        location.href = "http://localhost/apps/phpvariables/index.php";
                                    },
                                    200: (response) => {
                                        alert('Track purchued!');
                                    }
                                }
                            });
                        } else {
                            alert("quantity not allowed");
                        }
                    });                                        
                   $('#loader2').hide();
                   $('#message').show();
            }
        }
    });
}

// -----------------------------------------------------------------------

$('#closeBtn').on('click', function(e){
    e.preventDefault();
    $('#purchasedModal').hide();
});

$('#logout').on('click', () => {
    sessionStorage.clear();
    location.href = "http://localhost/apps/phpvariables/index.php";
});

    
        