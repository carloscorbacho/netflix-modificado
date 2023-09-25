import {Card, Grid} from "@mui/material";

export const LoadingComponent = () => {

    return (
            <Grid className="loading-content">
                <Grid className="content-card">
                    <Card className="card" />
                    <Card className="card" />
                    <Card className="card" />
                    <Card className="card" />
                </Grid>
            </Grid>
    )
}