import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ModalValidacion } from "../../components/Modal/Modal";

export function CrearResultado() {
    const [nombre_resultado, setNombreResultado] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!nombre_resultado) {
            setErrorMessage("El nombre del resultado es obligatorio.");
            setShowErrorModal(true);
            return;
        }
        try {
            const fecha_registro = new Date().toISOString().slice(0, 19).replace('T', ' ');
            await axios.post('http://144.126.210.74:8080/api/resultado', {
                nombre_resultado,
                fecha_registro
            });
            setShowSuccessModal(true);
        } catch (error) {
            console.log(error);
            setErrorMessage("Error al crear el resultado.");
            setShowErrorModal(true);
        }
    }

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        navigate("/resultados");
    }

    const handleErrorModalClose = () => {
        setShowErrorModal(false);
    }

    return (
        <div className="container">
            <h1>Creación De Resultado</h1>
            <hr />
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Nombre Resultado</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre_resultado}
                        onChange={(e) => setNombreResultado(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Resultado</button>
                <a type="button" className="btn btn-secondary" href="/resultados">Cancelar</a>
            </form>

            <ModalValidacion
                show={showSuccessModal}
                title="Resultado Creado"
                body="El resultado ha sido creado exitosamente."
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
