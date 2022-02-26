import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const Layout = (props: any) => {
    const { children } = props;
    return (
        <div className="main-content grid grid-rows-[auto_1fr_auto] min-h-screen">
            <Header />
                {children}
            <Footer />
        </div>
    )
}

export default Layout;