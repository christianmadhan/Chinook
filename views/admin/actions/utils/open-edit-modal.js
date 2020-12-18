import * as ArtistEdit from '../artist/artist-edit.js';
import * as AlbumEdit from '../album/album-edit.js';
import * as TrackEdit from '../track/track-edit.js';


function openEditModal(content, id){
    $('#EditContent').empty();
    switch (content) {
        case "TRACK":
            TrackEdit.getTrackEditContent(id);
            break;
        case "ALBUM":
            AlbumEdit.getAlbumEditContent(id);
            break;
        case "ARTIST":
            ArtistEdit.getArtistEditContent(id);
            break;
        default:
            break;
    }
    $('#EditModal').show();
    $('#loader4').hide();
    $('#EditContent').show();
}

export {openEditModal};