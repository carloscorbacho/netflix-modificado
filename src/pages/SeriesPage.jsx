import {useDispatch, useSelector} from "react-redux";
import {Banner} from "../components/home/Banner";
import {useEffect} from "react";
import {popularSeriesList, ratedSeriesList} from "../api";
import {CarouselComponent} from "../components/home/CarouselComponent";
import {Grid} from "@mui/material";

export const SeriesPage = () => {

    const { banner } = useSelector(state => state.banner);
    const { popularSeries, topRatedSeries } = useSelector(state => state.series);
    const dispatch = useDispatch();

    useEffect(() => {
        //Llamamos a la función para obtener las series mas populares
        dispatch(popularSeriesList());
        //Llamamos a la función para obtener las series mas votadas
        dispatch(ratedSeriesList());
    }, []);
    return (
        <>
            {
                ( banner ) && <Banner />
            }

            <Grid className='container-carousel'>
                {
                    ( popularSeries ) && <CarouselComponent
                        titleCarousel='Series más populares'
                        items={popularSeries} />
                }
                {
                    ( topRatedSeries ) && <CarouselComponent
                        titleCarousel='Series más votadas'
                        items={topRatedSeries} />
                }
            </Grid>
        </>
    )
}