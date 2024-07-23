import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ModalValidacion } from "../../components/Modal/Modal";

export function ActualizarGestion() {
    const [idgestion, setIdGestion] = useState("");
    const [comentarios, setComentarios] = useState("");

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    let { id_gestion } = useParams();

    useEffect(() => {
        cargarDatosGestion();
    }, []);

    const cargarDatosGestion = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/gestion/${id_gestion}`);
            const gestion = response.data[0];

            setIdGestion(gestion.id_gestion);
            setComentarios(gestion.comentarios);
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!comentarios) {
            setErrorMessage("El campo de comentarios no puede estar vacío.");
            setShowErrorModal(true);
            return;
        }

        try {
            const gestion = { comentarios };
            await axios.patch(`http://144.126.210.74:8080/api/gestion/${id_gestion}`, gestion);
            setShowSuccessModal(true);
        } catch (error) {
            console.log(error);
            setErrorMessage("Ocurrió un error al actualizar la gestión. Inténtelo de nuevo.");
            setShowErrorModal(true);
        }
    }

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        navigate("/gestiones");
    };

    const handleErrorModalClose = () => {
        setShowErrorModal(false);
    };

    return (
        <div className="container">
            <h1>Actualizar Gestión</h1>
            <hr />
            <div className="card">
                <div className="card-header">Ingrese los datos solicitados</div>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>ID Gestión</label>
                            <input type="text" className="form-control" value={idgestion} disabled />
                        </div>
                        <div className="form-group">
                            <label>Comentarios</label>
                            <input
                                type="text"
                                className="form-control"
                                value={comentarios}
                                onChange={(e) => setComentarios(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Actualizar Gestión</button>
                        <Link to={`/gestiones`} className="btn btn-secondary">Cancelar</Link>
                    </form>
                </div>
            </div>

            <ModalValidacion
                show={showSuccessModal}
                title="Gestión Actualizada"
                body="La gestión ha sido actualizada exitosamente."
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
