import {Grid} from "@mui/material";
import {Aside, Header} from "../components"
import {useEffect} from "react";
import {getBanner, popularMoviesList} from "../api";
import {useDispatch, useSelector} from "react-redux";
import {Banner} from "../components/home/Banner";
import {CarouselComponent} from "../components/home/CarouselComponent";
import {SeriesPage} from "./SeriesPage";
import {MoviesPage} from "./MoviesPage";

export const Home = () => {

    const { selectedType } = useSelector(state => state.selectedType);
    const dispatch = useDispatch();

    useEffect(() => {
        //Llamamos a la función para obtener el banner
        dispatch(getBanner(selectedType));
    }, [selectedType]);

    return (
        <Grid className="home">
            <Header/>
            <Aside/>
            <Grid className="content">
                {
                    ( selectedType === 'Series')
                        ? <SeriesPage />
                        : <MoviesPage />
                }
            </Grid>
        </Grid>

    )
}