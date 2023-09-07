import {Grid} from "@mui/material";
import {Aside, Header} from "../components"
import {useEffect} from "react";
import {getBanner, popularMoviesList} from "../api";
import {useDispatch, useSelector} from "react-redux";
import {Banner} from "../components/home/Banner";
import {CarouselComponent} from "../components/home/CarouselComponent";
import {SeriesPage} from "./SeriesPage";
import {MoviesPage} from "./MoviesPage";
import {SearchPage} from "./SearchPage";

export const Home = () => {

    const { selectedType } = useSelector(state => state.selectedType);
    const { search } = useSelector(state => state.search);

    return (
        <Grid className="home">
            <Header />
            <Aside/>

            <Grid className="content">
                {
                    (!!search) ? <SearchPage search={search} type={selectedType}/>
                        : ( selectedType === 'Series')
                            ? <SeriesPage />
                            : <MoviesPage />
                }
            </Grid>
        </Grid>

    )
}