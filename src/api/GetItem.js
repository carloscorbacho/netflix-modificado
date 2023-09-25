import {instanceAPI} from "./api";
import {onItemSelected} from "../store/slice";

//Función obtener el item dependiendo del id y el tipo
export const ItemById = (id, type) => {
    return async(dispatch, getState) => {
        try {
            const { data } = await instanceAPI.get(`/${type}/${id}`);
            const {vote_count, vote_average, overview} = data;
            const titleItem = (!!data.title) ? data.title : data.name;

            //Creamos el objeto con la info que necesitamos
            const result = {
                id,
                titleItem,
                background: `https://image.tmdb.org/t/p/original/${data.backdrop_path}`,
                poster: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
                vote_count,
                vote_average,
                overview
            }

            //Ejecutamos la acción
            dispatch(onItemSelected(result));
        } catch (e){
            console.error(e);
            return;
        }
    }
}