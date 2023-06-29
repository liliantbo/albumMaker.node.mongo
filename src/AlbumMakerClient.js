import React, {useState, useEffect} from 'react';
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux';
import { newAlbum, listAlbums } from './reducers/albumActions';
import { FLOW_LIST } from './commonComponents/Properties';

import AlbumMakerCreator from './AlbumMakerCreator';
import Pagination from './commonComponents/Pagination';
import DirectoryTable from './commonComponents/DirectoryTable';

export default function AlbumMakerClient() {
  
  //redux store
  const flow = useSelector(state => state.alb.flow);
  const isListFlow = flow === FLOW_LIST; 

  //redux reducer
  const dispatch = useDispatch();
  const newAlbumHandler = () => {
    dispatch(newAlbum());
  };
  const allAlbumHandler = () => {
    dispatch(listAlbums());
  };

  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage] = useState(10);
  const editAlbum = (album) => {  
  };
  const deleteAlbum = (id) => {
    setAlbums(albums.filter((album) => album.id !== id));
  };

  useEffect(() => {
    axios("http://localhost:3000/admin/albums/data")
      .then((response) =>
        response.data.map((album) => ({
          fecha: album.fecha,
          albumId: album._id,
          name: album.name,
          addressS: album.addressS,
          estado: album.estado,
          courier: album.courier
        }))
      )
      .then((data) => {
        setAlbums(data);
      });
  }, []);

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <header className="d-flex flex-row bg-black bd-highlight">
        <ul className="nav flex-row d-flex p-0 bd-highlight 
        justify-content-start align-items-stretch">
          <li className="nav-item d-flex align-items-stretch me-3">
              <button className={`btn btn-dark btn-focus shadow-none ${isListFlow ? 'bg-secondary' : ''}`}
                onClick={allAlbumHandler}>
                Mis Albumes
              </button>
          </li>
          <li className="nav-item me-3">
          <button className={`btn btn-dark btn-focus shadow-none ${!isListFlow ? 'bg-secondary' : ''}`}
                onClick={newAlbumHandler}>
                Nuevo Album
              </button>
          </li>
        </ul>
      </header >
      {!isListFlow?<AlbumMakerCreator/>:(
      <div className="d-flex flex-row " style={{ height: '83vh' }}>
      <DirectoryTable
        albums={currentAlbums}
        editAlbum={editAlbum}
        deleteAlbum={deleteAlbum}
      />
      <Pagination
        albumsPerPage={albumsPerPage}
        totalAlbums={albums.length}
        paginate={paginate}
      />
      </div>
      )}
    </div >
  );
}
