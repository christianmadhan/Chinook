
import * as urlHelper from '../../../helper/url.js';

function getTrackEditContent(id) {
    var data = {
        auth: sessionStorage.getItem('auth'),
        "TrackId": id,
    }
    var url = urlHelper.constructUrl('track', 'get-track');
    console.log(url);
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
                <form id="updateTrackForm">
                    <ul class="wrapper">
                    <li class="form-row">
                    <label for="Name">Track Name:</label><br>
                    <input type="text" id="Name" name="Name" maxlength="255" value="${response[0].Name}" required><br>
                    </li>
                    <li class="form-row">
                    <label for="tname">AlbumId:</label><br>
                    <input type="number" id="AlbumId" name="AlbumId" min="1" value="${response[0].AlbumId}"><br>
                    </li>
                    <li class="form-row">
                    <label for="tname">MediaTypeId:</label><br>
                    <input type="number" id="MediaTypeId" name="MediaTypeId" min="1" value="${response[0].MediaTypeId}" required><br>
                    </li>
                    <li class="form-row">
                    <label for="tname">GenreId:</label><br>
                    <input type="number" id="GenreId" name="GenreId" min="1" value="${response[0].GenreId}" required><br>
                    </li>
                    <li class="form-row">
                    <label for="Composer">Composer:</label><br>
                    <input type="text" id="Composer" name="Composer" maxlength="255" value="${response[0].Composer}"><br>
                    </li>
                    <li class="form-row">
                    <label for="Milliseconds">Milliseconds:</label><br>
                    <input type="number" id="Milliseconds" name="Milliseconds" min="1" value="${response[0].Milliseconds}" required><br>
                    </li>
                    <li class="form-row">
                    <label for="Bytes">Bytes:</label><br>
                    <input type="number" id="Bytes" name="Bytes" min="1" value="${response[0].Bytes}" required><br>
                    </li>
                    <li class="form-row">
                    <label for="UnitPrice">UnitPrice:</label><br>
                    <input type="number" id="UnitPrice" name="UnitPrice" step="0.01" min="0" value="${response[0].UnitPrice}" required><br>
                    </li>
                    <li class="form-row">
                    <button id="update">Update</button>
                    </li>
                </form> 
                `);

                $('#update').on('click', function(e){
                        e.preventDefault();
                        if($('#updateTrackForm').valid()) {
                            var dataUpdate = {
                                auth: sessionStorage.getItem('auth'),
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
                            var url = urlHelper.constructAdminUrl('track', 'update');

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


export {getTrackEditContent};