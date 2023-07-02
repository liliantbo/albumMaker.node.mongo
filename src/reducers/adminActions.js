export const showStatistics = (user) => {
    return {
        type: 'showStatistics',
    };
};
export const showAlbums = (user) => {
    return {
        type: 'showAlbums',
    };
};
export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};
export const changeTheme = () => {
    return { type: 'changeTheme' };
};
export const updateCourierList = (courierList) => {
    return {
        type: 'updateCourierList',
        newCourierList: courierList
    };
};
