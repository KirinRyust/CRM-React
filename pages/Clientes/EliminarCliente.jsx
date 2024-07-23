import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {ModalValidacion} from "../../components/Modal/Modal";

export function EliminarCliente() {
    const navigate = useNavigate();
    const [cliente, setCliente] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    let { id_cliente } = useParams();

    useEffect(() => {
        CargarDatosCliente();
    }, []);

    const CargarDatosCliente = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/cliente/${id_cliente}`);
            setCliente(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://144.126.210.74:8080/api/cliente/${id_cliente}`)
            setShowSuccessModal(true);
        } catch (error) {
            console.log(error);
            setErrorMessage("No es posible eliminar. Cliente está siendo utilizado en una gestion.");
            setShowErrorModal(true);
        }
    }

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        navigate("/clientes");
    }

    const handleErrorModalClose = () => {
        setShowErrorModal(false);
    }

    return (
        <div className="container">
            <h1>Eliminar Cliente</h1>
            <hr />
            <div className="card">
                <div className="card-header">Datos Del cliente a eliminar</div>
                <div className="card-body">
                    <h2>¿Desea Eliminar Al Cliente?</h2>
                    <h3> Nombre del cliente: {cliente && cliente.nombres} {cliente.apellidos}</h3>
                    <h3>Rut Cliente: {cliente.id_cliente}</h3>
                    <button className="btn btn-danger" onClick={onSubmit}>Eliminar Cliente</button>
                    <a href="/clientes" className="btn btn-secondary">Cancelar</a>
                </div>
            </div>

            <ModalValidacion
                show={showSuccessModal}
                title="Cliente Eliminado"
                body="El cliente ha sido eliminado exitosamente."
                onClose={handleSuccessModalClose}
                onConfirm={handleSuccessModalClose}
                confirmText="OK"
            />

            <ModalValidacion
                show={showErrorModal}
                title="Error"
                body={errorMessage}
                onClose={handleErrorModalClose}
                onConfirm={handleErrorModalClose}
                confirmButtonClass="btn-secondary"
            />
        </div>
    )
}
