import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ModalValidacion } from "../../components/Modal/Modal";

export function CrearTipoGestion() {
    const [nombre_tipo_gestion, setNombreTipoGestion] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!nombre_tipo_gestion) {
            setErrorMessage("El nombre del tipo de gestión es obligatorio.");
            setShowErrorModal(true);
            return;
        }
        try {
            const fecha_registro = new Date().toISOString().slice(0, 19).replace('T', ' ');
            await axios.post('http://144.126.210.74:8080/api/tipo_gestion', {
                nombre_tipo_gestion,
                fecha_registro
            });
            setShowSuccessModal(true);
        } catch (error) {
            console.log(error);
            setErrorMessage("Error al crear el tipo de gestión.");
            setShowErrorModal(true);
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
            <h1>Creación De Tipo Gestión</h1>
            <hr />
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Nombre Tipo Gestión</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre_tipo_gestion}
                        onChange={(e) => setNombreTipoGestion(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Tipo Gestión</button>
            </form>

            <ModalValidacion
                show={showSuccessModal}
                title="Tipo Gestión Creado"
                body="El tipo de gestión ha sido creado exitosamente."
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
