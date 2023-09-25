//React
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

//MaterialUI
import {Grid, Typography, Box} from "@mui/material";
import Zoom from '@mui/material/Zoom';

//Components
import {CardItem} from "./CardItem";
import {searchItems} from "../../api/getSearchItems";

export const ItemsSearch = () => {
    const {search, items} = useSelector(state => state.search);
    const {selectedType} = useSelector(state => state.selectedType);
    const dispatch = useDispatch();
    const increment = 100;

    useEffect(() => {
        //Disparamos la acción para buscar los items
        dispatch(searchItems(search, selectedType));
    }, [search])

    return (
        <>
            {
                <Grid className="content">
                    <Grid className="view-search">
                        <Grid className="view-search_title">
                            <Typography variant="h6" mb={2}>Búsquedas relacionadas con: {search}</Typography>
                        </Grid>
                        <Grid className="view-search_content">
                            {items && items.length > 0 ? (
                                items.map((item, index) => (
                                    (!!item) && (
                                        <Zoom in={true} style={{ transitionDelay:  `${increment*index}ms`}}>
                                            <Box>
                                                <CardItem item={item} key={item.id}/>
                                            </Box>
                                        </Zoom>
                                    )
                                ))
                            ) : (
                                <Typography variant="body1">No se encontraron resultados.</Typography>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            }
        </>
    )
}

