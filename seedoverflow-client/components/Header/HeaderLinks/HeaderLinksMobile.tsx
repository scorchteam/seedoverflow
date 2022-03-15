import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { ThemeButton } from "../../common-components/ThemeButton/ThemeButton";
import styles from "../Header.module.css";
import { renderNavLinks } from "./HeaderLinkHelpers";

interface props {
    linkTextArray: string[],
    collapsed: boolean
}

/**
 * Renders the nav links for mobile header
 * @param props props
 * @returns Rendered navigation links for the mobile header
 */
const HeaderLinksMobile = (props: props) => {

    const [animateHeightHeight, updateAnimateHeightHeight] = useState<number | string>(0);

    /** Change prop send to animator based on collapse */
    useEffect(() => {
        updateAnimateHeightHeight(props.collapsed ? 0 : 'auto');
    }, [props.collapsed]);

    return (
        <AnimateHeight
        duration={ 400 }
        height={animateHeightHeight}>
            <ul className={styles.headerNavLinkUl}>
                {renderNavLinks(props)}
                <li key={999} className="w-fit">
                    <ThemeButton />
                </li>
            </ul>
        </AnimateHeight>
    )
}

export default HeaderLinksMobile;