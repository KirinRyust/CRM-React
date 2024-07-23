import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PasswordCell = ({ password }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <td>
      {showPassword ? password : '•'.repeat(password.length)}
    </td>
  );
};

export function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://144.126.210.74:8080/api/usuario');
        setUsuarios(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="container">
      <h1>Lista de Usuarios</h1>
      <hr />
      <a href="/usuarios/crear" className="btn btn-primary">Crear Usuario</a>
      <a href="/" className="btn btn-secondary">HomePage</a>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DV</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Celular</th>
            <th>Username</th>
            <th>Password</th>
            <th>Fecha Registro</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.id_usuario}</td>
              <td>{usuario.dv}</td>
              <td>{usuario.nombres}</td>
              <td>{usuario.apellidos}</td>
              <td>{usuario.email}</td>
              <td>{usuario.celular}</td>
              <td>{usuario.username}</td>
              <PasswordCell password={usuario.password} />
              <td>{usuario.fecha_registro}</td>
              <td>
              <Link to={`/usuarios/actualizar/${usuario.id_usuario}`} className="btn btn-warning">Actualizar</Link>
              <Link to={`/usuarios/eliminar/${usuario.id_usuario}`} className="btn btn-danger">Eliminar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
);
}