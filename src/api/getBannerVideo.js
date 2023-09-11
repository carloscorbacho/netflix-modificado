import {instanceAPI} from './api';
import {onSelectedBanner} from "../store/slice";

//Función para actualizar el banner en funciíon si es pelicula o serie
export const getBanner = (type) => {
    return async (dispatch, getState) => {
        switch (type) {
            case 'series':
                //Obtenemos los id
                const idsSeries = await discoverSeriesIds();
                //Buscamos la serie con el video (no todas tienen video)
                const serie = await discoverSerieBanner(idsSeries);
                //Actualizamos el estado
                dispatch(onSelectedBanner(serie));
                break;
            case 'movies':
                const idsMovies = await discoverMoviesIds();
                const movie = await discoverMovieBanner(idsMovies);
                dispatch(onSelectedBanner(movie));
                break;
        }
    }
}

//Función para encontrar los ids peliculas
const discoverMoviesIds = async() => {
    try {
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
const discoverSeriesIds = async() => {
    try {
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

//Función para obtener video (pelicula)
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

//Función para obtener video (serie)
const discoverSerieBanner = async(ids) => {
    try {
        const results = await ids.map(async(id) => {
            const urlVideos = `/tv/${id}/videos`;
            const { data } = await instanceAPI.get(urlVideos);

            if(data.results.length > 0){
                return {id_item:id, video:data.results};
            }
        });

        //Obtenemos todos los resultados de las promesas
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