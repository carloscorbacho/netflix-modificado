import {Home, Prehome, ItemPage, MoviesPage, SeriesPage, SearchPageComponent} from './pages';
import { Navigate, Route, Routes } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {onLogout, onLogin, onSelectedType} from "./store/slice";

export const App = () => {

    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const sessionUser = sessionStorage.getItem('user');

        (!!sessionUser)
            ? dispatch(onLogin({email: sessionUser}))
            : onLogout();
    },[]);

    return (
        <>
            <Routes>
                {
                    ( status === 'no-autenticado')
                        ? (
                            <>
                                <Route path='/login' element={ <Prehome /> }/>
                                <Route path='*' element={ <Navigate to='/login' /> } />
                            </>
                        )
                        : (
                            <>
                                <Route path='/' element={ <Navigate to='/movies' />} />
                                <Route path='/movies' element={ <MoviesPage /> }/>
                                <Route path='/series' element={ <SeriesPage /> }/>
                                <Route path='/movie/:id' element={ <ItemPage type='movie'/>} />
                                <Route path='/serie/:id' element={ <ItemPage type='tv'/>} />
                                <Route path='*' element={ <Navigate to='/' /> } />
                            </>
                        )
                }


            </Routes>
        </>
    )
}
