import * as urlHelper from '../../../helper/url.js';


function getAlbumEditContent(id) {
    var data = {
        "AlbumId": id,
    }
    var url = urlHelper.constructAdminUrl('album', 'get');
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        statusCode: {
            401: () => {
                alert('Your session Has expired, please log in again.');
                location.href = urlHelper.constructUrl();
            },
            200: (response) => {
                $('#EditContent').append(`
                <form id="updateAlbumForm">
                    <ul class="wrapper">
                    <li class="form-row">
                    <label for="Title">Title:</label><br>
                    <input type="text" id="Title" name="Title" maxlength="255" value="${response[0].Title}" required><br>
                    </li>
                    <li class="form-row">
                    <label for="ArtistId">ArtistId:</label><br>
                    <input type="number" id="ArtistId" name="ArtistId" min="1" value="${response[0].ArtistId}" required><br>
                    </li>
                    <li class="form-row">
                    <button id="updateAlbum">Update</button>
                    </li>
                </form> 
                `);

                $('#updateAlbum').on('click', function(e){
                        e.preventDefault();
                        if($('#updateAlbumForm').valid()) {
                            var dataUpdate = {
                                AlbumId: id,
                                Title: $('#Title').val(),
                                ArtistId: $('#ArtistId').val(),
                            }
                            var url = urlHelper.constructAdminUrl('album', 'update');
                            $.ajax({
                                type: "POST",
                                url: url,
                                data: JSON.stringify(dataUpdate),
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


export {getAlbumEditContent};