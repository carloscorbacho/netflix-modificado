import {Box, Grid} from "@mui/material";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MovieIcon from '@mui/icons-material/Movie';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { onSelectedType } from "../../store/slice";
import {getBanner} from "../../api";


export const Aside = ({active}) => {

    const dispatch = useDispatch();
    const typeActive = document.querySelector(`.${active}`);

    useEffect(() => {
        dispatch(onSelectedType(active));
        dispatch(getBanner(active));
    }, [])

    return (
        <Grid className="nav">
            <Grid className="nav_container">
                <Grid className={`icon-box ${active === 'movies' && 'active'}`}>
                    <Link to="/movies">
                        <MovieIcon className="icon-box_img" />
                        <Box className="icon-box_span">Películas</Box>
                    </Link>
                </Grid>
                <Grid className={`icon-box ${active === 'series' && 'active'}`}>
                    <Link to="/series">
                        <LiveTvIcon className="icon-box_img" />
                        <Box className="icon-box_span">Series</Box>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    )
}