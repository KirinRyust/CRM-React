import React from "react";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <div className="container text-center">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h1 className="my-4">Lista General CRM</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Tabla De Clientes</h5>
                            <p className="card-text">Ver todos los registros de Clientes ingresados.</p>
                            <Link to="/clientes" className="btn btn-primary">Ir a Clientes</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Tabla De Gestiones</h5>
                            <p className="card-text">Ver todos los registros de Gestiones ingresadas.</p>
                            <Link to="/gestiones" className="btn btn-primary">Ir a Gestiones</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Tabla De Resultados</h5>
                            <p className="card-text">Ver todos los registros de Resultados ingresados.</p>
                            <Link to="/resultados" className="btn btn-primary">Ir a Resultado</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Tabla De Tipo de Gestión</h5>
                            <p className="card-text">Ver todos los registros de Tipos de Gestiones ingresadas.</p>
                            <Link to="/tipogestion" className="btn btn-primary">Ir a Tipo de Gestión</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Tabla De Usuarios</h5>
                            <p className="card-text">Ver todos los registros de Usuarios Ingresados.</p>
                            <Link to="/usuarios" className="btn btn-primary">Ir a Usuarios</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
