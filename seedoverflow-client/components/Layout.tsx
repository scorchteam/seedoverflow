import { useContext } from "react";
import { ThemeStoreContext } from "../pages/_app";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const Layout = (props: any) => {
    const { children } = props;
    const { darkModeBackgroundColor, lightModeBackgroundColor, darkModeTextColor, lightModeTextColor } = useContext(ThemeStoreContext);
    return (
        <div className={`${lightModeBackgroundColor} ${lightModeTextColor} ${darkModeBackgroundColor} ${darkModeTextColor} main-content grid grid-rows-[auto_1fr_auto] min-h-screen`}>
            <Header />
                {children}  
            <Footer />
        </div>
    )
}

export default Layout;