import { ButtonHTMLAttributes, useContext, useState } from "react";
import { ThemeStoreContext } from "../../../pages/_app";
import { ButtonType } from "../../CommonEnums";
import Spinner from "../Spinner/Spinner";

interface props {
    buttonText: string,
    onClick?: any,
    loading?: boolean,
    type?: ButtonType,
    className?: string,
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl',
    responsive?: boolean,
    danger?: boolean,
    disabled?: boolean
}

const Button = (props: props) => {
    const { buttonText, onClick } = props;

    return (
        <button
            onClick={onClick ? () => onClick() : () => {}}
            disabled={props.disabled || props.loading}
            type={props.type}
            className={`m-0 p-2 flex gap-2 items-center justify-center rounded-lg transition ease-in-out hover:scale-105 disabled:hover:transform-none ${!props.danger ? 'bg-inbetween-green disabled:bg-darker-green dark:bg-turquoise dark:disabled:bg-darker-turquoise' : 'bg-danger disabled:bg-lava-2 dark:bg-danger dark:disabled:bg-lava-2'}  text-light-text ${props.responsive ? `md:text-md lg:text-lg xl:text-xl 2xl:text-2xl` : ''} ${props.size ? `text-${props.size}` : ''} ${props.className}`}>
            {
                props.loading &&
                <Spinner width="w-4" height="h-4" />
            }
            {buttonText}
        </button>
    )
}

export default Button;