import React, { useState, useMemo } from "react";
import SearchBox from "./SearchBox";
import IconButton from "../document-new.svg";
import DeleteIcon from "../document-new.svg";
import EditIcon from "../document-new.svg";

const useSortableData = (albums, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedAlbums = useMemo(() => {
    let sortableAlbums = [...albums];
    if (sortConfig !== null) {
      sortableAlbums.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableAlbums;
  }, [albums, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { albums: sortedAlbums, requestSort, sortConfig };
};

const DirectoryTable = (props) => {
  const { albums, requestSort, sortConfig } = useSortableData(props.albums);
  const { editAlbum, deleteAlbum } = props;
  const [searchValue, setSearchValue] = useState("");
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const searchHandler = (value) => {
    setSearchValue(value);
  };

  let updateAlbums = albums.filter((album) => {
    return Object.keys(album).some((key) =>
      album[key]
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase())
    );
  });

  return (
    <>
      <div className="container">
        <SearchBox searchHandler={searchHandler} />
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("first_name")}
                  className={getClassNamesFor("first_name")}
                >
                  No. Orden
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("last_name")}
                  className={getClassNamesFor("last_name")}
                >
                  Facturacion
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("username")}
                  className={getClassNamesFor("username")}
                >
                  Envio
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("email")}
                  className={getClassNamesFor("email")}
                >
                  Estado
                </button>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {updateAlbums.length > 0 ? (
              updateAlbums.map((album) => (
                <tr key={album.id}>
                  <td>{album.albumId}</td>
                  <td>{album.name}</td>
                  <td>{album.addressS}</td>
                  <td>{album.estado}</td>
                  <td>{album.courier}</td>
                  <td>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        editAlbum(album);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteAlbum(album.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No Albums</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DirectoryTable;
