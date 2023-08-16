import {Box, Grid} from "@mui/material";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MovieIcon from '@mui/icons-material/Movie';

export const Aside = () => {
    return (
        <Grid className="nav">
            <Grid className="nav_container">
                <Grid className="icon-box">
                    <LiveTvIcon className="icon-box_img" />
                    <Box className="icon-box_span">Series</Box>
                </Grid>
                <Grid className="icon-box">
                    <MovieIcon className="icon-box_img"/>
                    <Box className="icon-box_span">Películas</Box>
                </Grid>
            </Grid>
        </Grid>
    )
}