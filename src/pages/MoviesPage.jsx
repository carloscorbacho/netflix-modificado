//React
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

//MaterialUI
import {Grid} from "@mui/material";

//Custom components
import {Aside, Banner, CarouselComponent, Header, ItemsSearch, LoadingComponent} from "../components/home";

//Custom functions
import {popularMoviesList, ratedMoviesList} from "../api/getComponentsMovies";
import {onLoadedMovies} from "../store/slice";

export const MoviesPage = () => {
    const {search} = useSelector(state => state.search);
    const {banner} = useSelector(state => state.banner);
    const {loadedMovies, popularMovies, topRatedMovies} = useSelector(state => state.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loadedMovies) {
            //Llamamos a la función para obtener las peliculas mas populares
            dispatch(popularMoviesList());
            //Llamamos a la función para obtener las peliculas mas votadas
            dispatch(ratedMoviesList());

            setTimeout(() => {
                //Llamamos a la función para actualizar el estado a true
                dispatch(onLoadedMovies());
            }, 2000);
        }
    }, []);

    return (
        <Grid className="home home--movies">
            <Header/>
            <Aside active="movies"/>
            {
                (!loadedMovies)
                    ? <LoadingComponent/>
                    : (!!search)
                        ? <ItemsSearch/>
                        : (
                            <Grid className="content">
                                {
                                    (banner) && <Banner/>
                                }

                                <Grid className='container-carousel'>
                                    {
                                        (popularMovies) && <CarouselComponent
                                            titleCarousel='Películas más populares'
                                            items={popularMovies}/>
                                    }
                                    {
                                        (topRatedMovies) && <CarouselComponent
                                            titleCarousel='Películas más votadas'
                                            items={topRatedMovies}/>
                                    }
                                </Grid>
                            </Grid>
                        )
            }
        </Grid>
    )
}