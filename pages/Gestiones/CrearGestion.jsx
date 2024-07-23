import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ModalValidacion } from "../../components/Modal/Modal";

export function CrearGestion() {
    const [usuarios, setUsuarios] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [tiposGestion, setTiposGestion] = useState([]);
    const [resultados, setResultados] = useState([]);

    const [id_usuario, setIdUsuario] = useState("");
    const [id_cliente, setIdCliente] = useState("");
    const [id_tipo_gestion, setIdTipoGestion] = useState("");
    const [id_resultado, setIdResultado] = useState("");
    const [comentarios, setComentarios] = useState("");

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usuarioResponse = await axios.get('http://144.126.210.74:8080/api/usuario');
                const clienteResponse = await axios.get('http://144.126.210.74:8080/api/cliente');
                const tipoGestionResponse = await axios.get('http://144.126.210.74:8080/api/tipo_gestion');
                const resultadoResponse = await axios.get('http://144.126.210.74:8080/api/resultado');

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

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!id_usuario || !id_cliente || !id_tipo_gestion || !id_resultado || !comentarios) {
            setErrorMessage("Todos los campos deben ser completados.");
            setShowErrorModal(true);
            return;
        }
        
        try {
            const fecha_registro = new Date().toISOString().slice(0, 19).replace('T', ' ');
            await axios.post('http://144.126.210.74:8080/api/gestion', {
                id_usuario,
                id_cliente,
                id_tipo_gestion,
                id_resultado,
                comentarios,
                fecha_registro
            });
            setShowSuccessModal(true);
        } catch (error) {
            console.log(error);
            setErrorMessage("Ocurrió un error al crear la gestión. Inténtelo de nuevo.");
            setShowErrorModal(true);
        }
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        navigate("/gestiones");
    };

    const handleErrorModalClose = () => {
        setShowErrorModal(false);
    };

    return (
        <div className="container">
            <h1>Crear Gestión</h1>
            <hr />
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Usuario</label>
                    <select
                        name="id_usuario"
                        value={id_usuario}
                        onChange={(e) => setIdUsuario(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Seleccione un usuario</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id_usuario} value={usuario.id_usuario}>
                                {usuario.nombres} {usuario.apellidos}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Cliente</label>
                    <select
                        name="id_cliente"
                        value={id_cliente}
                        onChange={(e) => setIdCliente(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Seleccione un cliente</option>
                        {clientes.map((cliente) => (
                            <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                {cliente.nombres} {cliente.apellidos}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Tipo de Gestión</label>
                    <select
                        name="id_tipo_gestion"
                        value={id_tipo_gestion}
                        onChange={(e) => setIdTipoGestion(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Seleccione un tipo de gestión</option>
                        {tiposGestion.map((tipo) => (
                            <option key={tipo.id_tipo_gestion} value={tipo.id_tipo_gestion}>
                                {tipo.nombre_tipo_gestion}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Resultado</label>
                    <select
                        name="id_resultado"
                        value={id_resultado}
                        onChange={(e) => setIdResultado(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Seleccione un resultado</option>
                        {resultados.map((resultado) => (
                            <option key={resultado.id_resultado} value={resultado.id_resultado}>
                                {resultado.nombre_resultado}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Comentarios</label>
                    <input
                        type="text"
                        name="comentarios"
                        value={comentarios}
                        onChange={(e) => setComentarios(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Gestión</button>
                <a href="/gestiones" className="btn btn-secondary">Cancelar</a>
            </form>

            <ModalValidacion
                show={showSuccessModal}
                title="Gestión Creada"
                body="La gestión ha sido creada exitosamente."
                onClose={handleSuccessModalClose}
                onConfirm={handleSuccessModalClose}
                confirmText="OK"
                confirmButtonClass="btn-primary"
            />

            <ModalValidacion
                show={showErrorModal}
                title="Error"
                body={errorMessage}
                onClose={handleErrorModalClose}
                onConfirm={handleErrorModalClose}
                confirmText="Cerrar"
                confirmButtonClass="btn-danger"
            />
        </div>
    );
}
