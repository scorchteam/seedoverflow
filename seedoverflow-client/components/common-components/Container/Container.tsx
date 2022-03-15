import { useContext } from "react";
import { ThemeStoreContext } from "../../../pages/_app";
const Container = (props: any) => {
    const { children } = props;
    const { darkModeBackgroundColor, lightModeBackgroundColor, darkModeTextColor, lightModeTextColor } = useContext(ThemeStoreContext);
    return (
        <div className={`body-container flex justify-center w-full h-full ${lightModeBackgroundColor} ${darkModeBackgroundColor} ${lightModeTextColor} ${darkModeTextColor}`}>
            <div className="page px-2 lg:px-2 w-full md:container">
               {children} 
            </div>
        </div>
    )
}

export default Container;