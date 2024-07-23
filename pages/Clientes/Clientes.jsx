import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function Clientes() {
    const [clientes, setClientes] = useState([]);
    
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://144.126.210.74:8080/api/cliente?_size=500');
                setClientes(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchClientes();
    }, []);

    return (
        <div className="container">
            <h1>Lista de Clientes</h1>
            <hr />
            <a href="/clientes/crear" className="btn btn-primary">Agregar Cliente</a>
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
                        <th>Fecha Registro</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id_cliente}>
                            <td>{cliente.id_cliente}</td>
                            <td>{cliente.dv}</td>
                            <td>{cliente.nombres}</td>
                            <td>{cliente.apellidos}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.celular}</td>
                            <td>{cliente.fecha_registro}</td>
                            <td>
                                <Link to={`/clientes/actualizar/${cliente.id_cliente}`} className="btn btn-warning">Actualizar</Link>
                                <Link to={`/clientes/eliminar/${cliente.id_cliente}`} className="btn btn-danger">Eliminar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
