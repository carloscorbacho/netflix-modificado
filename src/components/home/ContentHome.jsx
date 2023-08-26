import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getBanner, popularMoviesList} from "../../api";
import {CarouselComponent} from "./CarouselComponent";
import {Banner} from '../home/Banner';

export const ContentHome = () => {
    const {selectedType} = useSelector(state => state.selectedType);
    const {banner} = useSelector(state => state.banner);
    const { popularMovies } = useSelector(state => state.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        //Llamamos a la función para obtener el banner
        dispatch(getBanner(selectedType));
        //Llamamos a la función para obtener las peliculas mas populares
        dispatch(popularMoviesList());
    }, [selectedType]);

    return (
        <Grid className="content">
            {/*
                ( banner ) && <Banner />
            */}

            <Grid className="container-carousel">
                {
                    ( popularMovies ) && <CarouselComponent items={popularMovies} />
                }
            </Grid>

        </Grid>
    )
}