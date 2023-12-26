import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { UseMovieInfo } from "../hooks/UseMovieInfo";
import '../components/Usuario.scss';
import { useTranslation } from "react-i18next";

export default function Usuario() {
    const { usuarioActual, setUsuarioActual } = useContext(UserContext);
    const [t] = useTranslation("global");
    const [nombres, setNombres] = useState([])
    const [arraySinRepeticiones, searraySinRepeticiones] = useState([])
    const [conteo, setConteo] = useState([])
    const { getMovieInfo, filmMovie } = UseMovieInfo();
    useEffect(() => {
        setNombres(usuarioActual.usuario.entradasPelis);
    }, [])

    useEffect(() => {
        const arraySinRepeticiones = [...new Set(nombres)];
        searraySinRepeticiones(arraySinRepeticiones);
        const conteoRepeticiones = nombres.reduce((contador, nombre) => {
            contador[nombre] = (contador[nombre] || 0) + 1;
            return contador;
        }, {});
        const cantidadesRepeticiones = Object.values(conteoRepeticiones);
        setConteo(cantidadesRepeticiones);
    }, [nombres])

    useEffect(() => {
        getMovieInfo(arraySinRepeticiones);
    }, [arraySinRepeticiones, conteo])


    return (<>
        {usuarioActual !== null ?
            <div className="perfilPrincipal">
                <div className="flex flex-col  lg:flex-row items-center justify-center lg:justify-start perfilPrincipal__boxUsuario">
                    <img
                        className="w-40 h-40 lg:w-56 lg:h-56 rounded-full object-cover"
                        src={usuarioActual.usuario.fotoPerfil}
                        alt="foto de perfil"
                    />
                    <div className="lg:ml-4 mt-4 lg:mt-0 lg:self-start">
                        <p className="text-sm lg:text-base">@{usuarioActual.usuario.username}</p>
                        <h1 className="text-lg lg:text-2xl font-bold">{usuarioActual.usuario.nombre}</h1>
                        <p className="text-sm lg:text-base pt-2 titulo">{t("alerts.comprasRealizadas")}:</p>
                        <div className="posters flex flex-row gap-4">
                            {filmMovie.length != 0 ?
                                filmMovie.map((entrada, i) => (
                                    <div className="entradas">
                                        <img className="imgpelis" key={i} src={entrada.poster} alt="poster de palis" width={60} height={100} />
                                        <p key={i + 10} className="cuentaEntradas" >x{conteo[i]}</p>
                                    </div>
                                ))
                                : <p className="siNoCompras">Ninguna!!</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
            : <h1>Ups??</h1>}

    </>
    )
}