import { PAGE_ALBUM, PAGE_STATISTICS } from "../commonComponents/Properties";

const initialState = {
    actualPage: PAGE_ALBUM,
    user:  {
      id: null,
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      email: "",
      image: "",
      rol:""
    },
    courierList:[]
  };
  
  const adminReducer = (state = initialState, action) => {
    console.log("AdminReducer :: Action :: Type: ", action.type);
    console.log("AdminReducer :: Action :: action: ", action);
    console.log("AdminReducer :: Action :: state: ", state);
    switch (action.type) {
      case 'listStatistics':
        return {
            ...state,
            actualPage: PAGE_STATISTICS,
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
  