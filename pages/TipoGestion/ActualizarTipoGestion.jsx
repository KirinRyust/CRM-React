import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ModalValidacion } from "../../components/Modal/Modal";

export function ActualizarTipoGestion() {
    const [idtipogestion, setIdTipoGestion] = useState("");
    const [nombre_tipo_gestion, setNombreTipoGestion] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    let { id_tipo_gestion } = useParams();

    useEffect(() => {
        cargarDatosTipoGestion();
    }, []);

    const cargarDatosTipoGestion = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/tipo_gestion/${id_tipo_gestion}`);
            const tipogestion = response.data[0];

            setIdTipoGestion(tipogestion.id_tipo_gestion);
            setNombreTipoGestion(tipogestion.nombre_tipo_gestion);
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!nombre_tipo_gestion) {
            setErrorMessage("El nombre del tipo de gestión es obligatorio.");
            setShowErrorModal(true);
            return;
        }
        try {
            const tipogestion = {
                nombre_tipo_gestion
            };
            await axios.patch(`http://144.126.210.74:8080/api/tipo_gestion/${id_tipo_gestion}`, tipogestion);
            setShowSuccessModal(true);
        } catch (error) {
            console.log(error);
            setErrorMessage("Error al actualizar el tipo de gestión.");
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
            <h1>Actualizar Tipo Gestión</h1>
            <hr />
            <div className="card">
                <div className="card-header">Ingrese los datos solicitados</div>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>ID Tipo Gestión</label>
                            <input type="text" className="form-control" value={idtipogestion} disabled />
                        </div>
                        <div className="form-group">
                            <label>Nombre Tipo Gestión</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nombre_tipo_gestion}
                                onChange={(e) => setNombreTipoGestion(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Actualizar Tipo Gestión</button>
                        <Link to={`/tipogestion`} className="btn btn-secondary">Cancelar</Link>
                    </form>
                </div>
            </div>

            <ModalValidacion
                show={showSuccessModal}
                title="Tipo Gestión Actualizado"
                body="El tipo de gestión ha sido actualizado exitosamente."
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
