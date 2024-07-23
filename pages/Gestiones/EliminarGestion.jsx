import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ModalValidacion } from "../../components/Modal/Modal";

export function EliminarGestion() {
    const navigate = useNavigate();
    const [gestion, setGestion] = useState({});
    const [error, setError] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    let { id_gestion } = useParams();

    useEffect(() => {
        cargarDatosGestion();
    }, []);

    const cargarDatosGestion = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/gestion/${id_gestion}`);
            setGestion(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://144.126.210.74:8080/api/gestion/${id_gestion}`);
            navigate("/gestiones");
        } catch (error) {
            console.log(error);
            setError("No se ha podido eliminar la gestión");
            setShowErrorModal(true);
        }
    }

    const handleConfirmDelete = () => {
        setShowConfirmModal(true);
    }

    const handleConfirmModalClose = (confirm) => {
        setShowConfirmModal(false);
        if (confirm) {
            handleDelete();
        }
    };

    const handleErrorModalClose = () => {
        setShowErrorModal(false);
    };

    return (
        <div className="container">
            <h1>Eliminar Gestión</h1>
            <hr />
            <div className="card">
                <div className="card-header">Datos De la Gestión a eliminar</div>
                <div className="card-body">
                    <h2>¿Desea Eliminar Esta Gestión?</h2>
                    <h3>ID Gestión: {gestion.id_gestion}</h3>
                    <h3>Comentario Gestión: {gestion.comentarios}</h3>
                    <button className="btn btn-danger" onClick={handleConfirmDelete}>Eliminar Gestión</button>
                    <a href="/gestiones" className="btn btn-secondary">Cancelar</a>
                </div>
            </div>

            <ModalValidacion
                show={showConfirmModal}
                title="Confirmación de Eliminación"
                body="¿Está seguro de que desea eliminar esta gestión? Esta acción no se puede deshacer."
                onClose={() => handleConfirmModalClose(false)}
                onConfirm={() => handleConfirmModalClose(true)}
                confirmText="Eliminar"
                confirmButtonClass="btn-danger"
                cancelText="Cancelar"
                cancelButtonClass="btn-secondary"
            />

            <ModalValidacion
                show={showErrorModal}
                title="Error"
                body={error}
                onClose={handleErrorModalClose}
                onConfirm={handleErrorModalClose}
                confirmText="Cerrar"
                confirmButtonClass="btn-danger"
            />
        </div>
    )
}
