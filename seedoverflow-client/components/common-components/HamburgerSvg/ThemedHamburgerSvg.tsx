import HamburgerSvg from "./HamburgerSvg";

interface props {
    onClick?: any,
    className?: string
}

/**
 * Styles the hamburger icon to use color-palette
 * @param props props
 * @returns Themed render of the hamburger svg icon
 * @todo Add website color palette
 */
const ThemedHamburgerSvg = (props: props) => {
    return (
        <HamburgerSvg
            fillColor="black"
            outerDivClassName={`hover:bg-white transition-all cursor-pointer ${props.className}`}
            onClick={props.onClick}
        />
    );
}

export default ThemedHamburgerSvg