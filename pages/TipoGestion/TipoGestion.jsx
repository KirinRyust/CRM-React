import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function TipoGestion() {
    const [tipogestion, setTipoGestion] = useState([]);

    useEffect(() => {
        const fetchTipoGestion = async () => {
            try {
                const response = await axios.get('http://144.126.210.74:8080/api/tipo_gestion?_size=500');
                setTipoGestion(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTipoGestion();
    }, []);

    return (
        <div className="container">
            <h1>Lista de Tipo Gestión</h1>
            <hr />
            <a href="/tipogestion/crear" className="btn btn-primary">Crear Tipo Gestión</a>
            <a href="/" className="btn btn-secondary">HomePage</a>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Tipo Gestión</th>
                        <th>Nombre Tipo Gestión</th>
                        <th>Fecha Registro</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tipogestion.map((tipo_gestion) => (
                        <tr key={tipo_gestion.id_tipo_gestion}>
                            <td>{tipo_gestion.id_tipo_gestion}</td>
                            <td>{tipo_gestion.nombre_tipo_gestion}</td>
                            <td>{tipo_gestion.fecha_registro}</td>
                            <td>
                             <Link to={`/tipogestion/actualizar/${tipo_gestion.id_tipo_gestion}`} className="btn btn-warning">Actualizar</Link>
                             <Link to={`/tipogestion/eliminar/${tipo_gestion.id_tipo_gestion}`} className="btn btn-danger">Eliminar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
