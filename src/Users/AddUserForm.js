import React, { useState } from "react";
import {  MDBBtn} from 'mdb-react-ui-kit';

const AddUserForm = (props) => {
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
        if (!user.first_name || !user.last_name) return;

        props.addUser(user);
        setUser(initialFormState);
      }}
    >
      <h6>Crea una cuenta para acceder a todas las funcionalidades</h6>
      <div className="form-group align-self-start">
        <label>Nombre</label>
        <input
          type="text"
          name="first_name"
          value={user.first_name}
          onChange={handleInputChange}
          pattern="[a-zA-Z]+"
          required={isRequired}
        />
      </div>
      <div className="form-group">
        <label>Apellido</label>
        <input
          type="text"
          name="last_name"
          value={user.last_name}
          onChange={handleInputChange}
          pattern="[a-zA-Z]+"
          required={isRequired}
        />
      </div>
      <div className="form-group">
        <label>Usuario</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleInputChange}
          pattern="[a-zA-Z0-9-]+"
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
      <MDBBtn>Guardar</MDBBtn>
    </form>
  );
};

export default AddUserForm;