import { THEME_DARK, THEME_LIGHT } from "../commonComponents/Properties";

const initialState = {
  loggedIn: false,
  user: {
    id: null,
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    image: "",
    rol: ""
  },
  theme: THEME_LIGHT
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user
      };
    case 'LOGOUT':
      return initialState
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
