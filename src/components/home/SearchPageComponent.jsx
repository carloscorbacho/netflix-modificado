import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchItems} from "../../api";
import {Grid, Typography} from "@mui/material";
import {CardItem} from "./CardItem";

export const SearchPageComponent = () => {

    const {search, items} = useSelector(state => state.search);
    const {selectedType} = useSelector(state => state.selectedType);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchItems(search, selectedType));
    }, [search])

    return (
        <Grid className="content">
            <Grid className="view-search">
                <Grid className="view-search_title">
                    <Typography variant="h6" mb={2}>Búsquedas relacionadas con: {search}</Typography>
                </Grid>
                <Grid className="view-search_content">
                    {items && items.length > 0 ? (
                        items.map(item => (
                            (!!item) && <CardItem item={item} key={item.id}/>
                        ))
                    ) : (
                        <Typography variant="body1">No se encontraron resultados.</Typography>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
}

