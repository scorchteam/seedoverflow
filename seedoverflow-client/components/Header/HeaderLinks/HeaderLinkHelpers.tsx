import NavLink from "../../common-components/Link/NavLink";

interface navLinksProps {
    linkTextArray: string[]
}

/**
 * Renders navigation links used in the site-wide header
 * @param props props
 * @returns Common function to render navigation links in the header
 */
export const renderNavLinks = (props: navLinksProps) => {
    const navLinksRendered = props.linkTextArray.map((linkText, index) => {
        return <li key={index} className="w-fit"><NavLink href={`/${linkText}`} linkText={linkText}/></li>
    });
    return navLinksRendered;
}