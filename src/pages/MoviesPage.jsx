import { Banner } from "../components/home/Banner";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { popularMoviesList, ratedMoviesList } from "../api";
import { CarouselComponent } from "../components/home/CarouselComponent";

export const MoviesPage = () => {

    const { banner } = useSelector(state => state.banner);
    const { popularMovies, topRatedMovies } = useSelector(state => state.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        //Llamamos a la función para obtener las peliculas mas populares
        dispatch(popularMoviesList());
        //Llamamos a la función para obtener las peliculas mas votadas
        dispatch(ratedMoviesList());
    }, []);

    return (
        <>
            {
                ( banner ) && <Banner />
            }

            <Grid className='container-carousel'>
                {
                    ( popularMovies ) && <CarouselComponent
                        titleCarousel='Películas más populares'
                        items={popularMovies} />
                }
                {
                    ( topRatedMovies ) && <CarouselComponent
                        titleCarousel='Películas más votadas'
                        items={topRatedMovies} />
                }
            </Grid>
        </>
    )
}