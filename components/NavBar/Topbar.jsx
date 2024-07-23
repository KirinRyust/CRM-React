import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export function TopBar(){
  return(
      <div className="container">
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">CRM</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="/clientes">Clientes</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/usuarios">Usuarios</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/tipogestion">Tipos de gestion</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/resultados">Resultado</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/gestiones">Gestion</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
      </div>
  )
}