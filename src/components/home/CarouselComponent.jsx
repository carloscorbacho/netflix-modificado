import React, {useLayoutEffect, useState, useRef, useEffect} from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CarouselCard } from "./CarouselCard";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Button, Grid, Typography} from "@mui/material";

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
        slidesToShow: 6,
        slidesToScroll: 6,
        speed: 500,
        arrows: false,
        responsive: [
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            }
        ]/*,
        prevArrow: <Button><ArrowBackIosNewIcon className="custom-prev-arrow" /></Button>,
        nextArrow: <Button><ArrowForwardIosIcon className="custom-next-arrow" /></Button>*/
    };

    return (
        <Grid className="carousel-container" style={{ maxWidth: widthCarousel }}>
            <Typography variant="h5" mb={2}>{titleCarousel}</Typography>
            <Slider {...settings}>
                {items.map((item) => (
                    <CarouselCard item={item} key={item.id}/>
                ))}
            </Slider>
        </Grid>
    );
}
