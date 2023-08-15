import  { Login }  from '../components';
import { Grid } from "@mui/material";
import logo from '../images/icon-plataforma.png';

export const Prehome = () => {
    return (
        <Grid className="prehome bkg-image">
            <img alt="icon" className="icon-platform" src={ logo } />
            <Login />
        </Grid>
    );
}