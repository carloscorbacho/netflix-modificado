import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { getBanner } from '../../api'
import ReactPlayer from "react-player";

export const Banner = () => {

    const { banner } = useSelector( state => state.banner);

    return (
        <Grid className="banner-container">
            <ReactPlayer
                url={ banner.url_video }
                playing={ true }
                loop={ true }
                controls={ false }
            />
        </Grid>
    )
}