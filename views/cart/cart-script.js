import * as urlHelper from '../helper/url.js';

$( document ).ready(() => {
    if(sessionStorage.getItem('auth') == null){
        location.href = urlHelper.constructUrl();
    } else {
        var authdata = {
            "auth": sessionStorage.getItem('auth')
        }
        $.ajax({
            type: "POST",
            crossDomain: true,
            url: urlHelper.constructUrl('auth', 'checkauth'),
            data: JSON.stringify(authdata),
            contentType: "application/json",
            statusCode: {
                401: function() {
                    sessionStorage.clear();
                    alert('Your session Has expired, please log in again.');
                    location.href = urlHelper.constructUrl();
                }
            }
        });
        
        var url = urlHelper.constructUrl("cart", "get-cart");
        var data = {
            auth: sessionStorage.getItem("auth")
        }
        $.ajax({
           type: "POST",
           crossDomain: true,
           url: url,
           data: JSON.stringify(data),
           contentType: "application/json",
           statusCode: {
               401: (res) => {
                   console.log(res);
                    sessionStorage.clear();
                   alert('Your session Has expired, please log in again.');
                   location.href = urlHelper.constructUrl();
               },
               200: (response) => {
                   var totalPrice = 0.0;
                   $('#Address').val(response.BillingInfo[0].Address);
                   $('#City').val(response.BillingInfo[0].City);
                   $('#State').val(response.BillingInfo[0].State);
                   $('#Country').val(response.BillingInfo[0].Country);
                   $('#PostalCode').val(response.BillingInfo[0].PostalCode);
                   $('#cart').append(`
                   <table  id="tracksTable">
                   <tr>
                   <th scope="col">Name</th>
                   <th scope="col">Quantity</th>
                   <th scope="col">Price</th>
                   </tr>
                   </table>
                   `);
                   $.each(response.InvoiceLine, function(item, elm) {
                       totalPrice += parseFloat(elm.UnitPrice);
                       $('#tracksTable').append(`
                       <tr>
                       <td>
                       ${elm.Name}
                       </td>
                       <td>
                       ${elm.Quantity}
                       </td>
                       <td>
                       ${elm.UnitPrice}
                       </td>
                       </tr>`);
                    });
                    $('#cart').append(`
                    <hr>
                    <p>Total:  <span class="price"><b>$${totalPrice.toFixed(2)}</b></span></p>
                    `);
                    $('#buyBtn').attr('total', totalPrice);
               }
           }
       });
    }
});

$('#buyBtn').on('click', function(){
    if($('#billingInfo').valid()){
        $('#purchasedModal').show();
        var url = urlHelper.constructUrl('cart', 'purchase-cart');
        var data = {
            auth: sessionStorage.getItem("auth"),
            Total: $('#buyBtn').attr('total'),
            Address: $('#Address').val(),
            City: $('#City').val(),
            State: $('#State').val(),
            Country: $('#Country').val(),
            PostalCode: $('#PostalCode').val()
        }
        $.ajax({
           type: "PUT",
           crossDomain: true,
           url: url,
           data: JSON.stringify(data),
           contentType: "application/json",
           statusCode: {
               401: (res) => {
                   console.log(res);
                    sessionStorage.clear();
                   alert('Your session Has expired, please log in again.');
                   location.href = urlHelper.constructUrl();
               },
              500: (response) => {
                $('#loader').hide();
                $('#message').empty();
                $('#message').show();
                $('#message').append(`
                    <p style="color:red">Something bad happened</p>
                `);
                console.log(response);
                },
               200: (response) => {
                    $('#loader').hide();
                    $('#message').empty();
                    $('#message').show();
                    $('#message').append(`
                        <p style="color:green"> Successfully Purchased </p>
                    `);
                    console.log(response);
               }
           }
       });
    }
});

$('#logout').on('click', () => {
    sessionStorage.clear();
    location.href = urlHelper.constructUrl();
});

$('#closeBtn').on('click', function(){
    $('#purchasedModal').hide();
    location.reload();
});