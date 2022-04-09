import { useContext } from "react";
import { ThemeStoreContext } from "../../../pages/_app";

interface props {
    className?: string,
    noMargin?: boolean,
    children: any
}

const Container = (props: props) => {
    const { children } = props;
    return (
        <div className={`body-container flex justify-center w-full h-full bg-light-yellow dark:bg-dark text-light-text dark:text-dark-text`}>
            <div className={`page ${props.noMargin && props.noMargin ? '' : 'px-2'} ${props.noMargin && props.noMargin ? '' : 'lg:px-2'} w-full ${props.noMargin && props.noMargin ? '' : 'md:container'} ${props.className && props.className}`}>
               {children} 
            </div>
        </div>
    )
}

export default Container;