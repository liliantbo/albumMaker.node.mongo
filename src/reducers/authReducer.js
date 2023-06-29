import { THEME_DARK, THEME_LIGHT } from "../commonComponents/Properties";

const initialState = {
  loggedIn: false,
  theme: THEME_LIGHT,
  user: {
    id: null,
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    image: "",
    rol: ""
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        loggedIn: true,
        user: action.payload.user
      };
    case 'LOGOUT':
      return {
        loggedIn: false,
        user: null
      };
    case 'changeTheme':
      const newTheme = state.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
      return {
        ...state,
        theme: newTheme,
      };
    default:
      return state;
  }
};

export default authReducer;
