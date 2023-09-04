import {Box, Grid, TextField} from "@mui/material";
import logo from "../../images/icon-plataforma.png";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import {itemsSearch, onLogout, onSearch} from "../../store/slice";

export const Header = () => {

    //Creamos el estado del buscador
    const [ search, setSearch ] = useState();
    const dispatch = useDispatch();

    const onLogoutUser = () => {
        //Disparamos la acción de cerrar sesión
        dispatch( onLogout() );
    }

    const onsubmitSearch = (e) => {
        e.preventDefault();
        //Enviaremos el contenido del buscador
        dispatch(onSearch(search));
    }

    const onChangeSearch = ({ target }) => {
        //Actualizamos el estado del buscador
        const { value } = target;
        setSearch(value);
    }

    useEffect(() => {
        //Disparamos la acción
        dispatch(onSearch(search));
    }, [search])

    return (
        <Grid className="header">
            <Grid className="header_container">
                <Grid>
                    <img src={ logo } alt="logo" className="icon-platform" />
                </Grid>
                <Grid>
                    <form onSubmit={ onsubmitSearch }>
                        <Box className="input-box">
                            <TextField
                                id="standard-required"
                                label="Título de la serie o película"
                                variant="filled"
                                className="input-box_title"
                                focused
                                onChange={ onChangeSearch }
                            />
                            <IconButton className="input-box_search" onClick={ onsubmitSearch }>
                                <SearchIcon />
                            </IconButton>
                        </Box>
                    </form>
                </Grid>
                <Grid>
                    <Tooltip>
                        <IconButton className="btn-logout" onClick={ onLogoutUser }>
                            <LogoutIcon className="btn-logout-icon"/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Grid>
    )
}