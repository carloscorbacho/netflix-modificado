import {instanceAPI} from "./api";
import {itemsSearch, onLoadedItems, onResetItems} from "../store/slice";

//Función para hacer búsqueda del título
export const searchItems = (searchItem, type) => {
    return async(dispatch, getState) => {
        try {
            const typeSearch = (type === 'Series') ? 'tv' : 'movie';
            const typeItem = (type === 'Series') ? 'serie' : 'movie';

            const {data} = await instanceAPI.get(`/search/${typeSearch}?query=${searchItem}&include_adult=false'`);

            //Hacemos un map para extraer la información que necesitamos
            const dataSearch = data.results.map((item) => {

                if(!!item.backdrop_path){
                    const {id, name, backdrop_path, vote_count, vote_average, first_air_date} = item;

                    const nameItem = (!!name) ? name : item.title;

                    return {
                        id,
                        type: typeItem,
                        img_poster: `https://image.tmdb.org/t/p/original/${item.backdrop_path}`,
                        title: nameItem,
                        vote_count,
                        vote_average,
                        date: first_air_date
                    }
                }

                return;
            });

            //Ejecutamos la acción
            dispatch(itemsSearch(dataSearch));
        } catch (e){
            console.error(e);
            return;
        }

    }
}