import { Home, Prehome, ItemPage } from './pages';
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

export const App = () => {

    const { status } = useSelector(state => state.auth);

    return (
        <>
            <Routes>
                {
                    ( status === 'no-autenticado' )
                        ? <Route path='/' element={ <Prehome /> }/>
                        : <Route path='/' element={ <Home/> }/>
                }


                <Route path='movie/:id' element={ <ItemPage />} />
                <Route path='serie/:id' element={ <ItemPage />} />

                <Route path='/*' element={ <Navigate to='/' /> } />
            </Routes>
        </>
    )
}
