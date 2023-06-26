const initialState = {
  loggedIn: false,
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
    default:
      return state;
  }
};

export default authReducer;
