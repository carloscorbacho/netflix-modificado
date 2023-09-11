//React
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

//MaterialUI
import {Box, Grid, TextField} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';

//Logo
import logo from "../../images/icon-plataforma.png";

//Custom Functions
import {onLogout, onSearch} from "../../store/slice";
import {searchItems} from "../../api/getSearchItems";

export const Header = ({disabledSearch}) => {
    //Creamos el estado del buscador
    const { search:SearchRedux } = useSelector(state => state.search)
    const [ search, setSearch ] = useState(SearchRedux);
    const {selectedType} = useSelector(state => state.selectedType);
    const dispatch = useDispatch();

    //Función para cerrar sesión
    const onLogoutUser = () => {
        //Eliminamos la sesión
        sessionStorage.removeItem('user');
        //Disparamos la acción de cerrar sesión
        dispatch( onLogout() );
    }

    //Función para cuando hagan click en buscar
    const onsubmitSearch = (e) => {
        e.preventDefault();
        //Enviaremos el contenido del buscador
        dispatch(onSearch(search));
    }

    //Función para cambiar el contenido del input
    const onChangeSearch = ({ target }) => {
        const { value } = target;
        //Actualizamos el estado del buscador
        setSearch(value);
    }

    //Cada vez que cambie el contenido, disparar la acción
    useEffect(() => {
        //Disparamos la acción
        dispatch(onSearch(search));
        //Disparamos la acción para buscar los items
        dispatch(searchItems(search, selectedType));
    }, [search])

    return (
        <Grid className="header">
            <Grid className="header_container">
                <Grid>
                    <Link to="/">
                        <img src={ logo } alt="logo" className="icon-platform" />
                    </Link>
                </Grid>
                <Grid sx={(disabledSearch) && {display: 'none' }}>
                    <form onSubmit={ onsubmitSearch }>
                        <Box className="input-box">
                            <TextField
                                id="standard-required"
                                label="Título de la serie o película"
                                variant="filled"
                                className="input-box_title"
                                focused
                                onChange={ onChangeSearch }
                                value={ SearchRedux }
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