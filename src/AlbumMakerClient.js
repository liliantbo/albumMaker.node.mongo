import React, { useState, useEffect } from 'react';
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux';
import { newAlbum, listAlbums } from './reducers/albumActions';
import { FLOW_LIST } from './commonComponents/Properties';

import AlbumMakerCreator from './AlbumMakerCreator';
import Pagination from './commonComponents/Pagination';
import DirectoryTable from './commonComponents/DirectoryTable';

export default function AlbumMakerClient() {

  //redux store
  const email = useSelector(state => state.auth.user.email);
  const flow = useSelector(state => state.alb.flow);
  const isListFlow = flow === FLOW_LIST;

  //redux reducer
  const dispatch = useDispatch();
  const newAlbumHandler = () => {
    dispatch(newAlbum(email));
  };
  const allAlbumHandler = () => {
    dispatch(listAlbums());
  };

  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage] = useState(10);
  const editAlbum = (album) => {
    return null;
  };
  const deleteAlbum = (id) => {
    setAlbums(albums.filter((album) => album.id !== id));
  };

  useEffect(() => {
    axios.get("http://localhost:3000/clients")
      .then((response) => {
        console.log("ALbumMakerClient :: useEffect :: response: ", response);
        const data = response.data.map((album) => {
          return {
            billing: {
              name: album.name,
              lastName: album.lastName,
              identificationNumber: album.identificationNumber,
              telephone: album.telephone,
              province: album.province,
              city: album.city,
              address: album.address
            },
            shipping: {
              copyFromBilling: false,
              name: album.nameS,
              lastName: album.lastNameS,
              identificationNumber: album.identificationNumberS,
              telephone: album.telephoneS,
              province: album.provinceS,
              city: album.cityS,
              address: album.addressS
            },
            albumId: album._id,
            imageList: [null, null, null, null, null, null],
            imageUrlList: album.imageUrlList,
            template: album.template,
            estado: album.estado,
            userEmail: album.userEmail,
            fecha: album.fecha,
            operador: album.operador,
            courier: album.courier,
            motivoCancelacion: album.motivoCancelacion
          };
        });
        console.log("ALbumMakerClient :: useEffect :: data: ", data);
        setAlbums(data);
      })
      .catch((error) => {
        console.error("ALbumMakerClient :: useEffect :: error: ", error);
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
      {!isListFlow ? <AlbumMakerCreator /> : (
        <div className="d-flex flex-row " style={{ height: '83vh' }}>
          <DirectoryTable
            albums={currentAlbums}
            editAlbum={editAlbum}
            deleteAlbum={deleteAlbum}
          />
          
        </div>
      )}
    </div >
  );
}
