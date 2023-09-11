import axios from "axios";
import { getEnvironments } from "./getEnvironments";

const { URL_API, TOKEN_APYKEY } = getEnvironments();

//Creamos la instancia de axios para conectarse a la API
export const instanceAPI = axios.create({
    baseURL: URL_API,
    headers: {
        accept: 'application/json',
        Authorization: TOKEN_APYKEY
    }
});