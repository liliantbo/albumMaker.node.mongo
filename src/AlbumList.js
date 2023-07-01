import React, { useState } from 'react';
import DirectoryTable from './commonComponents/DirectoryTable';
export default function AlbumList({albums, editAlbum, deleteAlbum, cancelAlbum}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [albumsPerPage] = useState(10);
    const indexOfLastAlbum = currentPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
    const currentAlbums = Array.isArray(albums) ? albums.slice(indexOfFirstAlbum, indexOfLastAlbum) : [];
    return (<DirectoryTable
        albums={currentAlbums}
        editAlbum={editAlbum}
        deleteAlbum={deleteAlbum}
    />)

}