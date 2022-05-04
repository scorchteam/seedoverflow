import { useContext } from "react";
import { UserStoreContext } from "../../../pages/_app";
import NavLink from "../../common-components/Link/NavLink";

interface navLinksProps {
    linkTextArray: HeaderLink[],
    userLoggedIn: boolean | undefined
}

export interface HeaderLink {
    linkText: string,
    href: string,
    needAuth?: boolean,
    unilateral?: boolean
}

export const logoutLoginExcludedPathnames = ["/logout", "/login"];

/**
 * Renders navigation links used in the site-wide header
 * @param props props
 * @returns Common function to render navigation links in the header
 */
export const renderNavLinks = (props: navLinksProps) => {
    const navLinksRendered = props.linkTextArray.map((headerLink, index) => {
        if (!headerLink.unilateral) {
            if (props.userLoggedIn !== undefined && !props.userLoggedIn && headerLink.needAuth)
                return
            if (props.userLoggedIn !== undefined && props.userLoggedIn && !headerLink.needAuth)
                return
        }
        return <li key={index} className="w-fit"><NavLink href={`/${headerLink.href}`} linkText={headerLink.linkText}/></li>
    });
    return navLinksRendered;
}