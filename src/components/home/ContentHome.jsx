import {Grid} from "@mui/material";
import { Banner } from "./Banner";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getBanner} from "../../api";

export const ContentHome = () => {
    const { selectedType } = useSelector( state => state.selectedType);
    const { banner } = useSelector( state => state.banner);
    const dispatch = useDispatch();

    useEffect(() => {
        //Llamamos a la función para obtener el banner
        dispatch( getBanner(selectedType) )

    }, [selectedType]);

    return (
        <Grid className="content">
            {
                ( banner ) && <Banner />
            }
        </Grid>
    )
}