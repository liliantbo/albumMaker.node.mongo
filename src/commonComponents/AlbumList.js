import React from 'react';
import DirectoryTable from './DirectoryTable';
export default function AlbumList({albums, editAlbum, deleteAlbum, cancelAlbum}) {
    const currentAlbums = albums.sort((a, b) => b._id.localeCompare(a._id));
    return (<DirectoryTable
        albums={currentAlbums}
        editAlbum={editAlbum}
        deleteAlbum={deleteAlbum}
    />)

}