interface props {
    svgClassName?: string,
    outerDivClassName?: string,
    fillColor?: string,
    onClick?: any
}

/**
 * Hamburger icon component, non-styled
 * @param props props
 * @returns Common hamburger icon, non-styled
 */
const HamburgerSvg = (props : props) => {
    return (
        <div className={`h-8 w-8 select-none rounded-md ${props.outerDivClassName}`} onClick={() => props.onClick()}>
            <svg viewBox="0 0 20 20" className={props.svgClassName}>
              <path fill={props.fillColor} d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
            </svg>
        </div>
    )
}

export default HamburgerSvg