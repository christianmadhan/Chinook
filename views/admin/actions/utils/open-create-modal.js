// import * as ArtistEdit from '../artist/artist-edit.js';
 import * as AlbumCreate from '../album/album-create.js';
 import * as ArtistCreate from '../artist/artist-create.js';
 import * as TrackCreate from '../track/track-create.js';


// import * as TrackEdit from '../track/track-edit.js';

function openCreateModal(content){
    $('#EditContent').empty();
    switch (content) {
        case "TRACK":
            TrackCreate.getTrackCreateContent();
            break;
        case "ALBUM":
            AlbumCreate.getAlbumCreateContent();
            break;
        case "ARTIST":
            ArtistCreate.getArtistCreateContent();
            break;
        default:
            break;
    }
    $('#EditModal').show();
    $('#loader4').hide();
    $('#EditContent').show();
}

export {openCreateModal};