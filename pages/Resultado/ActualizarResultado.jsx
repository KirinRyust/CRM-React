import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ModalValidacion } from "../../components/Modal/Modal";

export function ActualizarResultado() {
    const [idresultado, setIdResultado] = useState("");
    const [nombre_resultado, setNombreResultado] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    let { id_resultado } = useParams();

    useEffect(() => {
        cargarDatosResultado();
    }, []);

    const cargarDatosResultado = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/resultado/${id_resultado}`);
            const resultado = response.data[0];

            setIdResultado(resultado.id_resultado);
            setNombreResultado(resultado.nombre_resultado);
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!nombre_resultado) {
            setErrorMessage("El nombre del resultado es obligatorio.");
            setShowErrorModal(true);
            return;
        }
        try {
            const resultado = {
                nombre_resultado
            };
            await axios.patch(`http://144.126.210.74:8080/api/resultado/${id_resultado}`, resultado);
            setShowSuccessModal(true);
        } catch (error) {
            console.log(error);
            setErrorMessage("Error al actualizar el resultado.");
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
            <h1>Actualizar Resultado</h1>
            <hr />
            <div className="card">
                <div className="card-header">Ingrese los datos solicitados</div>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>ID Resultado</label>
                            <input type="text" className="form-control" value={idresultado} disabled></input>
                        </div>
                        <div className="form-group">
                            <label>Nombre Resultado</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nombre_resultado}
                                onChange={(e) => setNombreResultado(e.target.value)}
                            ></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Actualizar Resultado</button>
                        <Link to={`/resultados`} className="btn btn-secondary">Cancelar</Link>
                    </form>
                </div>
            </div>

            <ModalValidacion
                show={showSuccessModal}
                title="Resultado Actualizado"
                body="El resultado ha sido actualizado exitosamente."
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
