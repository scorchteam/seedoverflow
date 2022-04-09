import { useContext, useEffect } from "react";
import { UserStoreContext } from "../../../pages/_app";
import Button from "../../common-components/Button/Button";
import { ThemeButton } from "../../common-components/ThemeButton/ThemeButton";
import styles from "../Header.module.css";
import { HeaderLink, logoutLoginExcludedPathnames, renderNavLinks } from "./HeaderLinkHelpers";
import { useRouter } from "next/router";

interface props {
    linkTextArray: HeaderLink[],
    userLoggedIn: boolean | undefined
}

/**
 * Renders the nav links for the site-wide desktop header
 * @param props props
 * @returns Rendered navigation links for the desktop header
 */
const HeaderLinksDesktop = (props: props) => {
    const router = useRouter();
    const { userLoggedIn } = useContext(UserStoreContext);

    return (
        <ul className={styles.headerNavLinkUl}>
            {renderNavLinks(props)}
            <ThemeButton />
            {
                !logoutLoginExcludedPathnames.includes(router.pathname) &&
                userLoggedIn &&
                <Button buttonText="Logout" onClick={() => {router.push("/logout")}}></Button>
            }
            {
                    !logoutLoginExcludedPathnames.includes(router.pathname) &&
                    userLoggedIn !== undefined &&
                    !userLoggedIn &&
                    <Button buttonText="Login/Register" onClick={() => {router.push("/login")}}></Button>
                }
        </ul>
    )
}

export default HeaderLinksDesktop;