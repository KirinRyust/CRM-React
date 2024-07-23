import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ModalValidacion } from "../../components/Modal/Modal";

export function EliminarTipoGestion() {
    const navigate = useNavigate();
    const [tipogestion, setTipoGestion] = useState([]);
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    let { id_tipo_gestion } = useParams();

    useEffect(() => {
        CargarDatosTipoGestion();
    }, []);

    const CargarDatosTipoGestion = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/tipo_gestion/${id_tipo_gestion}`);
            setTipoGestion(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://144.126.210.74:8080/api/tipo_gestion/${id_tipo_gestion}`);
            setShowSuccessModal(true);
        } catch (error) {
            console.log(error);
            if (error.response) {
                setErrorMessage("No es posible eliminar este tipo de gestión, está siendo utilizado en una gestión.");
                setShowErrorModal(true);
            }
        }
    }

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        navigate("/tipogestion");
    }

    const handleErrorModalClose = () => {
        setShowErrorModal(false);
    }

    return (
        <div className="container">
            <h1>Eliminar Tipo Gestión</h1>
            <hr />
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <div className="card">
                <div className="card-header">Datos Del Tipo Gestión a eliminar</div>
                <div className="card-body">
                    <h2>¿Desea Eliminar Este Tipo Gestión?</h2>
                    <h3>Nombre de tipo gestión: {tipogestion && tipogestion.nombre_tipo_gestion}</h3>
                    <h3>ID Tipo Gestión: {tipogestion.id_tipo_gestion}</h3>
                    <button className="btn btn-danger" onClick={onSubmit}>Eliminar Tipo Gestión</button>
                    <Link to="/tipogestion" className="btn btn-secondary">Cancelar</Link>
                </div>
            </div>

            <ModalValidacion
                show={showSuccessModal}
                title="Tipo Gestión Eliminado"
                body="El tipo de gestión ha sido eliminado exitosamente."
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
