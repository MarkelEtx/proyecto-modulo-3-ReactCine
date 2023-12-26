import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useFilms } from '../hooks/useFilms';
import '../components/EditModal.scss';
import { useTranslation } from "react-i18next";
export default function EditModal({ isOpen, onClose }) {
    const [t, i18n] = useTranslation("global");
    const { foundFilms, getFoundFilms } = useFilms();
    const valoresIniciales = {
        titulo: "",
        poster: "",
        fecha: "",
        butacas: 30,
        duracion: 0,
        sinopsis: "",
        genero: "",
        trailer: "",
        disponible: "false"
    }
    const [formValues, setFormValues] = useState(valoresIniciales);



    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Valores enviados:', formValues);
        fetch('http://localhost:3000/films/crearPeli', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        })
            .then(response => {

                return response.json();
            })
            .then(data => {
                alert(data.message);
                onClose();
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value, });
    };
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Edital Peli">
                <button className='btn' type='button' onClick={onClose}>Cerrar</button>
                <div className="contenedor">
                    <div className="columna">
                        <h2 className="peliculaPrincipal__cuerpo__caracteristicas__titulo">{t("admin.titulo")}:</h2>
                        <input type="text" name="titulo" value={formValues.titulo} onChange={handleInputChange} />
                        <h2 className="peliculaPrincipal__cuerpo__caracteristicas__titulo">{t("admin.fecha")}:</h2>
                        <input type="text" name="fecha" value={formValues.fecha} onChange={handleInputChange} />
                        <h2 className="peliculaPrincipal__cuerpo__caracteristicas__titulo">{t("admin.duracion")}:</h2>
                        <input type="text" name="duracion" value={formValues.duracion} onChange={handleInputChange} />
                        <h2 className="peliculaPrincipal__cuerpo__caracteristicas__titulo">{t("admin.butacas")}:</h2>
                        <input type="text" name="butacas" value={formValues.butacas} onChange={handleInputChange} />
                        <h2 className="peliculaPrincipal__cuerpo__caracteristicas__titulo">{t("admin.genero")}:</h2>
                        <input type="text" name="genero" value={formValues.genero} onChange={handleInputChange} />
                    </div>
                    <div className="columna">
                        <h2 className="peliculaPrincipal__cuerpo__caracteristicas__titulo">{t("admin.trailer")}:</h2>
                        <input type="text" name="trailer" value={formValues.trailer} onChange={handleInputChange} />
                        <h2 className="peliculaPrincipal__cuerpo__caracteristicas__titulo">{t("admin.poster")}:</h2>
                        <input type="text" name="poster" value={formValues.poster} onChange={handleInputChange} />
                        <h2 className="peliculaPrincipal__cuerpo__caracteristicas__titulo">{t("admin.disponible")}:</h2>
                        <input type="text" name="disponible" value={formValues.disponible} onChange={handleInputChange} />
                        <h2 className="peliculaPrincipal__cuerpo__caracteristicas__titulo">{t("admin.sinopsis")}:</h2>
                        <textarea type="text" name="sinopsis" value={formValues.sinopsis} onChange={handleInputChange} />
                    </div>
                </div>
                <input className='crearPeli' type="submit" value={t("crearPeli.crear")} onClick={handleSubmit} />
            </Modal >
        </>
    )
}