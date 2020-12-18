import * as urlHelper from '../../../helper/url.js';

function getAlbumCreateContent() {
    $('#EditContent').append(`
    <form id="createAlbumForm">
        <ul class="wrapper">
        <li class="form-row">
        <label for="Title">Title:</label><br>
        <input type="text" id="Title" name="Title" maxlength="255" placeholder="title..."  required><br>
        </li>
        <li class="form-row">
        <label for="ArtistId">ArtistId:</label><br>
        <input type="number" id="ArtistId" name="ArtistId" min="1" placeholder="artist id..." required><br>
        </li>
        <li class="form-row">
        <button id="createAlbum">Create</button>
        </li>
    </form> 
    `);

    $('#createAlbum').on('click', function(e){
            e.preventDefault();
            if($('#createAlbumForm').valid()) {
                var dataCreate = {
                    Title: $('#Title').val(),
                    ArtistId: $('#ArtistId').val(),
                }
                var url = urlHelper.constructAdminUrl('album', 'create');
                $.ajax({
                    type: "POST",
                    url: url,
                    data: JSON.stringify(dataCreate),
                    contentType: "application/json",
                    statusCode: {
                        401: () => {
                            alert('Your session Has expired, please log in again.');
                            location.href = urlHelper.constructUrl();
                        },
                        200: () => {
                            $('#alertSuccessModal').show();
                            $('#EditModal').hide();
                            setTimeout(() => {
                                location.reload();
                            }, 800);
                        }
                    }
                }).fail(function(err) {
                    console.log(err);
                    $('#alertDangerModal').show();
                });
            };
    });
 }
 
 
 export {getAlbumCreateContent};