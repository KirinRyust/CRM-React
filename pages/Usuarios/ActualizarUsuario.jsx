import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ModalValidacion } from "../../components/Modal/Modal";

export function ActualizarUsuario() {
    const [idusuario, setIdUsuario] = useState("");
    const [dv, setDv] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    let { id_usuario } = useParams();

    useEffect(() => {
        cargarDatosUsuario();
    }, []);

    const cargarDatosUsuario = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/usuario/${id_usuario}`);
            const usuario = response.data[0];

            setIdUsuario(usuario.id_usuario);
            setDv(usuario.dv);
            setNombres(usuario.nombres);
            setApellidos(usuario.apellidos);
            setEmail(usuario.email);
            setCelular(usuario.celular);
            setUsername(usuario.username);
            setPassword(usuario.password);
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!nombres || !apellidos || !email || !celular || !username || !password) {
            setErrorMessage("Todos los campos son obligatorios.");
            setShowErrorModal(true);
            return;
        }
        try {
            const usuario = {
                nombres,
                apellidos,
                email,
                celular,
                username,
                password
            };
            await axios.patch(`http://144.126.210.74:8080/api/usuario/${id_usuario}`, usuario);
            setShowSuccessModal(true);
            setTimeout(() => {
                navigate("/usuarios");
            }, 1500); // Redirige después de 1.5 segundos para permitir ver el modal
        } catch (error) {
            console.log(error);
            setErrorMessage("Error al actualizar el usuario.");
            setShowErrorModal(true);
        }
    }

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        navigate("/usuarios");
    }

    const handleErrorModalClose = () => {
        setShowErrorModal(false);
    }

    return (
        <div className="container">
            <h1>Actualizar usuario</h1>
            <hr></hr>
            <div className="card">
                <div className="card-header">Ingrese los datos solicitados</div>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>RUT</label>
                            <input type="text" className="form-control" value={idusuario} disabled></input>
                        </div>
                        <div className="form-group">
                            <label>DV</label>
                            <input type="text" className="form-control" value={dv} disabled></input>
                        </div>
                        <div className="form-group">
                            <label>Nombres</label>
                            <input type="text" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label>Apellidos</label>
                            <input type="text" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label>Celular</label>
                            <input type="text" className="form-control" value={celular} onChange={(e) => setCelular(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type={showPassword ? "text" : "password"} className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} >
                            </input>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="showPassword" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
                                <label className="form-check-label" htmlFor="showPassword"> Mostrar contraseña </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Actualizar usuario</button>
                        <Link to={`/usuarios`} className="btn btn-secondary">Cancelar</Link>
                    </form>
                </div>
            </div>

            <ModalValidacion
                show={showSuccessModal}
                title="Usuario Actualizado"
                body="El usuario ha sido actualizado exitosamente."
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
