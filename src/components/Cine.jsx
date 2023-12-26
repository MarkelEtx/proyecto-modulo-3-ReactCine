import { useEffect, useState } from "react"
import '../components/cine.scss'
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFilms } from "../hooks/useFilms";
import robert from '../assets/images/RDJ.jpg';
import paul from '../assets/images/PW.jpg';
import emily from '../assets/images/EB.jpg';
import vanessa from '../assets/images/VK.jpg';
import jim from '../assets/images/JC.jpg';
import emilia from '../assets/images/EC.jpg';
import natalie from '../assets/images/NP.jpg';

export default function Cine() {
    const [t, i18n] = useTranslation("global");
    const [posters, setPosters] = useState([]);
    const [randomImage, setRandomImage] = useState('');
    const { foundFilms, getFoundFilms } = useFilms();

    useEffect(() => {
        getFoundFilms("http://localhost:3000/films");
    }, [])

    useEffect(() => {
        const postersArray = foundFilms.map(item => item.poster);
        setPosters(postersArray);
    }, [foundFilms])

    useEffect(() => {
        const getRandomImage = () => {
            const randomIndex = Math.floor(Math.random() * posters.length);
            return posters[randomIndex];
        };
        const randomImg = getRandomImage();
        setRandomImage(randomImg);
    }, [posters])

    return (
        <div className="principal">
            <div className="cine">
                <video autoPlay loop muted className="cine__video">
                    <source src="https://ifnawards.com/Venice.mp4" type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                </video>
                <div className="cine__text">
                    <p className="cine__text__textPeq">{t("cine.welcome-to")}</p>
                    <p className="cine__text__textPri">Central Cinema</p>
                </div>
                <div className="cine__bottom">
                    <div className="cine__bottom__button">
                        <a href="#pelis"> <button className="btn w-56">{t("cine.watch-films")}</button></a>
                        <Link to={"/login"} ><button className="btn w-56">Login</button></Link>

                    </div>
                    <div className="cine__bottom__image">
                        {foundFilms !== null ?
                            <>
                                {randomImage !== null ? <img src={randomImage} className="imagen" alt="poster" /> : <p>cargando</p>}
                            </>
                            :
                            <h1>no hay</h1>
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row actores">
                <div className="flex flex-col lg:flex-row galeriaActores">
                    <div className="lg:w-6/12 lg:ml-4">
                        <p className="textoDestacado">¡"Donde cada <span className="destacado">escena</span> es un nuevo <span className="destacado">protagonista,</span> y cada <span className="destacado">actor,</span> un mundo por descubrir"!</p>
                    </div>
                    <section className="lg:w-6/12 lg:mr-4 galeriaImg">


                        <img src={robert} alt="Actor Foto" />
                        <img src={paul} alt="Actor Foto" />
                        <img src={emily} alt="Actor Foto" />
                        <img src={vanessa} alt="Actor Foto" />
                        <img src={jim} alt="Actor Foto" />
                        <img src={emilia} alt="Actor Foto" />
                        <img src={natalie} alt="Actor Foto" />
                    </section>

                    {/* Este div estará debajo del texto en pantallas más pequeñas */}
                </div>
            </div>

            <div className="pelis" id="pelis">
                <h2 className="pelis__titulo">~{t("cine.films")}~</h2>
                <div className="pelis__cartelera">
                    <>
                        {foundFilms !== null ?
                            foundFilms.map((peli, i) => (
                                <div key={i} className="pelis__cartelera__lista">
                                    <div key={i} className="pelis__cartelera__lista__contenedor">
                                        <Link to={`pelicula/${peli.titulo}`}><img src={peli.poster} className="pelis__cartelera__lista__contenedor__img" alt="Imagen" /></Link>
                                        <div className="pelis__cartelera__lista__contenedor__texto">
                                            {peli.titulo}
                                        </div>
                                    </div>
                                </div>
                            ))
                            : <p>cargando</p>}
                    </>
                </div>

            </div>
        </div>
    )
}