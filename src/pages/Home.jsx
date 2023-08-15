import { Grid } from "@mui/material";
import {Header, Aside, ContentHome} from "../components"

export const Home = () => {
    return (
        <Grid className="home">
            <Header />
            <Aside />
            <ContentHome />
        </Grid>
    )
}