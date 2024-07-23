import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ModalValidacion } from "../../components/Modal/Modal";

export function EliminarUsuario() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({});
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    let { id_usuario } = useParams();

    useEffect(() => {
        CargarDatosUsuario();
    }, []);

    const CargarDatosUsuario = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/usuario/${id_usuario}`);
            setUsuario(response.data[0]);
        } catch (error) {
            console.log(error);
            setErrorMessage("Error al cargar los datos del usuario.");
            setShowErrorModal(true);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://144.126.210.74:8080/api/usuario/${id_usuario}`);
            setShowSuccessModal(true);
            setTimeout(() => {
                navigate("/usuarios");
            }, 1500); // Redirige después de 1.5 segundos para permitir ver el modal
        } catch (error) {
            console.log(error);
            if (error.response) {
                setErrorMessage("No es posible eliminar. Usuario está siendo utilizado en una gestión.");
            } else {
                setErrorMessage("Error al eliminar el usuario.");
            }
            setShowErrorModal(true);
        }
    }

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        navigate("/usuarios");
    }

    const handleErrorModalClose = () => {
        setShowErrorModal(false);
    }

    return (
        <div className="container">
            <h1>Eliminar Usuario</h1>
            <hr />
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <div className="card">
                <div className="card-header">Datos Del Usuario a Eliminar</div>
                <div className="card-body">
                    <h2>¿Desea Eliminar Al Usuario?</h2>
                    <h3>Nombre Usuario: {usuario.nombres} {usuario.apellidos}</h3>
                    <h3>Rut Usuario: {usuario.id_usuario}</h3>
                    <button className="btn btn-danger" onClick={onSubmit}>Eliminar Usuario</button>
                    <Link to="/usuarios" className="btn btn-secondary">Cancelar</Link>
                </div>
            </div>

            <ModalValidacion
                show={showSuccessModal}
                title="Usuario Eliminado"
                body="El usuario ha sido eliminado exitosamente."
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
    )
}
