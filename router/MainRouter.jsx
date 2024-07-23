import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TopBar } from "../components/NavBar/Topbar";
import { Home } from "../Home/MainScreen/MainScreen";
import { Clientes } from "../pages/Clientes/Clientes";
import { CrearCliente } from "../pages/Clientes/CrearClientes";
import { ActualizarCliente } from "../pages/Clientes/ActualizarCliente.jsx";
import { EliminarCliente } from "../pages/Clientes/EliminarCliente.jsx";
import { Usuarios } from "../pages/Usuarios/Usuarios";
import { ActualizarUsuario } from "../pages/Usuarios/ActualizarUsuario.jsx";
import { EliminarUsuario } from "../pages/Usuarios/EliminarUsuario.jsx";
import { CrearUsuario } from "../pages/Usuarios/CrearUsuarios";
import { TipoGestion } from "../pages/TipoGestion/TipoGestion";
import { CrearTipoGestion } from "../pages/TipoGestion/CrearTipoGestion";
import { Resultado } from "../pages/Resultado/Resultado";
import { CrearResultado } from "../pages/Resultado/CrearResultado";
import { Gestiones } from "../pages/Gestiones/Gestiones";
import { CrearGestion } from "../pages/Gestiones/CrearGestion.jsx";
import { EliminarGestion } from "../pages/Gestiones/EliminarGestion.jsx";
import { ActualizarGestion } from "../pages/Gestiones/ActualizarGestion.jsx";
import { EliminarTipoGestion } from "../pages/TipoGestion/EliminarTipoGestion.jsx";
import { EliminarResultado } from "../pages/Resultado/EliminarResultado.jsx";
import { ActualizarResultado } from "../pages/Resultado/ActualizarResultado.jsx";
import { ActualizarTipoGestion } from "../pages/TipoGestion/ActualizarTipoGestion.jsx";

export const MainRouter = () => {
    return (
        <BrowserRouter> 
        <TopBar/>
        <Routes>
            //siempre colocar las rutas debajo de la ruta principal
            <Route path="/" Component= { Home } />
            <Route path="/clientes" Component= { Clientes } />
            <Route path="/clientes/crear" Component= { CrearCliente } />
            <Route path="/clientes/actualizar/:id_cliente" Component= { ActualizarCliente } />
            <Route path="/clientes/eliminar/:id_cliente" Component= { EliminarCliente } />
            <Route path="/usuarios" Component= { Usuarios } />
            <Route path="/usuarios/crear" Component= { CrearUsuario } />
            <Route path="/usuarios/actualizar/:id_usuario" Component= { ActualizarUsuario } />
            <Route path="/usuarios/eliminar/:id_usuario" Component= { EliminarUsuario } />
            <Route path="/tipogestion" Component= { TipoGestion } />
            <Route path="/tipogestion/crear" Component= { CrearTipoGestion } />
            <Route path="/tipogestion/eliminar/:id_tipo_gestion" Component={EliminarTipoGestion}/>
            <Route path="/tipogestion/actualizar/:id_tipo_gestion" Component={ActualizarTipoGestion}/>
            <Route path="/resultados" Component= { Resultado } />
            <Route path="/resultados/crear" Component= { CrearResultado } />
            <Route path="/resultados/actualizar/:id_resultado" Component={ActualizarResultado}/>
            <Route path="/resultados/eliminar/:id_resultado" Component={EliminarResultado}/>
            <Route path="/gestiones" Component= { Gestiones } />
            <Route path="/gestiones/crear" Component= { CrearGestion } />
            <Route path="/gestiones/eliminar/:id_gestion" Component={EliminarGestion} />
            <Route path="/gestiones/actualizar/:id_gestion" Component={ActualizarGestion} />
        </Routes>
        </BrowserRouter>
    )
}