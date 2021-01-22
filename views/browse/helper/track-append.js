import * as urlHelper from '../../helper/url.js';

function createTrackContent(response) {
    $('#pag').empty();
    $('#tracks').append(`
    <input type="text" id="myInput" onkeyup="myFunction()"  placeholder="Search for names.." title="Type in a name">
    <table  id="tracksTable">
    <tr>
    <th scope="col">Name</th>
    <th scope="col">Composer</th>
    <th scope="col">Milliseconds</th>
    <th scope="col">Bytes</th>
    <th scope="col">UnitPrice</th>
    <th scope="col">Quantity</th>
    <th scope="col">Add to cart</th>
    </tr>
    </table>
    `)
    // --------------------------------------------------------------------

    var numberPerPage = Math.ceil(response.length / 30);
    var slicedList = response.slice(0, 30);
    
    slicedList.forEach((elm, index) => {
        $('#tracksTable').append(`
        <tr>
        <td>
        ${elm.Name}
        </td>
        <td>
        ${elm.Composer}
        </td>
        <td>
        ${elm.Milliseconds}
        </td>
        <td>
        ${elm.Bytes}
        </td>
        <td>
        ${elm.UnitPrice}
        </td>
        <td>
        <input style="color:white;" type="number" id="quantity" min="1" max="10" value="1">
        </td>
        <td>
        <span class="buyTrack">
        <i data-track="${elm.TrackId}" track-price="${elm.UnitPrice}" class="fas fa-cart-plus fa-2x"></i>
        </span>
        </td>
        </tr>
        `);
    })
    
    $('#tracksTable').attr('data-num', 30);

    $('#pag').append(`<a id="previous" onclick="paginate(1)">&laquo;</a>`);
    for(var i = 1; i <= numberPerPage; i++){
       i == 1 ? $('#pag').append(`<a class="active" id="1">${i}</a>`) : $('#pag').append(`<a  id="${i}">${i}</a>`);
    }
    $('#pag').append(`<a id="next" onclick="paginate(2)">&raquo;</a>`);

    window.paginate = (direction) => {
        switch (direction) {
            case 1:
                if($('#previous').hasClass('danger')){$('#next').removeClass('danger');}
                var end = parseInt($('#tracksTable').attr('data-num'));
                console.log('lastnum:  ' + end);
                if(end == response.length){
                    end = numberPerPage * 30;
                }
                var start = Math.ceil(end - 60);
                var last = Math.ceil(end - 30);

                if(start < 0){
                    $('#previous').addClass('danger');
                } else {
                $(`#${Math.ceil(last / 30)}`).addClass('active');
                $(`#${Math.ceil(end / 30)}`).removeClass('active');
                $('#tracksTable').attr('data-num', last);
                rebuildList(start, last);
                }
                break;
            case 2:
                if($('#next').hasClass('danger')){$('#previous').removeClass('danger');}
                var start = parseInt($('#tracksTable').attr('data-num'));
                var last = start + 30;
                if(last > numberPerPage * 30) {
                    $('#next').addClass('danger');
                } else {
                    $(`#${Math.ceil(start / 30)}`).removeClass('active');
                    $(`#${Math.ceil(last / 30)}`).addClass('active');
                    $('#tracksTable').attr('data-num', last);
                    rebuildList(start, last);
                }
                break;
            default:
                break;
        }
    }

    function rebuildList(start, end) {
        let newSlicedList = response.slice(start, end);
        $('#tracksTable').empty();
        newSlicedList.forEach((elm, index) => {
            $('#tracksTable').append(`
            <tr>
            <td>
            ${elm.Name}
            </td>
            <td>
            ${elm.Composer}
            </td>
            <td>
            ${elm.Milliseconds}
            </td>
            <td>
            ${elm.Bytes}
            </td>
            <td>
            ${elm.UnitPrice}
            </td>
            <td>
            <input style="color:white;" type="number" id="quantity" min="1" max="10" value="1">
            </td>
            <td>
            <span class="buyTrack">
            <i data-track="${elm.TrackId}" track-price="${elm.UnitPrice}" class="fas fa-cart-plus fa-2x"></i>
            </span>
            </td>
            </tr>
            `);
        })
    }

    // --------------------------------------------------------------------

     $('.buyTrack').on('click', function(){
         var elmId = $(this).find('i').attr('data-track');
         var UnitPrice = $(this).find('i').attr('track-price');

         var quantity = $(this).parent().parent().find('input').val();
         if(quantity <= 10 && quantity > 0){
             var total = UnitPrice * quantity;
             var data = {
                 "auth": sessionStorage.getItem('auth'),
                 "trackId": elmId,
                 "quantity": quantity,
                 "unitPrice": total
             }
             var buyTrackUrl = urlHelper.constructUrl('cart', 'add-track');
             $.ajax({
                 type: "POST",
                 crossDomain: true,
                 url: buyTrackUrl,
                 data: JSON.stringify(data),
                 contentType: "application/json",
                 statusCode: {
                     401: () => {
                         alert('Your session Has expired, please log in again.');
                         location.href = urlHelper.constructUrl();
                     },
                     200: (response) => {
                         $('#alertSuccessModal').show();
                     }
                 }
             }).fail(function(res) {
                 console.log(res.responseText);
                 $('#alertDangerModal').show();
             });
             
         } else {
             alert("quantity not allowed");
         }
     });
     $('#loader').hide();
     $('#tracks').show();
}



export {createTrackContent};