import ThemedHamburgerSvg from "../../common-components/HamburgerSvg/ThemedHamburgerSvg"

interface props {
    onClick: any /** Function to execute on click of icon */
}

/**
 * Renders the themed hamburger icon
 * @param props props
 * @returns Themed version of the hamburger icon
 */
const HeaderHamburger = (props: props) => {
    return (
        <ThemedHamburgerSvg className="md:hidden" onClick={props.onClick} />
    )
}

export default HeaderHamburger;