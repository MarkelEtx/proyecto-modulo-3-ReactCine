import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useFilms } from "../hooks/useFilms";
import UserContext from "../context/UserContext";
import '../components/Pelicula.scss';
import { useTranslation } from "react-i18next";

export default function Pelicula() {
    const { peli } = useParams();
    const [t, i18n] = useTranslation("global");
    const [film, setFilm] = useState(null);
    const { foundFilms, getFoundFilms } = useFilms();//ejecuta getFound film y sus datos estan en foundfilm
    const { usuarioActual, setUsuarioActual } = useContext(UserContext);
    const otherElementRef = useRef(null);
    useEffect(() => {
        getFoundFilms(`http://localhost:3000/films/pelicula/${peli}`)

    }, [])
    useEffect(() => {
        getFoundFilms(`http://localhost:3000/films/pelicula/${peli}`)
    }, [foundFilms])


    const comprarEntrada = () => {
        if (usuarioActual) {
            let entrada = {
                usuario: usuarioActual.usuario.username,
                titulo: foundFilms.titulo
            }
            fetch(`http://localhost:3000/users/comprarEntrada`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${usuarioActual.access_token}`
                },
                body: JSON.stringify(entrada)
            })
                .then(response => {
                    if (!response.ok) {
                        alert("Te tienes que loguear");
                        throw new Error('La solicitud falló con estado ' + response.status);
                    } else {
                        alert("Compra Realizada");
                        return response.json();
                    }
                })
                .then(data => {
                    console.log('Respuesta del servidor:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            alert("Logueate para comprar")
        }

    }


    return (<>
        {foundFilms !== null ?
            <div className="peliculaPrincipal">

                <p className="peliculaPrincipal__titulo" ref={otherElementRef}>{foundFilms.titulo}</p>
                <div className="flex flex-col lg:flex-row  mx-6 peliculaPrincipal__cuerpo">
                    <div className="lg:w-5/12 flex justify-center">
                        <img src={foundFilms.poster} alt="poster" />
                    </div>
                    <div className=" lg:pl-8 mt-4 lg:mt-0 lg:w-7/12 flex flex-col peliculaPrincipal__cuerpo__caracteristicas">
                        <h2 className="peliculaPrincipal__cuerpo__caracteristicas__titulo">{t("admin.fecha")}:</h2>
                        <p>{foundFilms.fecha}</p>
                        <h2 className="peliculaPrincipal__cuerpo__caracteristicas__titulo">{t("admin.butacas")}:</h2>
                        <p>{foundFilms.butacas}</p>
                        <h2 className="peliculaPrincipal__cuerpo__caracteristicas__titulo">{t("admin.duracion")}:</h2>
                        <p>{foundFilms.duracion}</p>
                        <h2 className="peliculaPrincipal__cuerpo__caracteristicas__titulo">{t("admin.genero")}:</h2>
                        <p>{foundFilms.genero}</p>
                        <h2 className="peliculaPrincipal__cuerpo__caracteristicas__titulo">{t("admin.sinopsis")}:</h2>
                        <p>{foundFilms.sinopsis}</p>
                        <button className="btn bg-red-800 peliculaPrincipal__cuerpo__caracteristicas__comprarButton" onClick={comprarEntrada}>{t("admin.comprar")}</button>

                        <iframe width="auto" height="300" src={foundFilms.trailer + "/?iframe=true&nofocus=y"} aria-hidden="true" title="LOS ASESINOS DE LA LUNA | Tráiler | Paramount Pictures Spain" ></iframe>
                    </div>
                </div>
            </div> : <p>hola</p>}
    </>
    )
}