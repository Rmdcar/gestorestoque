import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

function RootLayout(){
    return(
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    )
}
export default RootLayout