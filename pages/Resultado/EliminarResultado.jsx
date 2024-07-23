import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ModalValidacion } from "../../components/Modal/Modal";

export function EliminarResultado() {
    const navigate = useNavigate();
    const [resultado, setResultado] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    let { id_resultado } = useParams();

    useEffect(() => {
        CargarDatosResultado();
    }, []);

    const CargarDatosResultado = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/resultado/${id_resultado}`);
            setResultado(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://144.126.210.74:8080/api/resultado/${id_resultado}`);
            setShowSuccessModal(true);
        } catch (error) {
            console.log(error);
            if (error.response) {
                setErrorMessage("No es posible eliminar este Resultado, es parte de una Gestión.");
                setShowErrorModal(true);
            }
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
            <h1>Eliminar Resultado</h1>
            <hr />
            <div className="card">
                <div className="card-header">Datos De Resultado a eliminar</div>
                <div className="card-body">
                    <h2>¿Desea Eliminar Este Resultado?</h2>
                    <h3>Nombre Resultado: {resultado && resultado.nombre_resultado}</h3>
                    <h3>ID Resultado: {resultado.id_resultado}</h3>
                    <button className="btn btn-danger" onClick={onSubmit}>Eliminar Resultado</button>
                    <button className="btn btn-secondary" onClick={() => navigate("/resultados")}>Cancelar</button>
                </div>
            </div>

            <ModalValidacion
                show={showSuccessModal}
                title="Resultado Eliminado"
                body="El resultado ha sido eliminado exitosamente."
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
