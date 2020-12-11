$( document ).ready(() => {
    // if(sessionStorage.getItem('auth') == null){
    //     location.href = "http://localhost/apps/Chinook/index.php";
    // }
});

$('#trackBtn').on('click', function() {
    $('#tracks').empty();
    $('#loader').show();
    var url = "http://localhost/apps/Chinook/controller/track/get-all-tracks.php";
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
               <br>
               <button id="addTrackBtn" onclick="openAddModal('TRACK')">Add Track</button>
               <table  id="tracksTable" style="margin-top:5px";>
               <tr>
               <th scope="col">Name</th>
               <th scope="col">Composer</th>
               <th scope="col">Milliseconds</th>
               <th scope="col">Bytes</th>
               <th scope="col">UnitPrice</th>
               <th scope="col">Update</th>
               <th scope="col">Delete</th>
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
                       <span class="editTrack">
                       <i data-id="${response[index].TrackId}" class="fas fa-pencil-alt fa-2x"></i>
                       </span>
                       </td>
                       <td>
                       <span class="deleteTrack">
                       <i data-track="${response[index].TrackId}" track-price="${response[index].UnitPrice}" class="fas fa-trash fa-2x"></i>
                       </span>
                       </td>
                       </tr>
                       `
                       );
                    });
                 
                $('.editTrack').on('click', function(){
                    var elmId = $(this).find('i').attr('data-id');    
                    openEditModal("TRACK", elmId);
                });

                $('.deleteTrack').on('click', function(){
                    var elmId = $(this).find('i').attr('data-track');
                    data = {
                        "trackId": elmId,
                    }
                    var url = "http://localhost/apps/Chinook/controller/admin/track/delete.php";
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: JSON.stringify(data),
                        contentType: "application/json",
                        statusCode: {
                            401: () => {
                                alert('Your session Has expired, please log in again.');
                                location.href = "http://localhost/apps/Chinook/index.php";
                            },
                            200: (response) => {
                                console.log(response);
                                $('#alertSuccessModal').show();
                                setTimeout(() => {
                                    location.reload();
                                }, 700);
                            }
                        }
                    }).fail(function(res) {
                        console.log(res.responseText);
                        $('#alertDangerModal').show();
                    });
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
    var url = "http://localhost/apps/Chinook/controller/album/get-all-albums.php";
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
                <br>
                <button id="addTrackBtn" onclick="openAddModal('ALBUM')">Add Album</button>
                <table  id="tracksTable" style="margin-top:5px";>
                <tr>
                <th scope="col">Album Title</th>
                <th scope="col">Artist Name</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
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
                       <span class="editAlbum">
                       <i data-id="${response[index].AlbumId}" class="fas fa-pencil-alt fa-2x"></i>
                       </span>
                       </td>
                       <td>
                       <span class="deleteAlbum">
                       <i data-id="${response[index].AlbumId}" class="fas fa-trash fa-2x"></i>
                       </span>
                       </td>
                        </tr>`
                        );
                    });

                    $('.editAlbum').on('click', function(){
                        var elmId = $(this).find('i').attr('data-id');    
                        openEditModal("ALBUM", elmId);
                    });
    

                    $('.deleteAlbum').on('click', function(){
                        var elmId = $(this).find('i').attr('data-id');
                        data = {
                            "AlbumId": elmId,
                        }
                        var url = "http://localhost/apps/Chinook/controller/admin/album/delete.php";
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: JSON.stringify(data),
                            contentType: "application/json",
                            statusCode: {
                                401: () => {
                                    alert('Your session Has expired, please log in again.');
                                    location.href = "http://localhost/apps/Chinook/index.php";
                                },
                                200: (response) => {
                                    console.log(response);
                                    $('#alertSuccessModal').show();
                                    setTimeout(() => {
                                        location.reload();
                                    }, 700);
                                }
                            }
                        }).fail(function(res) {
                            console.log(res.responseText);
                            $('#alertDangerModal').show();
                        });

                    });

                    $('#loader').hide();
                    $('#tracks').show();
                }
            }
        }).fail(function() {
            $('#alertDangerModal').show();
        });
    });

