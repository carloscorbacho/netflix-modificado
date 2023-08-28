import {Grid} from "@mui/material";
import {useSelector} from "react-redux";
import ReactPlayer from "react-player";

export const Banner = () => {

    const { banner } = useSelector( state => state.banner);

    return (
        <Grid className="banner-container">
            <Grid className="banner-content">
                <div className="banner-content_info">
                </div>
                <ReactPlayer
                    url={ banner.url_video }
                    playing={ true }
                    loop={ true }
                    controls={ false }
                    width='100%'
                    height='100%'
                />
            </Grid>
        </Grid>
    )
}