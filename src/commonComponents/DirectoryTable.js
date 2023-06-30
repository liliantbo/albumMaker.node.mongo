import React from "react";

import { useDispatch } from 'react-redux';
import { editAlbum } from '../reducers/albumActions';

import { ReactComponent as EditIcon } from './image-edit-outline.svg';
import { STATE_SENDED } from "./Properties";

function convertImageList(imageUrlList) {
  const nuevaLista = [];

  const convertImage = (imageUrl, index) => {
    return new Promise((resolve, reject) => {
      fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], `image_${index}`, { type: 'image/*' });
          const fileReader = new FileReader();

          fileReader.onload = () => {
            nuevaLista[index] = { file, item: fileReader.result, "status":"S3" };
            resolve();
          };

          fileReader.onerror = (error) => {
            reject(error);
          };

          fileReader.readAsDataURL(file);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const conversionPromises = imageUrlList.map((imageUrl, index) => {
    return convertImage(imageUrl, index);
  });

  return Promise.all(conversionPromises)
    .then(() => nuevaLista)
    .catch((error) => {
      console.error('Error al convertir las imágenes:', error);
      return [];
    });
}


const DirectoryTable = (props) => {
  //redux reducer
  const dispatch = useDispatch();
  const editAlbumHandler = (selectedAlbum) => {
    convertImageList(selectedAlbum.imageUrlList)
      .then((nuevaLista) => {
        console.log("La nueva lista es: ", nuevaLista);
        const newAlbum={
          ...selectedAlbum,
          imageList:nuevaLista
        }
        dispatch(editAlbum(newAlbum));
      })
      .catch((error) => {
        console.error('Error al convertir las imágenes:', error);
      });
  };
  
  

  const updateAlbums = props.albums;

  return (
    <div className="container">

      <table className="table mt-3">
        <thead className="table-dark">
          <tr>
            <th scope="col">No. Orden</th>
            <th scope="col">Fecha</th>
            <th scope="col">Facturado A</th>
            <th scope="col">Enviado A</th>
            <th scope="col">Estado</th>
            <th scope="col">Courier</th>
            <th scope="col">Motivo Cancelación</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {updateAlbums.length > 0 ? (
            updateAlbums.map((album) => (
              <tr key={album.albumId}>
                <td>{album.albumId}</td>
                <td>{album.fecha}</td>
                <td>{album.billing.name}</td>
                <td>{album.shipping.address}</td>
                <td>{album.estado}</td>
                <td>{album.courier}</td>
                <td>{album.motivoCancelacion}</td>
                <td>
                  {album.estado === STATE_SENDED &&
                      <EditIcon className="icon" 
                      aria-hidden="true"  
                      onClick={()=>editAlbumHandler(album)}/>
                    
                }

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Albums</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DirectoryTable;
