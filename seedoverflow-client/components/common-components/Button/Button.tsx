import { useContext } from "react";
import { ThemeStoreContext } from "../../../pages/_app";

interface props {
    buttonText: string,
    onClick?: any
}

const Button = (props: props) => {
    const { buttonText, onClick } = props;

    return (
        <button
            onClick={() => onClick()}
            className={`m-0 p-2 rounded-lg transition ease-in-out hover:scale-105 bg-green dark:bg-purple text-light-text dark:text-dark-text`}>
            {buttonText}
        </button>
    )
}

export default Button;