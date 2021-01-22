import * as search from '../utils/search.js';
import * as edit from '../utils/open-edit-modal.js';
import * as create from '../utils/open-create-modal.js';

import * as urlHelper from '../../../helper/url.js';

function getTracks() {
    $('#tracks').empty();
    $('#loader').show();

    var url = urlHelper.constructUrl('track', 'get-all-tracks');
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: url,
        contentType: "application/json",
        //data: JSON.stringify(data),
        statusCode: {
            401: function() {
                
            },
            200: (response) => {
               $('#tracks').append(`
               <input type="text" id="myInput"  placeholder="Search for names.." title="Type in a name">
               <br>
               <button id="openArtistCreateModal">Add Track</button>
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
                    edit.openEditModal("TRACK", elmId);
                });

                $('#myInput').on('keyup', function(){
                    search.tableSearch();
                });

                $('#openArtistCreateModal').on('click', function(){
                    create.openCreateModal("TRACK");
                });

                $('.deleteTrack').on('click', function(){
                    var elmId = $(this).find('i').attr('data-track');
                    var dataDelete = {
                        auth: sessionStorage.getItem('auth'),
                        "trackId": elmId,
                    }
                    var url = urlHelper.constructAdminUrl('track', 'delete');
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
    }); 
}

export {getTracks};