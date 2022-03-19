import { useContext } from "react";
import { ThemeStoreContext } from "../../../pages/_app";
const Container = (props: any) => {
    const { children } = props;
    return (
        <div className={`body-container flex justify-center w-full h-full bg-light dark:bg-dark text-light-text dark:text-dark-text`}>
            <div className="page px-2 lg:px-2 w-full md:container">
               {children} 
            </div>
        </div>
    )
}

export default Container;