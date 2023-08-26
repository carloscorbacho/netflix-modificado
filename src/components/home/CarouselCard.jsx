import {Card} from '@mui/material';

export const CarouselCard = ({ item }) => {
    const { img_poster } = item;

    return (
        <Card className="card">
            <img src={img_poster} alt="Card Image" />
        </Card>
    );
};