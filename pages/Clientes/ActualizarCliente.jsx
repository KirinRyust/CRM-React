import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ModalValidacion } from "../../components/Modal/Modal";

export function ActualizarCliente() {
    const [idcliente, setIdCliente] = useState("");
    const [dv, setDv] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    let { id_cliente } = useParams();

    useEffect(() => {
        cargarDatosCliente();
    }, []);

    const cargarDatosCliente = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/cliente/${id_cliente}`);
            const cliente = response.data[0];

            setIdCliente(cliente.id_cliente);
            setDv(cliente.dv);
            setNombres(cliente.nombres);
            setApellidos(cliente.apellidos);
            setEmail(cliente.email);
            setCelular(cliente.celular);
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!nombres || !apellidos || !email || !celular) {
            setErrorMessage("Todos los campos son obligatorios.");
            setShowErrorModal(true);
            return;
        }

        try {
            const cliente = {
                nombres,
                apellidos,
                email,
                celular
            };
            await axios.patch(`http://144.126.210.74:8080/api/cliente/${id_cliente}`, cliente);
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage("Ocurrió un error al actualizar el cliente. Por favor, inténtalo nuevamente.");
            setShowErrorModal(true);
            console.log(error);
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
            <h1>Actualizar cliente</h1>
            <hr />
            <div className="card">
                <div className="card-header">Ingrese los datos solicitados</div>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>RUT</label>
                            <input type="text" className="form-control" value={idcliente} disabled />
                        </div>
                        <div className="form-group">
                            <label>DV</label>
                            <input type="text" className="form-control" value={dv} disabled />
                        </div>
                        <div className="form-group">
                            <label>Nombres</label>
                            <input type="text" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Apellidos</label>
                            <input type="text" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Celular</label>
                            <input type="text" className="form-control" value={celular} onChange={(e) => setCelular(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Actualizar cliente</button>
                        <Link to={`/clientes`} className="btn btn-secondary">Cancelar</Link>
                    </form>
                </div>
            </div>

            <ModalValidacion
                show={showSuccessModal}
                title="Cliente Actualizado"
                body="El cliente ha sido actualizado exitosamente."
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
                confirmText="Cerrar"
                confirmButtonClass="btn-secondary"
            />
            </div>
    )
}
