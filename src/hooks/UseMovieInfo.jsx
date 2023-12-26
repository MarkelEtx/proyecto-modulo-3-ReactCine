import { useCallback, useState } from "react"
import { searchFilms } from "../service/Films";

export const UseMovieInfo = () => {
    const [filmMovie, setFilmMovie] = useState([]);
    const getMovieInfo = useCallback(async (filmes) => {
        try {
            let tempArray = await Promise.all(
                filmes.map(async (fil) => {
                    return await searchFilms(`http://localhost:3000/films/pelicula/${fil}`)
                })
            )
            setFilmMovie(tempArray);
        } catch (error) {

        }
    })
    return { getMovieInfo, filmMovie };
}