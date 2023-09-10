import {Card, Grid, Box, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import moment from "moment";
import React from "react";

export const CardItem = ({item}) => {

    const {id, type, img_poster, title, date, vote_average, vote_count } = item;
    const dateItem = moment(date).format('DD/MM/YYYY');
    const link = `/${type}/${id}`;

    return (
        <Card className="card">
            <Link to={link}>
                <Grid className="card_content">
                    <img src={img_poster} alt="Card Image"/>
                    <Grid className="mask">
                        <Typography variant="body1" className="titleItem">{title}</Typography>
                        <Typography variant="body1" className="dateItem">{dateItem}</Typography>
                        <Grid className="rating">
                            <Box className="content_stars">
                                <StarIcon />
                                {vote_average}
                            </Box>
                            <Box className="content_likes">
                                <ThumbUpAltIcon />
                                {vote_count}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Link>
        </Card>
    );
};