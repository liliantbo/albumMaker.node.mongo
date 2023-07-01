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
    }
  };
  
  const adminReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'listStatistics':
        return {
            ...state,
            actualPage: PAGE_STATISTICS,
        };
      default:
        return state;
    }
  };
  
  export default adminReducer;
  