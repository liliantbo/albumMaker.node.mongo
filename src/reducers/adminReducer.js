import { PAGE_ALBUM, PAGE_STATISTICS } from "../commonComponents/Properties";

const initialState = {
    actualPage: PAGE_ALBUM,
    courierList:[]
  };
  
  const adminReducer = (state = initialState, action) => {
    console.log("AdminReducer :: Action :: Type: ", action.type);
    console.log("AdminReducer :: Action :: action: ", action);
    console.log("AdminReducer :: Action :: state: ", state);
    switch (action.type) {
      case 'showStatistics':
        return {
            ...state,
            actualPage: PAGE_STATISTICS,
        };
        case 'showAlbums':
        return {
            ...state,
            actualPage: PAGE_ALBUM,
        };
        case 'updateCourierList':
          return {
              ...state,
              courierList: action.newCourierList,
          };
      default:
        return state;
    }
  };
  
  export default adminReducer;
  