import { instanceAPI } from './api';
import {onPopularSeries, onTopRatedSeries} from "../store/slice";

//Función para obtener las series más populares
export const popularSeriesList = () => {
    return async (dispatch, getState) => {
        try {
            const {data} = await instanceAPI.get('/tv/popular');

            //Hacemos un map para extraer la información que necesitamos
            const dataSeries = data.results.map((serie) => {
                const {id, name, backdrop_path, vote_count, vote_average, first_air_date} = serie;

                if(!!serie.backdrop_path){
                    return {
                        id,
                        type: 'serie',
                        img_poster: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
                        title: name,
                        vote_count,
                        vote_average,
                        date: first_air_date
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
                const {id, name, backdrop_path, vote_count, vote_average, first_air_date} = serie;

                if(!!serie.backdrop_path){
                    return {
                        id,
                        type: 'serie',
                        img_poster: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
                        title: name,
                        vote_count,
                        vote_average,
                        date: first_air_date
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