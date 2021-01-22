import * as urlHelper from '../../../helper/url.js';

function getArtistEditContent(id) {
   var data = {
        auth: sessionStorage.getItem('auth'),
        ArtistId: id,
    }
    var url = urlHelper.constructAdminUrl('artist', 'get');

    $.ajax({
        type: "POST",
        crossDomain: true,
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
                <form id="updateArtistForm">
                    <ul class="wrapper">
                    <li class="form-row">
                    <label for="Name">Name:</label><br>
                    <input type="text" id="Name" name="Name" maxlength="255" value="${response[0].Name}" required><br>
                    </li>
                    <li class="form-row">
                    <button id="updateArtist">Update</button>
                    </li>
                </form> 
                `);

                $('#updateArtist').on('click', function(e){
                        e.preventDefault();
                        if($('#updateArtistForm').valid()) {
                            var dataUpdate = {
                                auth: sessionStorage.getItem('auth'),
                                ArtistId: id,
                                Name: $('#Name').val(),
                            }
                            var url = urlHelper.constructAdminUrl('artist', 'update');

                            $.ajax({
                                type: "POST",
                                crossDomain: true,
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


export {getArtistEditContent};