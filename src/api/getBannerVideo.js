import {instanceAPI} from './api';
import {onBannerMovies, onBannerSeries} from "../store/slice";

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
                dispatch(onBannerSeries(serie));
                break;
            case 'movies':
                //Obtenemos los id
                const idsMovies = await discoverMoviesIds();
                //Buscamos las peliculas con el video (no todas tienen video)
                const movie = await discoverMovieBanner(idsMovies);
                //Actualizamos el estado
                dispatch(onBannerMovies(movie));
                break;
        }
    }
}

//Función para encontrar los ids peliculas
const discoverMoviesIds = async () => {
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
const discoverSeriesIds = async () => {
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
const discoverMovieBanner = async (ids) => {
    try {
        //Hacemos una búsqueda de los vídeos con todos los ids encontrados antes
        const resultsVideos = async() => {
            let videoItem = null;

            for (const id of ids) {
                const urlVideos = `/movie/${id}/videos`;
                const {data} = await instanceAPI.get(urlVideos);

                //Filtramos que sea de tipo trailer
                const video = data.results.filter((item) => item.type == 'Trailer');

                //En cuento tengamos un resultado salimos del bucle
                if (video.length > 0) {
                    videoItem = { id_item: id, video };
                    break;
                }
            }

            return videoItem;
        }

        //Obtenemos los videos y extraemos la información de los videos
        const videos = await resultsVideos();
        const {id_item, video} = videos;

        //Hacemos una búsqueda para obtener más info del id del video
        const urlDetails = `/movie/${id_item}`;
        const {data} = await instanceAPI.get(urlDetails);
        const {title, homepage, overview} = data;

        return {
            id_item,
            id_video: video[0].id,
            key: video[0].key,
            site: video[0].site,
            url_video: (video[0].site === "YouTube")
                ? `https://www.youtube.com/embed/${video[0].key}`
                : `https://vimeo.com/${video[0].key}`,
            title,
            overview,
            link_page: homepage
        }

    } catch (e) {
        //En caso de error obtendremos el video seleccionado a través de las variables
        const idItem = 615656;
        const keyItem = 'dG91B3hHyY4';

        //Buscamos los videos de la serie(id)
        try {
            const functionResultsVideo = async () => {
                const {data} = await instanceAPI.get(`/movie/${idItem}/videos`);
                const {results} = data;

                return results
            }

            const resultsVideos = await functionResultsVideo();

            //Filtramos los videos para que sea igual que keyItem
            const resultVideo = resultsVideos.filter((result) => {
                return result.key === keyItem
            })

            const {id: id_video, key, site} = resultVideo[0];

            const functionResultInfoSerie = async () => {
                const {data} = await instanceAPI.get(`/movie/${idItem}`);

                return data;
            }

            const resultInfo = await functionResultInfoSerie();

            const {id: id_item, title, homepage, overview} = resultInfo;

            return {
                id_item,
                id_video,
                key,
                site,
                url_video: (site === "YouTube")
                    ? `https://www.youtube.com/embed/${key}`
                    : `https://vimeo.com/${key}`,
                title,
                overview,
                link_page: homepage
            }

        } catch (e) {
            //En caso de error se lanzará la excepción
            console.log(e);
            throw e;

        }
    }
}

//Función para obtener video (serie)
const discoverSerieBanner = async (ids) => {

    try {
        //Hacemos una búsqueda de los vídeos con todos los ids encontrados antes
        const resultsVideos = async() => {
            let videoItem = null;

            for (const id of ids) {
                const urlVideos = `/tv/${id}/videos`;
                const {data} = await instanceAPI.get(urlVideos);

                //Filtramos que sea de tipo trailer
                const video = data.results.filter((item) => item.type == 'Trailer');

                //En cuento tengamos un resultado salimos del bucle
                if (video.length > 0) {
                    videoItem = { id_item: id, video };
                    break;
                }
            }

            return videoItem;
        }

        //Obtenemos los videos y extraemos la información de los videos
        const videos = await resultsVideos();
        const {video} = videos;

        //Hacemos una búsqueda para obtener más info del id del video
        const urlDetails = `/tv/${id_item}`;
        const {data} = await instanceAPI.get(urlDetails);

        const {id:id_item, name:title, homepage, overview} = data;

        return {
            id_item,
            id_video: video[0].id,
            key: video[0].key,
            site: video[0].site,
            url_video: (video[0].site === "YouTube")
                ? `https://www.youtube.com/embed/${video[0].key}`
                : `https://vimeo.com/${video[0].key}`,
            title,
            overview,
            link_page: homepage
        }

    } catch (e) {

        //En caso de error obtendremos el video seleccionado a través de las variables
        const idItem = 1399;
        const keyItem = 'KPLWWIOCOOQ';

        //Buscamos los videos de la serie(id)
        try {
            const functionResultsVideo = async () => {
                const {data} = await instanceAPI.get(`/tv/${idItem}/videos`);
                const {results} = data;

                return results
            }

            const resultsVideos = await functionResultsVideo();
            const resultVideo = resultsVideos.filter((result) => {
                return result.key === keyItem
            })

            const {id: id_video, key, site} = resultVideo[0];

            const functionResultInfoSerie = async () => {
                const {data} = await instanceAPI.get(`/tv/${idItem}`);

                return data;
            }

            const resultInfo = await functionResultInfoSerie();

            const {id: id_item, name, homepage, overview} = resultInfo;

            return {
                id_item,
                id_video,
                key,
                site,
                url_video: (site === "YouTube")
                    ? `https://www.youtube.com/embed/${key}`
                    : `https://vimeo.com/${key}`,
                title: name,
                overview,
                link_page: homepage
            }

        } catch (e) {
            //En caso de error se lanzará la excepción
            console.log(e);
            throw e;
        }

    }
}