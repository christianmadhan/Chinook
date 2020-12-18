import * as TrackGet from './actions/track/track-get.js';
import * as AlbumGet from './actions/album/album-get.js';
import * as ArtistGet from './actions/artist/artist-get.js';

import * as urlHelper from '../helper/url.js';

$( document ).ready(() => {
    if(sessionStorage.getItem('auth') == null){
        location.href = urlHelper.constructUrl();
    }
});

$('#trackBtn').on('click', function() {
    TrackGet.getTracks();
});


$('#albumBtn').on('click', function() {
    AlbumGet.getAlbums();
});

$('#artistBtn').on('click', function() {
    ArtistGet.getArtists();
});

$('.closeBtn').on('click', function(e){
    $('#AddTrackModal').hide();
    $('#alertDangerModal').hide();
    $('#alertSuccessModal').hide();
    $('#EditModal').hide();

});

$('#logout').on('click', () => {
    sessionStorage.clear();
    location.href = urlHelper.constructUrl();
});

    
        