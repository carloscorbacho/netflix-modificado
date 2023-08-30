import {useSelector} from "react-redux";
import {Banner} from "../components/home/Banner";

export const SeriesPage = () => {

    const { banner } = useSelector(state => state.banner);

    return (
        <>
            {
                ( banner ) && <Banner />
            }
        </>
    )
}