$('#artistBtn').on('click', function() {
    $('#loader').show();
    $('#tracks').empty();
    var url = "http://localhost/apps/Chinook/controller/artist/get-all-artist.php";
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        statusCode: {
            401: function() {
                
            },
            200: (response) => {
                $('#tracks').append(`
                <input type="text" id="myInput" onkeyup="myFunction()"  placeholder="Search for names.." title="Type in a name">
                <br>
                <button id="addTrackBtn" onclick="openAddModal('ARTIST')">Add Artist</button>
                <table  id="tracksTable" style="margin-top:5px";>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>             
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
                       <span class="editArtist">
                       <i data-id="${response[index].ArtistId}" class="fas fa-pencil-alt fa-2x"></i>
                       </span>
                       </td>
                       <td>
                       <span class="deleteArtist">
                       <i data-id="${response[index].ArtistId}" class="fas fa-trash fa-2x"></i>
                       </span>
                       </td>
                        </tr>`
                        );
                    });

                    $('.editArtist').on('click', function(){
                            var elmId = $(this).find('i').attr('data-id');    
                            openEditModal("ARTIST", elmId);
                    });
            
                    $('.deleteArtist').on('click', function(){
                        var elmId = $(this).find('i').attr('data-id');
                        data = {
                            "ArtistId": elmId,
                        }
                        var url = "http://localhost/apps/Chinook/controller/admin/artist/delete.php";
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: JSON.stringify(data),
                            contentType: "application/json",
                            statusCode: {
                                401: () => {
                                    alert('Your session Has expired, please log in again.');
                                    location.href = "http://localhost/apps/Chinook/index.php";
                                },
                                200: (response) => {
                                    console.log(response);
                                    $('#alertSuccessModal').show();
                                    setTimeout(() => {
                                        location.reload();
                                    }, 700);
                                }
                            }
                        }).fail(function(res) {
                            console.log(res.responseText);
                            $('#alertDangerModal').show();
                        });

                    });
                    $('#loader').hide();
                    $('#tracks').show();
            }
        }
    }).fail(function() {
        $('#alertDangerModal').show();
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
    var album_url = "http://localhost/apps/Chinook/controller/album/get-album.php";
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
                            var url = "http://localhost/apps/Chinook/controller/cart/add-track.php";
                            $.ajax({
                                type: "POST",
                                url: url,
                                data: JSON.stringify(data),
                                contentType: "application/json",
                                statusCode: {
                                    401: () => {
                                        alert('Your session Has expired, please log in again.');
                                        location.href = "http://localhost/apps/Chinook/index.php";
                                    },
                                    200: () => {
                                        $('#alertSuccess').show();
                                    }
                                }
                            }).fail(function() {
                                $('#alertDangerModal').show();
                            });

                        } else {
                            alert("quantity not allowed");
                        }
                    });                                        
                   $('#loader2').hide();
                   $('#message').show();
            }
        }
    }).fail(function() {
        $('#alertDangerModal').show();
    });
}

// -----------------------------------------------------------------------

function openAddModal(content){
    $('#AddContent').empty();
    switch (content) {
        case "TRACK":
            $('#AddContent').append(`
            <h1>TRACK</h1>
            `);
            break;
        case "ALBUM":
            $('#AddContent').append(`
            <h1>ALBUM</h1>
            `);
            break;
        case "ARTIST":
            $('#AddContent').append(`
            <h1>ARTIST</h1>
            `);
            break;
        default:
            break;
    }
    $('#AddTrackModal').show();
    $('#loader3').hide();
    $('#AddContent').show();
}

// -----------------------------------------------------------------------

function openEditModal(content, id){
    $('#EditContent').empty();
    switch (content) {
        case "TRACK":
            getTrackEditContent(id);
            break;
        case "ALBUM":
            $('#EditContent').append(`
            <h1>ALBUM</h1>
            `);
            break;
        case "ARTIST":
            $('#EditContent').append(`
            <h1>ARTIST</h1>
            `);
            break;
        default:
            break;
    }
    $('#EditModal').show();
    $('#loader4').hide();
    $('#EditContent').show();
}

