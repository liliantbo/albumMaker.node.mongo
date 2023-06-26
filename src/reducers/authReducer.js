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
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        loggedIn: true,
        user: {
          email: action.payload.email
        }
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
