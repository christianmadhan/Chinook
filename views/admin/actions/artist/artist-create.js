import * as urlHelper from '../../../helper/url.js';

function getArtistCreateContent() {
    $('#EditContent').append(`
    <form id="createArtistForm">
        <ul class="wrapper">
        <li class="form-row">
        <label for="Name">Name:</label><br>
        <input type="text" id="Name" name="Title" maxlength="255" placeholder="Name..."  required><br>
        </li>
        <li class="form-row">
        <button id="createArtist">Create</button>
        </li>
        </ul>
    </form> 
    `);

    $('#createArtist').on('click', function(e){
            e.preventDefault();
            if($('#createArtistForm').valid()) {
                var dataCreate = {
                    Name: $('#Name').val(),
                }
                var url = urlHelper.constructAdminUrl('artist', 'create');
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
                }).fail(function() {
                    $('#alertDangerModal').show();
                    $('#EditModal').hide();
                });
            };
    });
 }
 
 
 export {getArtistCreateContent};