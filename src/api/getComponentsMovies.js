import { instanceAPI } from './api';
import {onPopularMovies, onRatedMovies} from "../store/slice";

//Función para obtener las peliculas más populares
export const popularMoviesList = () => {
    return async (dispatch, getState) => {
        try {
            const {data} = await instanceAPI.get('/movie/popular');

            //Hacemos un map para extraer la información que necesitamos
            const dataMovies = data.results.map((movie) => {
                if(!!movie.backdrop_path) {
                    const {id, title, backdrop_path, vote_count, vote_average, release_date} = movie;

                    return {
                        id,
                        type: 'movie',
                        img_poster: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
                        title,
                        vote_count,
                        vote_average,
                        date: release_date
                    }
                }

                return;
            });

            //Ejecutamos la acción de la aplicación
            dispatch(onPopularMovies(dataMovies));
        } catch (e) {
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

            //Hacemos un map para extraer la información que necesitamos
            const dataRatedMovies = data.results.map((movie) => {
                if(!!movie.backdrop_path){
                    const {id, title, backdrop_path, vote_count, vote_average, release_date} = movie;

                    return {
                        id,
                        type: 'movie',
                        img_poster: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
                        title,
                        vote_count,
                        vote_average,
                        date: release_date
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