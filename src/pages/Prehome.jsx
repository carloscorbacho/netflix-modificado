import  {Login}  from '../components';
import { Grid } from "@mui/material";

export const Prehome = () => {
    return (
        <Grid className="prehome bkg-image">
            <img alt="icon" className="icon-platform" src="/images/icon-plataforma.png" />
            <Login />
        </Grid>
    );
}