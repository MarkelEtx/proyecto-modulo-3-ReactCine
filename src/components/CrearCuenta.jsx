import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Logo from '../assets/images/princi1.jpg';
import { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import '../components/CrearCuenta.scss'

export default function CreateCount() {
    const [t] = useTranslation("global");
    let navigate = useNavigate();
    const { usuarioActual, setUsuarioActual } = useContext(UserContext);
    const [mostrarModal, setMostrarModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const nombre = e.target.nombre.value;
        const fotoPerfil = e.target.fotoPerfil.value;
        const user = { username, password, nombre, fotoPerfil }


        fetch('http://localhost:3000/users/crearUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('El usuario ya existe' + response.status);
                } else {
                    alert("Usuario creado");
                    navigate("/");
                    console.log(response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                // setUsuarioActual(data.usuario);
                // if (data.usuario.username !== "admin") {
                //     navigate("/");
                // }
            })
            .catch(error => {
                setMostrarModal(true);
                console.error('Error:', error);
            });
    }

    return (
        <div className='principalCrearUsu'>
            <div className='boxCrearUsu'>
                <span className='borderlineCrearUsu'></span>
                <form onSubmit={handleSubmit} >
                    <h2>{t("crearUsu.login")}</h2>
                    <div className='inputBoxCrearUsu'>
                        <input type="text" name='username' required />
                        <span>{t("crearUsu.username")}</span>
                        <i></i>
                    </div>
                    <div className='inputBoxCrearUsu'>
                        <input type="password" name='password' required />
                        <span>{t("crearUsu.password")}</span>
                        <i></i>
                    </div>
                    <div className='inputBoxCrearUsu'>
                        <input type="text" name='nombre' required />
                        <span>{t("crearUsu.name")}</span>
                        <i></i>
                    </div>
                    <div className='inputBoxCrearUsu'>
                        <input type="text" name='fotoPerfil' required />
                        <span>{t("crearUsu.imagen")}</span>
                        <i></i>
                    </div>
                    <input type="submit" value={t("crearUsu.login")} />

                </form>
            </div>
        </div>
    )
}