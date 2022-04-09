import { useContext, useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { UserStoreContext } from "../../../pages/_app";
import Button from "../../common-components/Button/Button";
import { ThemeButton } from "../../common-components/ThemeButton/ThemeButton";
import styles from "../Header.module.css";
import { HeaderLink, logoutLoginExcludedPathnames, renderNavLinks } from "./HeaderLinkHelpers";
import { useRouter } from "next/router";

interface props {
    linkTextArray: HeaderLink[],
    collapsed: boolean,
    userLoggedIn: boolean | undefined
}

/**
 * Renders the nav links for mobile header
 * @param props props
 * @returns Rendered navigation links for the mobile header
 */
const HeaderLinksMobile = (props: props) => {

    const [animateHeightHeight, updateAnimateHeightHeight] = useState<number | string>(0);
    const router = useRouter();
    const { userLoggedIn } = useContext(UserStoreContext);

    /** Change prop send to animator based on collapse */
    useEffect(() => {
        updateAnimateHeightHeight(props.collapsed ? 0 : 'auto');
    }, [props.collapsed]);

    return (
        <AnimateHeight
        duration={ 400 }
        height={animateHeightHeight}>
            <ul className={"flex flex-col px-4 pb-4 md:flex-row md:items-center gap-1 md:gap-4 overflow-hidden md:h-auto pt-4 bg-light dark:bg-dark-comp"}>
                {renderNavLinks(props)}
                <li key={998} className="w-fit">
                    <ThemeButton />
                </li>
                {
                    !logoutLoginExcludedPathnames.includes(router.pathname) &&
                    userLoggedIn &&
                    userLoggedIn &&
                    <li key={999} className="w-fit">
                        <Button buttonText="Logout" onClick={() => {router.push("/logout")}}></Button>
                    </li>
                }
                {
                    !logoutLoginExcludedPathnames.includes(router.pathname) &&
                    userLoggedIn !== undefined &&
                    !userLoggedIn &&
                    <li key={999} className="w-fit">
                        <Button buttonText="Login/Register" onClick={() => {router.push("/login")}}></Button>
                    </li>
                }
            </ul>
        </AnimateHeight>
    )
}

export default HeaderLinksMobile;