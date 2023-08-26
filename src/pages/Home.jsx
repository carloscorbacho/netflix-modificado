import {Grid} from "@mui/material";
import {Aside, ContentHome, Header} from "../components"

export const Home = () => {
    return (
        <Grid className="home">
            <Header/>
            <Aside/>
            <ContentHome/>
        </Grid>
    )
}