import '../components/Header.scss'
import { useTranslation } from "react-i18next";
import Logo from '../assets/images/princi1.jpg';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {

    const [t, i18n] = useTranslation("global");
    const { usuarioActual, setUsuarioActual } = useContext(UserContext);
    let navigate = useNavigate();

    const signOPut = () => {
        setUsuarioActual(null);
        navigate("/");
    }

    return (
        <div className="navbar bg-transparent absolute  z-10">
            <div className="flex-1">
                <Link to={"/"}> <img src={Logo} alt="no esta" width={60} /></Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 flex items-center">
                    <li className='menuItems'><button onClick={() => i18n.changeLanguage("en")}><img src="https://cdn-icons-png.flaticon.com/512/197/197374.png" alt="Englis" width={20} /></button></li>
                    <li className='menuItems'><button onClick={() => i18n.changeLanguage("es")}><img src="https://cdn-icons-png.flaticon.com/512/323/323365.png" alt="Englis" width={20} /></button></li>
                    {/* <li className='menuItems'><button><img src="https://cdn-icons-png.flaticon.com/512/197/197517.png" alt="Englis" width={20} /></button></li> */}
                    {usuarioActual !== null ?
                        <>
                            <li className='menuItems'>
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Tailwind CSS Navbar component" src={usuarioActual.usuario.fotoPerfil} />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52  mt-32">

                                        <li><b>{usuarioActual.usuario.nombre}</b></li>
                                        <li> <Link to={"/usuario"}><a>{t("alerts.comprea")}</a></Link></li>
                                        <li><a onClick={signOPut}>Logout</a></li>
                                    </ul>
                                </div>
                            </li>
                        </>
                        : <p>   </p>}

                </ul>
            </div>
        </div>
    )
}