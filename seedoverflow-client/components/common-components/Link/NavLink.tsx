import Link from 'next/link';
import styles from "./NavLink.module.css";

interface props {
    href: string,
    linkText: string
}

/**
 * Renders navigation link
 * @param props props
 * @returns Rendered navigation link
 * @todo Add website color palette
 */
const NavLink = (props: props) => {
    return (
        <Link href={props.href}>
           <a className={`text-2xl font-semibold text-main-text-color ${styles.a}`}>{props.linkText}</a> 
        </Link>
    )
}

export default NavLink;