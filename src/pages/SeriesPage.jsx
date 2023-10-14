//React
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

//MaterialUI
import {Grid} from "@mui/material";

//Custom functions
import {popularSeriesList, ratedSeriesList} from "../api/getComponentsSeries";
import {onLoadedSeries} from "../store/slice";

//Custom components
import {Aside, Banner, CarouselComponent, Header, ItemsSearch, LoadingComponent, Footer} from "../components/home";
import {getBanner} from "../api/getBannerVideo";

export const SeriesPage = () => {
    const {search} = useSelector(state => state.search);
    const {loadedSeries, bannerSeries, popularSeries, topRatedSeries} = useSelector(state => state.series);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loadedSeries) {
            dispatch(getBanner('series'));
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
        <Grid className="home home--series">
            <Header/>
            <Aside active="series" />

            {
                (!loadedSeries)
                    ? <LoadingComponent/>
                    : (!!search)
                        ? <ItemsSearch/>
                        : (
                            <Grid className="content">
                                {
                                    (bannerSeries) && <Banner item={bannerSeries}/>
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

            <Footer/>
        </Grid>
    )
}