// -----------------------------------------------------------------------

function getTrackEditContent(id) {
    data = {
        "TrackId": id,
    }
    var url = "http://localhost/apps/chinook/controller/track/get-track.php";
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        statusCode: {
            401: () => {
                alert('Your session Has expired, please log in again.');
                location.href = "http://localhost/apps/Chinook/index.php";
            },
            200: (response) => {
                $('#EditContent').append(`
                <form id="updateTrackForm" action="/action_page.php">
                    <ul class="wrapper">
                    <li class="form-row">
                    <label for="Name">Track Name:</label><br>
                    <input type="text" id="Name" name="Name" maxlength="255" value="${response[0].Name}"><br>
                    </li>
                    <li class="form-row">
                    <label for="tname">AlbumId:</label><br>
                    <input type="number" id="AlbumId" name="AlbumId" min="1" value="${response[0].AlbumId}"><br>
                    </li>
                    <li class="form-row">
                    <label for="tname">MediaTypeId:</label><br>
                    <input type="number" id="MediaTypeId" name="MediaTypeId" min="1" value="${response[0].MediaTypeId}"><br>
                    </li>
                    <li class="form-row">
                    <label for="tname">GenreId:</label><br>
                    <input type="number" id="GenreId" name="GenreId" min="1" value="${response[0].GenreId}"><br>
                    </li>
                    <li class="form-row">
                    <label for="Composer">Composer:</label><br>
                    <input type="text" id="Composer" name="Composer" maxlength="255" value="${response[0].Composer}"><br>
                    </li>
                    <li class="form-row">
                    <label for="Milliseconds">Milliseconds:</label><br>
                    <input type="number" id="Milliseconds" name="Milliseconds" value="${response[0].Milliseconds}"><br>
                    </li>
                    <li class="form-row">
                    <label for="Bytes">Bytes:</label><br>
                    <input type="number" id="Bytes" name="Bytes" min="1" value="${response[0].Bytes}"><br>
                    </li>
                    <li class="form-row">
                    <label for="UnitPrice">UnitPrice:</label><br>
                    <input type="number" id="UnitPrice" name="UnitPrice" step="0.01" min="0" value="${response[0].UnitPrice}"><br>
                    </li>
                    <li class="form-row">
                    <button id="updateTrack">Update</button>
                    </li>
                </form> 
                `);

                $('"updateTrack').on('click', function(){
                        if($('#updateTrackForm').valid()) {
                            data = {
                                TrackId: id,
                                Name: $('#Name').val(),
                                AlbumId: $('#AlbumId').val(),
                                MediaTypeId: $('#MediaTypeId').val(),
                                GenreId: $('#GenreId').val(),
                                Composer: $('#Composer').val(),
                                Milliseconds: $('#Milliseconds').val(),
                                Bytes: $('#Bytes').val(),
                                UnitPrice: $('#UnitPrice').val()
                            }
                            var url = "http://localhost/apps/Chinook/controller/admin/track/update.php";
                            $.ajax({
                                type: "POST",
                                url: url,
                                data: JSON.stringify(data),
                                contentType: "application/json",
                                statusCode: {
                                    401: () => {
                                        alert('Your session Has expired, please log in again.');
                                        location.href = "http://localhost/apps/Chinook/index.php";
                                    },
                                    200: () => {
                                        $('#EditModal').hide();
                                        $('#alertSuccess').show();
                                        setTimeout(() => {
                                            location.reload();
                                        }, 700);
                                    }
                                }
                            }).fail(function() {
                                $('#alertDangerModal').show();
                            });
                        };
                });
            }
        }
    }).fail(function(res) {
        console.log(res.responseText);
        $('#alertDangerModal').show();
    });
}


$('.closeBtn').on('click', function(e){
    $('#AddTrackModal').hide();
    $('#alertDangerModal').hide();
    $('#alertSuccessModal').hide();
    $('#EditModal').hide();

});

$('#logout').on('click', () => {
    sessionStorage.clear();
    location.href = "http://localhost/apps/Chinook/index.php";
});

    
        