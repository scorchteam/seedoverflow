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
        <Link href={props.href.toLowerCase()}>
           <a className={`${styles.a} dark:text-purple dark:hover:text-purple dark:after:bg-purple`}>{props.linkText}</a> 
        </Link>
    )
}

export default NavLink;