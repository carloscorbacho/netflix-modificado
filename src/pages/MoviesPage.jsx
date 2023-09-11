//React
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//MaterialUI
import { Grid } from "@mui/material";

//Custom components
import { Banner, Aside, Header, ItemsSearch, CarouselComponent} from "../components/home";

//Custom functions
import { popularMoviesList, ratedMoviesList } from "../api/getComponentsMovies";

export const MoviesPage = () => {
    const { search } = useSelector(state => state.search);
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
        <Grid className="home home--movies">
            <Header />
            <Aside active="movies" />

            {
                (!!search)
                    ? <ItemsSearch />
                    : (
                        <Grid className="content">
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
                        </Grid>
                    )
            }
        </Grid>
    )
}