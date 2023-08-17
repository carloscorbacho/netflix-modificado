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
        //Obtenemos el padre .icon-box_span mas cercano
        const elementParent = target.closest('.icon-box');
        const typeSelected = elementParent.querySelector('.icon-box_span').innerHTML;

        //Actualizamos el typo ya sea pelicula o serie en nuestro estado
        setSelectedType(typeSelected);

        const iconBoxes = document.querySelectorAll('.icon-box');
        iconBoxes.forEach(
            iconBox => {
                iconBox.classList.remove('active');
                if(iconBox === elementParent) iconBox.classList.add('active');
            }
        );
    }

    useEffect(() => {
        //Cada vez que cambie el tipo cambie el store
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