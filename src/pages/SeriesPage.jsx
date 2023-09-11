//React
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

//MaterialUI
import {Grid} from "@mui/material";

//Custom functions
import {popularSeriesList, ratedSeriesList} from "../api/getComponentsSeries";

//Custom components
import {Aside, Banner, CarouselComponent, Header, ItemsSearch} from "../components/home";

export const SeriesPage = () => {
    const {search} = useSelector(state => state.search);
    const {banner} = useSelector(state => state.banner);
    const {popularSeries, topRatedSeries} = useSelector(state => state.series);
    const dispatch = useDispatch();

    useEffect(() => {
        //Llamamos a la función para obtener las series mas populares
        dispatch(popularSeriesList());
        //Llamamos a la función para obtener las series mas votadas
        dispatch(ratedSeriesList());
    }, []);


    return (
        <Grid className="home">
            <Header/>
            <Aside active="series"/>

            {
                (!!search)
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