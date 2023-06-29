export const goToAlbum = () => {
  return { type: 'goToAlbum' };
};

export const goToBill = () => {
  return { type: 'goToBill' };
};

export const goToResume = () => {
  return { type: 'goToResume' };
};

export const albumComplete = (userEmail) => {
  return { type: 'albumComplete',
            payload: {userEmail} };
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

export const newAlbum = (email) => {
  return { type: 'newAlbum', 
          payload: {email} };
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
export const listAlbums = () => {
  return { type: 'listAlbums' };
};
