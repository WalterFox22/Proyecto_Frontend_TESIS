
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import  { AuthProvider } from './context/AuthProvider';
import Auth from './layout/Auth';
import Register from './pages/parent/Register';

import { PrivateRoute } from './routes/PrivateRoutes';
import Dashboard from './layout/Dashboard';
import RecuperarContraseña from './pages/RecuperarContraseña';
import Perfil from './componets/Perfil/Perfil';
import RegistroConductor from './pages/admin/RegistroConductor';
import ListarCondutor from './pages/admin/ListarConductor';
import ActualizarConductor from './pages/admin/ActualizarConductor';
import Error404 from './componets/Error/Error404';
import Start from './pages/Start';



function App(){


  return(
    <>
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          
          <Route index element={<Start />} />
          <Route path='/' element={<Auth/>}>
            <Route path='categoria' element={<Start/>}/>

            <Route path="login" element={<Login />} />
            
            {/** 
            <Route path='registro/representantes' element={<Register/>}/>
            */}

            <Route path='recuperacion/contrasenia' element = {<RecuperarContraseña/>}/>

          

            <Route path='*' element={<Error404/>}/>
          </Route>

          <Route path='dashboard/*' element={
            <PrivateRoute>
              <Routes>
                <Route element={<Dashboard/>}>
                  <Route index element={<Perfil/>}/>

                  <Route path='registro/conductores' element={<RegistroConductor/>}/>
                  <Route path='listar/conductores' element ={<ListarCondutor/>}/>
                  <Route path='buscar/conductor/ruta/:rutaAsignada' element={<ActualizarConductor/>}/>

            
                </Route>
                <Route path='*' element={<Error404/>}/>

              </Routes>
            </PrivateRoute>
          }/>

              

          
            







        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App;