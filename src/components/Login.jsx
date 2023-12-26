import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Logo from '../assets/images/princi1.jpg';
import { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import { Link } from "react-router-dom";
import '../components/Login.scss'

export default function Login() {
    const [t] = useTranslation("global");
    const [estilo, setEstilo] = useState("errorDefault");
    let navigate = useNavigate();
    const { usuarioActual, setUsuarioActual } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const user = { username, password }


        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (!response.ok) {
                    setEstilo("errorActive");
                    e.target.username.value = "";
                    e.target.password.value = "";
                    throw new Error('La solicitud falló con estado ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                setUsuarioActual(data);
                if (data.usuario.username !== "admin") {
                    navigate("/");
                } else {
                    navigate("/admin");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className='principalLogin'>
            <div className='box'>
                <span className='borderline'></span>
                <form onSubmit={handleSubmit} >
                    <h2>{t("login.login")}</h2>
                    <div className='inputBox'>
                        <input type="text" name='username' required />
                        <span>{t("login.username")}</span>
                        <i></i>
                    </div>
                    <div className='inputBox'>
                        <input type="password" name='password' required />
                        <span>{t("login.password")}</span>
                        <i></i>
                    </div>
                    <p className={estilo}>{t("login.no-valid")}</p>
                    <div className='links'>
                        <a href=""><Link to={"/crearUsuario"} >{t("login.create")}</Link></a>
                    </div>
                    <input type="submit" value={t("login.login")} />

                </form>
            </div>
        </div>
    )
}