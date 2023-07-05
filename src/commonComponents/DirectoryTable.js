import React from "react";
import { format } from 'date-fns';

import { useSelector, useDispatch } from 'react-redux';
import { editAlbum, updateAlbumList } from '../reducers/albumActions';

import { ReactComponent as EditIcon } from './image-edit-outline.svg';
import { STATE_SENDED, ROL_USER, STATE_DISPATCH, STATE_CANCELED, MAX_TEMPLATE_SIZE } from "./Properties";
import OrderOptions from "./OrderOptions";

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
            nuevaLista[index] = { file, item: fileReader.result, "status": "S3" };
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
  //redux store
  const user = useSelector(state => state.auth.user);
  const { rol } = user
  const isUser = rol === ROL_USER;
  //redux reducer
  const dispatch = useDispatch();
  const editAlbumHandler = (selectedAlbum) => {
    convertImageList(selectedAlbum.imageUrlList)
      .then((nuevaLista) => {
        console.log("La nueva lista es: ", nuevaLista);
        //preparo las posciones no usadas listas para edicion
        while (nuevaLista.length < MAX_TEMPLATE_SIZE) {
          nuevaLista.push(null);
        }
        const newAlbum = {
          ...selectedAlbum,
          imageList: nuevaLista
        }
        dispatch(editAlbum(newAlbum));
      })
      .catch((error) => {
        console.error('Error al convertir las imágenes:', error);
      });
  };

  const editAlbumAdminHandler = (newAlbum) => {
    console.log("DirectoryTable :: editAlbumHandler :: newAlbum: ", newAlbum);
    const updatedAlbums = updateAlbums.map((album) =>
      album._id === newAlbum._id ? newAlbum : album
    );
    console.log("DirectoryTable :: editAlbumHandler :: newAlbum: ", updatedAlbums);
    dispatch(updateAlbumList(updatedAlbums));
  };

  const cancelAlbumAdminHandler = (newAlbum) => {
    const updatedAlbums = updateAlbums.map((album) =>
      album._id === newAlbum._id ? newAlbum : album
    );
    dispatch(updateAlbumList(updatedAlbums));
  };

  const deleteAlbumAdminHandler = (newAlbum) => {
    const updatedAlbums = updateAlbums.map((album) =>
      album._id == newAlbum._id ? newAlbum : album
    );
    dispatch(updateAlbumList(updatedAlbums));
  };

  function handleMotivoCancelacionChange({ albumEdited, motivo }) {
    const newAlbum = {
      ...albumEdited,
      motivoCancelacion: motivo,
    };
    const updatedAlbums = updateAlbums.map((album) =>
      album._id === newAlbum._id ? newAlbum : album
    );
    dispatch(updateAlbumList(updatedAlbums));

  }


  const updateAlbums = props.albums;

  return (
    <div className="container">
      <table className="table mt-3">
        <thead className="table-dark">
          <tr>
            <th scope="col">No. Orden</th>
            <th scope="col">Fecha</th>
            <th scope="col">Facturacion</th>
            <th scope="col">Envío</th>
            <th scope="col">Estado</th>
            <th scope="col">Courier</th>
            <th scope="col">Motivo Cancelación</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {updateAlbums.length > 0 ? (
            updateAlbums.map((album) => {
              const isAllowedState = album.estado === STATE_SENDED;
              const isAllowedStateAdmin = [STATE_SENDED, STATE_DISPATCH]
                .includes(album.estado);
              const isCanceled = album.estado === STATE_CANCELED;
              return (
                <tr key={album._id}>
                  <td>{album._id}</td>
                  <td>{format(new Date(album.fecha), 'dd/MM/yyyy')}</td>
                  <td>{album.billing.name}</td>
                  <td>{album.shipping.city + " - " + album.shipping.address}</td>
                  <td>{album.estado}</td>
                  <td>{album.courier}</td>
                  <td>{!isCanceled || isUser ? album.motivoCancelacion :
                    <textarea
                      id="motivoCancelacion"
                      value={album.motivoCancelacion}
                      onChange={(event) => handleMotivoCancelacionChange({ albumEdited: album, motivo: event.target.value })}
                      required
                    ></textarea>
                  }</td>
                  <td>
                    {isUser && isAllowedState && (
                      <EditIcon
                        className="icon"
                        aria-hidden="true"
                        onClick={() => editAlbumHandler(album)}
                      />
                    )}
                    {!isUser && isAllowedStateAdmin && (
                      <OrderOptions
                        album={album}
                        onCourierChange={editAlbumAdminHandler}
                        onCancelChange={cancelAlbumAdminHandler}
                        onDeleteChange={deleteAlbumAdminHandler}
                      />
                    )}
                  </td>
                </tr>
              );
            })
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
