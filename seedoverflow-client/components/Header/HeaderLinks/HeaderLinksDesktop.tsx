import { ThemeButton } from "../../common-components/ThemeButton/ThemeButton";
import styles from "../Header.module.css";
import { renderNavLinks } from "./HeaderLinkHelpers";

interface props {
    linkTextArray: string[]
}

/**
 * Renders the nav links for the site-wide desktop header
 * @param props props
 * @returns Rendered navigation links for the desktop header
 */
const HeaderLinksDesktop = (props: props) => {
    return (
        <ul className={styles.headerNavLinkUl}>
            {renderNavLinks(props)}
            <ThemeButton />
        </ul>
    )
}

export default HeaderLinksDesktop;