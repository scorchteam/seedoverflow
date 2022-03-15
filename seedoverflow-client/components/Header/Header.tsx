import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import HeaderHamburger from "./HeaderHamburger/HeaderHamburger";
import HeaderLinksMobile from "./HeaderLinks/HeaderLinksMobile";
import HeaderLinksDesktop from "./HeaderLinks/HeaderLinksDesktop";
import { ThemeStoreContext } from "../../pages/_app";
import { ThemeButton } from "../common-components/ThemeButton/ThemeButton";

/**
 * Renders the header component to be used site-wide
 * @returns Rendered header component
 */
const Header = () => {
  //State
  const [navLinks] = useState<string[]>(["Home", "Trending", "Profile"]);
  const [collapsed, updateCollapsed] = useState<boolean>(true);
  const [viewWidth, updateViewWidth] = useState<number>();

  const { darkModeBackgroundColor, lightModeBackgroundColor, lightModeTextColor, darkModeTextColor } = useContext(ThemeStoreContext);

  //non-reactive vars
  const mobileBreakpoint = 768;
  const logoSize = 60;

  /** Setup window resize watcher in case view transitions */
  useEffect(() => {
    updateViewWidth(window.innerWidth);
    const handleWidthResize = () => updateViewWidth(window.innerWidth);
    window.addEventListener("resize", handleWidthResize);
    return () => window.removeEventListener("resize", handleWidthResize);
  }, []);

  /** Check if in mobile view (= below mobileBreakpoint) */
  const isInMobile = () => {
    return (viewWidth && viewWidth < mobileBreakpoint);
  }

  /** Navbar collapse function to pass to hamburger component */
  const invertCollapse = () => {
    updateCollapsed(!collapsed);
  }

  return (
    <div className={``}>
      <header className="h-auto w-full md:container md:mx-auto">
        <nav className={`${lightModeBackgroundColor} ${darkModeBackgroundColor} ${lightModeTextColor} ${darkModeTextColor} flex flex-col md:flex-row md:items-center md:justify-between h-full px-4 py-4`}>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <Image src="/react.png" width={logoSize} height={logoSize} />
              {/* Possible Future Title Location */}
            </div>
            <HeaderHamburger onClick={invertCollapse} />
          </div>
          {
            isInMobile() ?
            <HeaderLinksMobile
              linkTextArray={navLinks}
              collapsed={collapsed}/> :
            <HeaderLinksDesktop
              linkTextArray={navLinks}/>
          }
        </nav>
      </header>
    </div>
  )
}

export default Header
