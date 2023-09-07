import {Card, Grid} from '@mui/material';
import {Link} from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import moment from "moment";

export const CardItem = ({item}) => {

    const {id, type, img_poster, title, date, vote_average, vote_count } = item;
    const dateItem = moment(date).format('DD/MM/YYYY');
    const link = `${type}/${id}`;

    return (
        <Card className="card">
            <Link to={link}>
                <Grid className="card_content">
                    <img src={img_poster} alt="Card Image"/>
                    <Grid className="mask">
                        <p className="titleItem">{title}</p>
                        <p className="dateItem">{dateItem}</p>
                        <Grid className="rating">
                            <div className="content_stars">
                                <StarIcon />
                                {vote_average}
                            </div>
                            <div className="content_likes">
                                <ThumbUpAltIcon />
                                {vote_count}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Link>
        </Card>
    );
};