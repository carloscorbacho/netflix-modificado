import {Box, Grid} from "@mui/material";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MovieIcon from '@mui/icons-material/Movie';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { onSelectedType } from "../../store/slice";


export const Aside = () => {

    const [selectedType, setSelectedType] = useState(null);
    const dispatch = useDispatch();

    const onClickSelectedType = ({target}) => {
        const elementParent = target.closest('.icon-box');
        const typeSelected = elementParent.querySelector('.icon-box_span').innerHTML;

        setSelectedType(typeSelected);
    }

    useEffect(() => {
        dispatch(onSelectedType(selectedType));
    }, [selectedType])

    return (
        <Grid className="nav">
            <Grid className="nav_container">
                <Grid className="icon-box" onClick={ onClickSelectedType }>
                    <LiveTvIcon className="icon-box_img" />
                    <Box className="icon-box_span">Series</Box>
                </Grid>
                <Grid className="icon-box" onClick={ onClickSelectedType }>
                    <MovieIcon className="icon-box_img"/>
                    <Box className="icon-box_span" onClick={ onClickSelectedType }>Películas</Box>
                </Grid>
            </Grid>
        </Grid>
    )
}