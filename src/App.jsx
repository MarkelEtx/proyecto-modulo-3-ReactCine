
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Header from './components/Header'
import Pelicula from './components/Pelicula'
import Login from './components/Login'
import UserContext from './context/UserContext'
import { useState } from 'react'
import Cine from './components/Cine'
import CreateCount from './components/CrearCuenta'
import Administrador from './components/Administrador'
import Usuario from './components/Usuario'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [usuarioActual, setUsuarioActual] = useState(null);

  return (
    <>
      <UserContext.Provider value={{ usuarioActual, setUsuarioActual }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Cine />}></Route>
            <Route path='/pelicula/:peli' element={<Pelicula />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/crearUsuario' element={<CreateCount />}></Route>
            <Route path='/admin' element={<Administrador />}></Route>
            <Route path='/usuario' element={<Usuario />}></Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App
