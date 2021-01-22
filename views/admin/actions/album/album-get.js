import * as search from '../utils/search.js';
import * as edit from '../utils/open-edit-modal.js';
import * as create from '../utils/open-create-modal.js';

import * as urlHelper from '../../../helper/url.js';

function getAlbums() {
    $('#loader').show();
    $('#tracks').empty();
    var url = urlHelper.constructUrl('album', 'get-all-albums');
     $.ajax({
        type: "GET",
        crossDomain: true,
        url: url,
        contentType: "application/json",
        statusCode: {
            401: function() {
                
            },
            200: (response) => {
                $('#tracks').append(`
                <input type="text" id="myInput" placeholder="Search for names.." title="Type in a name">
                <br>
                <button id="openAlbumCreateModal">Add Album</button>
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
                       edit.openEditModal("ALBUM", elmId);
                    });

                    $('#myInput').on('keyup', function(){
                        search.tableSearch();
                    })

                    $('#openAlbumCreateModal').on('click', function(){
                        create.openCreateModal("ALBUM");
                    });
    

                    $('.deleteAlbum').on('click', function(){
                        var elmId = $(this).find('i').attr('data-id');
                        var dataDelete = {
                            auth: sessionStorage.getItem('auth'),
                            AlbumId: elmId,
                        }
                        var url = urlHelper.constructAdminUrl('album', 'delete');
                        $.ajax({
                            type: "POST",
                            crossDomain: true,
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

export {getAlbums};