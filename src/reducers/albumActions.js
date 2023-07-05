export const goToAlbum = () => {
  return { type: 'goToAlbum' };
};

export const goToBill = () => {
  return { type: 'goToBill' };
};

export const goToResume = () => {
  return { type: 'goToResume' };
};

export const albumComplete = () => {
  return { type: 'albumComplete' };
};

export const billingComplete = () => {
  return { type: 'billingComplete' };
};

export const processComplete = () => {
  return { type: 'processComplete' };
};

export const saveComplete = () => {
  return { type: 'saveComplete' };
};

export const newAlbum = (email, albums) => {
  return { type: 'newAlbum', 
          payload: {email, albums} };
};
export const changeTheme = () => {
  return { type: 'changeTheme' };
};
export const changeToBirthdayTemplate = () => {
  return { type: 'birthdayTemplate' };
};
export const changeToLoveTemplate = () => {
  return { type: 'loveTemplate' };
};
export const updateImageList = (imageList) => {
  return {
    type: 'updateImageList',
    newImageList: imageList
  }
}
export const updateBilling = (billing) => {
  return {
    type: 'updateBilling',
    newBilling: billing
  }
}
export const updateShipping = (shipping) => {
  return {
    type: 'updateShipping',
    newShipping: shipping
  }
}
export const listAlbums = (albums) => {
  return {
    type: 'listAlbums',
    actualAlbumList: albums
  };
};
export const editAlbum = (selectedAlbum) => {
  return {
    type: 'editAlbum',
    newAlbum: selectedAlbum
  };
};
export const updateAlbumList = (albumList) => {
  return {
    type: 'updateAlbumList',
    newAlbumList: albumList
  }
}
export const changeCourier = (courier) => {
  return {
    type: 'changeCourier',
    newCourier: courier
  };
};

