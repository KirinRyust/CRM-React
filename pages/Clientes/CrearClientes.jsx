import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ModalValidacion } from "../../components/Modal/Modal";


export function CrearCliente() {
    const [id_cliente, setIdCliente] = useState("");
    const [dv, setDv] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!id_cliente || !dv || !nombres || !apellidos || !email || !celular) {
            setErrorMessage("Todos los campos son obligatorios.");
            setShowErrorModal(true);
            return;
        }
        try {
            const fecha_registro = new Date().toISOString().slice(0, 19).replace('T', ' ');
            await axios.post('http://144.126.210.74:8080/api/cliente', {
                id_cliente,
                dv,
                nombres,
                apellidos,
                email,
                celular,
                fecha_registro
            });
            setShowSuccessModal(true);
        } catch (error) {
            console.log(error);
            setErrorMessage("Error al crear el cliente.");
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
            <h1>Creación De Clientes</h1>
            <hr />
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label> RUT </label>
                    <input type="text" className="form-control" value={id_cliente} onChange={(e) => setIdCliente(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> DV </label>
                    <input type="text" className="form-control" value={dv} onChange={(e) => setDv(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> Nombres </label>
                    <input type="text" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> Apellidos </label>
                    <input type="text" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> Email </label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> Celular </label>
                    <input type="number" className="form-control" value={celular} onChange={(e) => setCelular(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Crear Cliente</button>
                <a href="/clientes" className="btn btn-secondary">Cancelar</a>
            </form>

            <ModalValidacion
                show={showSuccessModal}
                title="Cliente Creado"
                body="El cliente ha sido creado exitosamente."
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
