import React, { useState, useMemo } from "react";

const DirectoryTable = (props) => {
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
          </tr>
        </thead>
        <tbody>
          {updateAlbums.length > 0 ? (
            updateAlbums.map((album) => (
              <tr key={album.id}>
                <td>{album.id}</td>
                <td>{album.fecha}</td>
                <td>{album.billing.name}</td>
                <td>{album.shipping.address}</td>
                <td>{album.estado}</td>
                <td>{album.courier}</td>
                <td>{album.motivoCancelacion}</td>
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
