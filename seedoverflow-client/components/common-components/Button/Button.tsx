import { ButtonHTMLAttributes, useContext, useState } from "react";
import { ThemeStoreContext } from "../../../pages/_app";
import { ButtonType } from "../../CommonEnums";
import Spinner from "../Spinner/Spinner";

interface props {
    buttonText: string,
    onClick?: any,
    loading?: boolean,
    type?: ButtonType,
    className?: string
}

const Button = (props: props) => {
    const { buttonText, onClick } = props;

    return (
        <button
            onClick={onClick ? () => onClick() : () => {}}
            disabled={props.loading}
            type={props.type}
            className={`m-0 p-2 flex gap-2 items-center justify-center rounded-lg transition ease-in-out hover:scale-105 bg-inbetween-green disabled:bg-darker-green dark:bg-turquoise dark:disabled:bg-darker-turquoise text-light-text ${props.className}`}>
            {
                props.loading &&
                <Spinner width="w-4" height="h-4" />
            }
            {buttonText}
        </button>
    )
}

export default Button;