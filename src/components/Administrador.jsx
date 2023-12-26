import React, { useContext, useEffect, useState } from 'react';
import { useFilms } from "../hooks/useFilms";
import '../components/Administrador.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import EditModal from './EditModal';
import { useTranslation } from "react-i18next";



export default function TablaComponent() {
    const [t, i18n] = useTranslation("global");
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [peliActual, setPeliActual] = useState(null);
    const { foundFilms, getFoundFilms } = useFilms();
    const { usuarioActual, setUsuarioActual } = useContext(UserContext);
    let navigate = useNavigate();
    let location = useLocation();
    const openModal = (peli) => {
        setIsOpenModal(true);
        setPeliActual(peli);
    }
    const closeModal = () => {
        setIsOpenModal(false);
    }
    useEffect(() => {
        getFoundFilms("http://localhost:3000/films/admin");
    }, [])
    useEffect(() => {
        if ((!usuarioActual || usuarioActual.usuario.username !== "admin") && location.pathname.includes("/admin")) {
            navigate("/");
        }
    }, [usuarioActual])

    useEffect(() => {
        getFoundFilms("http://localhost:3000/films/admin");
    }, [foundFilms])

    const filteredData = foundFilms.filter((item) =>
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleAvailable = (id) => {
        fetch(`http://localhost:3000/films/publicar/${id}`, {
            method: 'PUT'
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch(error => {
            });
    }

    return (
        <div className='adminPrincipal'>
            <div className="adminPrincipal__tabla">
                <input
                    type="text"
                    placeholder={t("admin.buscar")}
                    className="border border-gray-300 rounded-md p-2 mb-4"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => openModal()}>{t("admin.crear")}</button>

                <table className="min-w-full shadow-md rounded-lg overflow-hidden tabla">
                    <thead className='adminPrincipal__tabla__thead'>
                        <tr>
                            <th className=" px-4 py-2">#</th>
                            <th className=" px-4 py-2">{t("admin.titulo")}</th>
                            <th className=" px-4 py-2">{t("admin.poster")}</th>
                            <th className=" px-4 py-2 w-32">{t("admin.fecha")}</th>
                            <th className=" px-4 py-2">{t("admin.duracion")}</th>
                            <th className=" px-4 py-2">{t("admin.genero")}</th>
                            <th className=" px-4 py-2">{t("admin.butacas")}</th>
                            <th className=" px-4 py-2">{t("admin.publicar")}</th>
                            <th className=" px-4 py-2">{t("admin.eliminar")}</th>
                            {/* ... Aquí agregarías más columnas según tus datos */}
                        </tr>
                    </thead>
                    <tbody className='adminPrincipal__tabla__tbody'>
                        {filteredData.map((pelicula, index) => (
                            <tr key={index}>
                                <td className=" px-4 py-2">{index + 1}</td>
                                <td className=" px-4 py-2">{pelicula.titulo}</td>
                                <td className=" px-4 py-2"><img src={pelicula.poster} alt="poster pelicula" width={70} /></td>
                                <td className=" px-4 py-2">{pelicula.fecha}</td>
                                <td className=" px-4 py-2">{pelicula.duracion} min</td>
                                <td className=" px-4 py-2">{pelicula.genero}</td>
                                <td className=" px-4 py-2">{pelicula.butacas > 20 ? <div className='badge bg-lime-500 p-4 '><p className='font-bold'>{pelicula.butacas}</p></div> : pelicula.butacas > 10 ? <div className='badge bg-yellow-300 p-4 '><p className='font-bold'>{pelicula.butacas}</p></div> : <div className='badge bg-red-600 p-4 '><p className='font-bold'>{pelicula.butacas}</p></div>}</td>
                                <td className=" px-4 py-2"><button className='botonPublicar hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => handleAvailable(pelicula._id)}>{pelicula.disponible == true ? t("admin.quitar") : t("admin.publicar")}</button></td>

                                <td className=" px-4 py-2"><button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /> </svg></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div >
            <EditModal isOpen={isOpenModal} onClose={closeModal} className="custom-modal" />
        </div>
    );
};