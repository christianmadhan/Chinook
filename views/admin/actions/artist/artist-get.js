import * as search from '../utils/search.js';
import * as edit from '../utils/open-edit-modal.js';
import * as create from '../utils/open-create-modal.js';

import * as urlHelper from '../../../helper/url.js';

function getArtists(){
    $('#loader').show();
    $('#tracks').empty();

    var url = urlHelper.constructUrl('artist', 'get-all-artist');
    
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        statusCode: {
            401: function() {
                
            },
            200: (response) => {
                $('#tracks').append(`
                <input type="text" id="myInput"  placeholder="Search for names.." title="Type in a name">
                <br>
                <button id="openArtistCreateModal">Add Artist</button>
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
                            edit.openEditModal("ARTIST", elmId);
                    });

                    $('#myInput').on('keyup', function(){
                        search.tableSearch();
                    });

                    $('#openArtistCreateModal').on('click', function(){
                        create.openCreateModal("ARTIST");
                    });
            
                    $('.deleteArtist').on('click', function(){
                        var elmId = $(this).find('i').attr('data-id');
                        var dataDelete = {
                            "ArtistId": elmId,
                        }
                        var url = urlHelper.constructAdminUrl('artist', 'delete');
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: JSON.stringify(dataDelete),
                            contentType: "application/json",
                            statusCode: {
                                401: () => {
                                    alert('Your session Has expired, please log in again.');
                                    location.href = urlHelper.constructUrl();
                                },
                                200: (response) => {
                                    $('#alertSuccessModal').show();
                                    setTimeout(() => {
                                        location.reload();
                                    }, 700);
                                }
                            }
                        }).fail(function(res) {
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
}

export {getArtists};