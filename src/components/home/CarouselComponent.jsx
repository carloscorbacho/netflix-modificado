//React
import React, {useLayoutEffect, useState} from "react";

//MaterialUI
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Grid, Typography, Button} from "@mui/material";

//React slick (libreria carousel)
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//Component
import { CardItem } from "./";


export const CarouselComponent = ({ titleCarousel = null, items = null }) => {

    const [widthCarousel, setWidth] = useState(window.innerWidth);

    //Utilizamos el useLayoutEffect para obtener el tamaño de la pantalla
    useLayoutEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
    },[]);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        speed: 500,
        arrows: true,
        rows: 1,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            }
        ],
        prevArrow: <Button><ArrowBackIosNewIcon className="custom-prev-arrow" /></Button>,
        nextArrow: <Button><ArrowForwardIosIcon className="custom-next-arrow" /></Button>
    };

    return (
        <Grid className="carousel-container" style={{ maxWidth: widthCarousel }}>
            {
                (titleCarousel) && <Typography variant="h5" mb={2}>{titleCarousel}</Typography>
            }
            <Slider {...settings}>
                {items.map((item) => (
                    (!!item) && <CardItem item={item} key={item.id}/>
                ))}
            </Slider>
        </Grid>
    );
}
