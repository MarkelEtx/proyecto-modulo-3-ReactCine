import { useCallback, useState } from "react";
import { searchFilms } from "../service/Films";

export const useFilms = () => {
    const [foundFilms, setFoundFilms] = useState([]);
    const getFoundFilms = useCallback(async (url) => {
        try {
            let film = "";
            film = await searchFilms(url);
            setFoundFilms(film);
        } catch (error) {
            throw new Error(error)
        }
    }, [])
    return { foundFilms, getFoundFilms };
}

//guardamos los resultados de el segundo fets usado en service en film