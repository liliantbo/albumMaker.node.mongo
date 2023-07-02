export const listStatistics = (user) => {
    return {
        type: 'listStatistics',
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
