import * as urlHelper from '../helper/url.js';
import { createTrackContent } from './helper/track-append.js';
import { createAlbumContent } from './helper/album-append.js';


$( document ).ready(() => {
    if(sessionStorage.getItem('auth') == null){
        location.href = urlHelper.constructUrl();
    } else {
        var data = {
            "auth": sessionStorage.getItem('auth')
        }
        $.ajax({
            type: "POST",
            crossDomain: true,
            url: urlHelper.constructUrl('auth', 'checkauth'),
            data: JSON.stringify(data),
            contentType: "application/json",
            statusCode: {
                401: function() {
                    sessionStorage.clear();
                    alert('Your session Has expired, please log in again.');
                    location.href = urlHelper.constructUrl();
                }
            }
        });
    }
});

$('#trackBtn').on('click', function() {
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
                createTrackContent(response);
            }
        }
    });    
});


$('#albumBtn').on('click', function() {
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
                createAlbumContent(response);
                }
            }
        }).fail(function() {
            $('#alertDangerModal').show();
        });
    });

$('#artistBtn').on('click', function() {
    $('#loader').show();
    $('#tracks').empty();
    var url = urlHelper.constructUrl('artist', 'get-all-artist');
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: url,
        contentType: "application/json",
        statusCode: {
            401: function() {
                
            },
            200: (response) => {
                $('#pag').empty();
                $('#tracks').append(`
                <input type="text" id="myInput" onkeyup="myFunction()"  placeholder="Search for names.." title="Type in a name">
                <table  id="tracksTable">
                <tr>
                <th scope="col">Name</th>
                </tr>
                </table>
                `)
                $.each(response, function(index) {
                    $('#tracksTable').append(
                        `<tr>
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
    }).fail(function() {
        $('#alertDangerModal').show();
    });
});

        
window.myFunction = function() {
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


$('.closeBtn').on('click', function(e){
    $('#purchasedModal').hide();
    $('#alertSuccessModal').hide();
    $('#alertDangerModal').hide();
});

$('#logout').on('click', () => {
    sessionStorage.clear();
    location.href = urlHelper.constructUrl();
});

    
        