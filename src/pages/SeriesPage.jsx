//React
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

//MaterialUI
import {Grid} from "@mui/material";

//Custom functions
import {popularSeriesList, ratedSeriesList} from "../api/getComponentsSeries";
import {onLoadedSeries} from "../store/slice";

//Custom components
import {Aside, Banner, CarouselComponent, Header, ItemsSearch, LoadingComponent} from "../components/home";

export const SeriesPage = () => {
    const {search} = useSelector(state => state.search);
    const {banner} = useSelector(state => state.banner);
    const {loadedSeries, popularSeries, topRatedSeries} = useSelector(state => state.series);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loadedSeries) {
            //Llamamos a la función para obtener las series mas populares
            dispatch(popularSeriesList());
            //Llamamos a la función para obtener las series mas votadas
            dispatch(ratedSeriesList());

            setTimeout(() => {
                //Llamamos a la función para actualizar el estado a true
                dispatch(onLoadedSeries());
            }, 2000);
        }

    }, []);


    return (
        <Grid className="home">
            <Header/>
            <Aside active="series"/>

            {
                (!loadedSeries)
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
                                        (popularSeries) && <CarouselComponent
                                            titleCarousel='Series más populares'
                                            items={popularSeries}/>
                                    }
                                    {
                                        (topRatedSeries) && <CarouselComponent
                                            titleCarousel='Series más votadas'
                                            items={topRatedSeries}/>
                                    }
                                </Grid>
                            </Grid>
                        )
            }
        </Grid>
    )
}