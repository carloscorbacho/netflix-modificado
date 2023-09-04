import {Card, Grid} from '@mui/material';

export const CardItem = ({item}) => {
    const {img_poster} = item;

    return (
        <Card className="card">
            <Grid>
                <img src={img_poster} alt="Card Image"/>
            </Grid>
        </Card>
    );
};