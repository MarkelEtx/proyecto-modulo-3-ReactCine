export const searchFilms = async (url) => {
    try {
        let res = await fetch(url);
        let data = await res.json();
        return data;
    } catch (error) {
        return new Error(error);
    }
}
//basicamnete hace un fetch hasta el primer then