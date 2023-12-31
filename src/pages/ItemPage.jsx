//React
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

//MaterialUI
import {Box, Grid, Typography} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

//Custom Components
import {Aside, Footer, Header, ItemsSearch, LoadingComponent} from "../components/home";

//Custom Functions
import {ItemById} from "../api/GetItem";
import {onLoadedItem, onResetItem} from "../store/slice";

export const ItemPage = ({type}) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {loadedItem, itemSelected} = useSelector(state => state.itemSelected);
    const {search} = useSelector(state => state.search);

    //Ejecutamos la acción para obtener el item
    useEffect(() => {
        dispatch(onResetItem());
        dispatch(ItemById(id, type));

        setTimeout(() => {
            dispatch(onLoadedItem());
        }, 2000);
    }, [id]);

    return (
        <Grid className="home home--item">
            <Header/>
            <Aside active={(type === 'movie') ? 'movies' : 'series'}/>

            <Grid className="content">
                {
                    (!loadedItem)
                        ? <LoadingComponent/>
                        : (!!search)
                            ? <ItemsSearch/>
                            : (itemSelected) && (
                            <Grid className="content_detail"
                                  style={{background: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, 0.5)), url("${itemSelected.background}")`}}>
                                <Grid className="mask">
                                    <Grid className="image-poster">
                                        <img src={itemSelected.poster} alt="Item Image"/>
                                    </Grid>
                                    <Grid className="details">
                                        <Typography variant="body1"
                                                    className="titleItem">{itemSelected.titleItem}</Typography>
                                        <Grid className="rating">
                                            <Box className="content_stars">
                                                <StarIcon/>
                                                {itemSelected.vote_average}
                                            </Box>
                                            <Box className="content_likes">
                                                <ThumbUpAltIcon/>
                                                {itemSelected.vote_count}
                                            </Box>
                                        </Grid>
                                        <Typography variant="body1"
                                                    className="descriptionItem">{itemSelected.overview}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                }
                <Footer/>
            </Grid>
        </Grid>
    )
}