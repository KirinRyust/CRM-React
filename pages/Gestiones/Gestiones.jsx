import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function Gestiones() {
    const [gestiones, setGestiones] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [tiposGestion, setTiposGestion] = useState([]);
    const [resultados, setResultados] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gestionResponse = await axios.get('http://144.126.210.74:8080/api/gestion?_size=500');
                const usuarioResponse = await axios.get('http://144.126.210.74:8080/api/usuario?_size=500');
                const clienteResponse = await axios.get('http://144.126.210.74:8080/api/cliente?_size=500');
                const tipoGestionResponse = await axios.get('http://144.126.210.74:8080/api/tipo_gestion?_size=500');
                const resultadoResponse = await axios.get('http://144.126.210.74:8080/api/resultado?_size=500');

                setGestiones(gestionResponse.data);
                setUsuarios(usuarioResponse.data);
                setClientes(clienteResponse.data);
                setTiposGestion(tipoGestionResponse.data);
                setResultados(resultadoResponse.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const getUsuario = (idUsuario) => {
        const usuario = usuarios.find(user => user.id_usuario === idUsuario);
        return usuario ? `${usuario.nombres} ${usuario.apellidos}` : 'NO DEFINIDO';
    };

    const getCliente = (idCliente) => {
        const cliente = clientes.find(cli => cli.id_cliente === idCliente);
        return cliente ? `${cliente.nombres} ${cliente.apellidos}` : 'NO DEFINIDO';

    };

    const getTipoGestion = (idTipoGestion) => {
        const tipoGestion = tiposGestion.find(tipo => tipo.id_tipo_gestion === idTipoGestion);
        return tipoGestion ? tipoGestion.nombre_tipo_gestion : 'NO DEFINIDO';

    };

    const getResultado = (idResultado) => {
        const resultado = resultados.find(res => res.id_resultado === idResultado);
        return resultado ? resultado.nombre_resultado : 'NO DEFINIDO';

    };

    return (
        <div className="container">
            <h1>Lista de Gestiones</h1>
            <hr />
            <a href="/gestiones/crear" className="btn btn-primary"> Crear Gestión </a>
            <a href="/" className="btn btn-secondary">HomePage</a>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Gestión</th>
                        <th>Usuario</th>
                        <th>Cliente</th>
                        <th>Tipo Gestión</th>
                        <th>Resultado</th>
                        <th>Comentarios</th>
                        <th>Fecha Registro</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {gestiones.map((gestion) => (
                        <tr key={gestion.id_gestion}>
                            <td>{gestion.id_gestion}</td>
                            <td>{getUsuario(gestion.id_usuario)}</td>
                            <td>{getCliente(gestion.id_cliente)}</td>
                            <td>{getTipoGestion(gestion.id_tipo_gestion)}</td>
                            <td>{getResultado(gestion.id_resultado)}</td>
                            <td>{gestion.comentarios || "NO DEFINIDO"}</td>
                            <td>{gestion.fecha_registro}</td>
                            <td>
                                <Link to={`/gestiones/actualizar/${gestion.id_gestion}`} className="btn btn-warning">Actualizar</Link>
                                <Link to={`/gestiones/eliminar/${gestion.id_gestion}`} className="btn btn-danger">Eliminar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
