import { Outlet } from "react-router-dom";
import Header from "./Header/Header.tsx";

const MainLayout=()=>{
    return(
        <>
            <Header/>
            <Outlet/>
        </>
    );
};
export default MainLayout;