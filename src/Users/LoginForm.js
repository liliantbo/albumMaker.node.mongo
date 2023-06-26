import React, { useState } from "react";
import {  MDBBtn} from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/authActions';

const LoginForm = (props) => {
  const dispatch = useDispatch();
  
  const isRequired=false;
  const initialFormState = {
    id: null,
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    image: "",
  };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  return (
    <form 
      onSubmit={(event) => {
        event.preventDefault();
        if (!user.email || !user.password) return;

        props.loginUser(user);
        
        setUser(initialFormState);
      }}
    >
      <h6>Ingresa para acceder a todas las funcionalidades</h6>
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          required={isRequired}
        />
      </div>
      <div className="form-group">
        <label>Contraseña</label>
        <input
          type="text"
          name="password"
          value={user.password}
          onChange={handleInputChange}
          pattern="[a-zA-Z0-9-]+"
          required={isRequired}
        />
      </div>
      <MDBBtn>Ingresar</MDBBtn>
    </form>
  );
};

export default LoginForm;