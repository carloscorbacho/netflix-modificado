import axios from "axios";
import {onSelectedBanner, onPopularMovies, onRatedMovies, onPopularSeries, onTopRatedSeries, onSearch, itemsSearch} from '../store/slice';

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
        let url;

        //Si no contiene ningun tipo lo hacemos al azar (para la primera vez)
        if (!type) {
            const typeBanner = ['Series', 'Películas'];
            const typeRandom = typeBanner[Math.floor(Math.random() * typeBanner.length)];

            type = typeRandom;
        }

        //Hacemos un switch, para hacer una acción o otra en función del tipo
        switch (type) {
            case 'Series':
                const idsSeries = await discoverSeriesIds();
                const serie = await discoverSerieBanner(idsSeries);
                dispatch(onSelectedBanner(serie));
                break;
            case 'Películas':
                const idsMovies = await discoverMoviesIds();
                const movie = await discoverMovieBanner(idsMovies);
                dispatch(onSelectedBanner(movie));
                break;
        }
    }
}

//Función para encontrar los ids peliculas
const discoverMoviesIds = async () => {
    try {
        //Hacemos la petición y extraemos los ids de las peliculas
        const {data} = await instanceAPI.get('/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc');

        const ids = data.results.map((result) => {
            const {id} = result;
            return id;
        });

        return ids;

    } catch (e) {
        console.error(e);

        return;
    }

}

//Función para encontrar los ids series
const discoverSeriesIds = async () => {
    try {
        //Hacemos la petición y extraemos los ids de las series
        const {data} = await instanceAPI.get('/discover/tv?include_adult=false&include_null_first_air_dates=true&language=en-US&page=1&sort_by=popularity.desc');

        const ids = data.results.map((result) => {
            const {id} = result;
            return id;
        });

        return ids;

    } catch (e) {
        console.error(e);

        return;
    }

}

//Obtener video (pelicula)
const discoverMovieBanner = async(ids) => {
        try {
            //Hacemos una búsqueda de los vídeos con todos los ids encontrados antes
            const resultsVideos = await ids.map(async(id) => {
                const urlVideos = `/movie/${id}/videos`;
                const { data } = await instanceAPI.get(urlVideos);

                const video = data.results.filter((item) => item.type == 'Trailer');

                if(video.length > 0){
                    return [{id_item:id, video}];
                }
            });

            //Obtenemos los videos y extraemos la información de los videos
            const videos = await Promise.any(resultsVideos);
            const { id_item, video } = videos[0];

            //Hacemos una búsqueda para obtener más info del id del video
            const urlDetails = `/movie/${id_item}`;
            const {data} =  await instanceAPI.get(urlDetails);
            const {title, homepage} = data;

            return {
                id_item,
                id_video: video[0].id,
                key: video[0].key,
                site: video[0].site,
                url_video: (video[0].site === "YouTube")
                    ? `https://www.youtube.com/embed/${video[0].key}`
                    : `https://vimeo.com/${video[0].key}`,
                title,
                link_page: homepage
            }

        } catch (e){
            console.error(e);
        }
}

//Obtener video (serie)
const discoverSerieBanner = async(ids) => {
    try {
        const results = await ids.map(async(id) => {
            const urlVideos = `/tv/${id}/videos`;
            const { data } = await instanceAPI.get(urlVideos);

            if(data.results.length > 0){
                return {id_item:id, video:data.results};
            }
        });


        const videosPromise = await Promise.all(results);
        const videos = videosPromise.filter((item) => !!item);

        const { id_item, video } = videos[0];

        //Hacemos una búsqueda para obtener más info del id del video
        const urlDetails = `/movie/${id_item}`;
        const {data} =  await instanceAPI.get(urlDetails);
        const {title, homepage} = data;

        return {
            id_item,
            id_video: video[0].id,
            key: video[0].key,
            site: video[0].site,
            url_video: (video[0].site === "YouTube")
                ? `https://www.youtube.com/embed/${video[0].key}`
                : `https://vimeo.com/${video[0].key}`,
            title,
            link_page: homepage
        }

    } catch (e){
        console.error(e);
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
                if(!!movie.backdrop_path) {
                    return {
                        id: movie.id,
                        img_poster: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                    }
                }

                return;
            });

            //Ejecutamos la acción
            dispatch(onPopularMovies(dataMovies));

        } catch (e) {
            console.error(e);
            return;
        }
    }
}

//Función para obtener las series mas populares
export const popularSeriesList = () => {
    return async (dispatch, getState) => {

        try {
            //Estraemos los datos
            const {data} = await instanceAPI.get('/tv/popular');

            //Hacemos un map para extraer la información que necesitamos
            const dataSeries = data.results.map((serie) => {
                if(!!serie.backdrop_path){
                    return {
                        id: serie.id,
                        img_poster: `https://image.tmdb.org/t/p/original/${serie.backdrop_path}`
                    }
                }

                return;

            });

            //Ejecutamos la acción
            dispatch(onPopularSeries(dataSeries));

        } catch (e) {
            console.error(e);
            return;
        }
    }
}

//Función para obtener las series con mejor puntuación
export const ratedSeriesList = () => {
    return async (dispatch, getState) => {
        try {
            const {data} = await instanceAPI.get('/tv/top_rated?language=en-US');

            const dataRatedSeries = data.results.map((serie) => {
                if(!!serie.backdrop_path){
                    return {
                        id: serie.id,
                        img_poster: `https://image.tmdb.org/t/p/original/${serie.backdrop_path}`
                    }
                }

                return;

            });

            //Ejecutamos la acción
            dispatch(onTopRatedSeries(dataRatedSeries));

        } catch (e){
            console.error(e);
            return;
        }
    }
}

//Función para obtener las peliculas con mejor puntuación
export const ratedMoviesList = () => {
    return async (dispatch, getState) => {
        try {
            const {data} = await instanceAPI.get('/movie/top_rated?language=en-US');

            const dataRatedMovies = data.results.map((movie) => {
                if(!!movie.backdrop_path){
                    return {
                        id: movie.id,
                        img_poster: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                    }
                }

                return;

            });

            //Ejecutamos la acción
            dispatch(onRatedMovies(dataRatedMovies));

        } catch (e){
            console.error(e);
            return;
        }
    }
}

export const searchItems = (searchItem) => {
    return async(dispatch, getState) => {
        try {
            const {data} = await instanceAPI.get(`/search/collection?query=${searchItem}&include_adult=false&language=en-US`);

            const dataSearch = data.results.map((item) => {
                if(!!item.backdrop_path){
                    return {
                        id: item.id,
                        img_poster: `https://image.tmdb.org/t/p/original/${item.backdrop_path}`
                    }
                }

                return;

            });

            dispatch(itemsSearch(dataSearch));

        } catch (e){
            console.error(e);
            return;
        }

    }
}