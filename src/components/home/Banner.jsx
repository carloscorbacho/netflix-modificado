//React
import {useSelector} from "react-redux";
import ReactPlayer from "react-player";
import {Link} from "react-router-dom";

//MaterialUI
import {Grid, Typography} from "@mui/material";
import Button from '@mui/material/Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';


export const Banner = ({item}) => {

    const {selectedType} = useSelector(state => state.selectedType);
    const typeItem = (selectedType === 'movies') ? 'movie': 'serie'
    const linkItem = `/${typeItem}/${item.id_item}`;

    return (
        <Grid className="banner-container">
            <Grid className="banner-content">
                <Grid className="banner-content_info">
                    <Grid className="position-info">
                        {
                            (item.title) && <Typography variant="h3" mb={2} className="title-banner">{item.title}</Typography>
                        }
                        {
                            (item.overview) && <Typography variant="p" mb={2} className="p-banner">{item.overview}</Typography>
                        }
                        <Grid>
                            {
                                (item.id_item) && (
                                    <Link to={linkItem} mr={2}>
                                        <Button className="btn-info btn-info--card" variant="outlined"
                                                startIcon={<AutoStoriesOutlinedIcon />} >
                                            Ficha
                                        </Button>
                                    </Link>
                                )
                            }
                            {
                                    (item.link_page) && (
                                        <Link to={item.link_page} target="_blank">
                                            <Button className="btn-info btn-info--more" variant="outlined"
                                                    startIcon={<InfoOutlinedIcon />} >
                                                Página Oficial
                                            </Button>
                                        </Link>
                                        )
                            }
                        </Grid>
                    </Grid>
                </Grid>

                <ReactPlayer
                    url={ (item.url_video) && item.url_video }
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