import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export function Resultado(){
    const [resultado,setResultado]=useState([]);
    useEffect(
        ()=>{
            const fetchResultado = async () => {
                try {
                    const response = await axios.get('http://144.126.210.74:8080/api/resultado?_size=500');
                    setResultado(response.data);
                } catch (error) {
                    console.log(error);
                }
            };fetchResultado();
        },[]);
    return(
        <div className="container">
            <h1>Lista de Resultados</h1>
            <hr />
            <a href="/resultados/crear" className="btn btn-primary">Crear Resultado</a>
            <a href="/" className="btn btn-secondary">HomePage</a>
            <table className="table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nombre Resultado</th>
                    <th>Fecha Registro</th>
                    <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {resultado.map((resultado) => (
                        <tr key={resultado.id_resultado}>
                            
                            <td>{resultado.id_resultado}</td>
                            <td>{resultado.nombre_resultado}</td>
                            <td>{resultado.fecha_registro}</td>
                            <td>
                                <Link to={`/resultados/actualizar/${resultado.id_resultado}`}className="btn btn-warning">Actualizar</Link>
                                <Link to={`/resultados/eliminar/${resultado.id_resultado}`}className="btn btn-danger">Eliminar</Link>
                            </td>
                        </tr>
                    ) )}
                </tbody>
            </table>
        </div>
    )
}