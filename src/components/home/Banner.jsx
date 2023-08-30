import {Grid, Typography, Link} from "@mui/material";
import Button from '@mui/material/Button';
import {useSelector} from "react-redux";
import ReactPlayer from "react-player";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const Banner = ({type}) => {

    const { banner } = useSelector( state => state.banner);

    return (
        <Grid className="banner-container">
            <Grid className="banner-content">
                <Grid className="banner-content_info">
                    <Grid className="position-info">
                        {
                            (banner.title) && <Typography variant="h3" mb={2}>{banner.title}</Typography>
                        }
                        {
                            (banner.link_page) && (
                                <Link href={banner.link_page} target="_blank">
                                    <Button className="btn-info" variant="outlined"
                                            startIcon={<InfoOutlinedIcon />} >
                                        Página Oficial
                                    </Button>
                                </Link>
                            )
                        }
                    </Grid>
                </Grid>
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