import axios from "axios";
import {onPopularMovies, onSelectedBanner} from '../store/slice';

const baseURL = 'https://api.themoviedb.org/3';
const tokenApi = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGZhNDhkYmQ2NmI2Yjc0OGJkOWMzZDgyYTBmMTNmZSIsInN1YiI6IjY0ZGQwNWVjMDAxYmJkMDQxYmY0N2E1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SvAt8zdk8dnAtFv-D5EU42qQ8h1-fTD9eSyf5UoQUbQ';

//Creamos la instancia de axios
const instanceAPI = axios.create({
    //Url api
    baseURL,
    //Pasamos el token
    headers: {
        accept: 'application/json',
        Authorization: tokenApi
    }
});

//Función para obtener el banner con el video
export const getBanner = (type = null) => {
    return async (dispatch, getState) => {

        //Declaramos la url de la petición
        let url, id;

        //Si no contiene ningun tipo lo hacemos al azar (para la primera vez)
        if (!type) {
            const typeBanner = ['Series', 'Películas'];
            const typeRandom = typeBanner[Math.floor(Math.random() * typeBanner.length)];

            type = typeRandom;
        }

        //Hacemos un switch, para hacer una acción o otra en función del tipo
        switch (type) {
            case 'Series':
                //Obtenemos el id de la serie mas popular
                id = await discoverSeriesBanner();
                //Creamos la url
                if (id) url = `/tv/${id}/videos`;

                break;
            case 'Películas':

                //Obtenemos el id de la pelicula mas popular
                id = await discoverMovieBanner();
                //Creamos la url
                if (id) url = `/movie/${id}/videos`;

                break;
        }

        try {
            //Extraemos información
            const {data} = await instanceAPI.get(url);

            //Filtramos por trailer serie/película
            const result = data.results.filter(
                (result) => {
                    return result.type === "Trailer"
                }
            );

            //En función si el trailer es de Youtube/Vimeo
            const url_video = (result[0].site === "YouTube")
                ? `https://www.youtube.com/embed/${result[0].key}`
                : `https://vimeo.com/${result[0].key}`

            //Creamos el objeto
            const objectResult = {
                id: data.id,
                id_video: result[0].id,
                key: result[0].key,
                site: result[0].site,
                url_video
            }

            //Disparamos la acción
            dispatch(onSelectedBanner(objectResult));

        } catch (e) {
            console.log(e);
            return;
        }
    }
}

//Función para encontrar una pelicula
const discoverMovieBanner = async () => {
    try {
        //Hacemos la petición y extraemos el id del primer resultado
        const {data} = await instanceAPI.get('/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc');
        const {id} = data.results[0];

        return id;

    } catch (e) {
        console.log(e);
        return;
    }

}

//Función para encontrar una serie
const discoverSeriesBanner = async () => {

    try {
        //Hacemos la petición y extraemos el id del primer resultado
        const {data} = await instanceAPI.get('/discover/tv?include_adult=false&page=1&sort_by=popularity.desc');
        const {id} = data.results[0];

        return id;

    } catch (e) {
        console.log(e);
        return;
    }

}

//Función para obtener las peliculas mas populares
export const popularMoviesList = () => {
    return async (dispatch, getState) => {

        try {
            //Estraemos los datos
            const {data} = await instanceAPI.get('/movie/popular');

            //Hacemos un map para extraer la información que necesitamos
            const dataMovies = data.results.map((movie) => {
                return {
                    id: movie.id,
                    img_poster: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                }
            });

            //Ejecutamos la acción
            dispatch(onPopularMovies(dataMovies));

        } catch (e) {
            console.log(e);
            return;
        }
    }
}