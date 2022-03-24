import { useEffect, useState } from "react";
import Image from "next/image";
import HeaderHamburger from "./HeaderHamburger/HeaderHamburger";
import HeaderLinksMobile from "./HeaderLinks/HeaderLinksMobile";
import HeaderLinksDesktop from "./HeaderLinks/HeaderLinksDesktop";
import Link from "next/link";

/**
 * Renders the header component to be used site-wide
 * @returns Rendered header component
 */
const Header = () => {
  //State
  const [navLinks] = useState<string[]>(["Profile"]);
  const [collapsed, updateCollapsed] = useState<boolean>(true);
  const [viewWidth, updateViewWidth] = useState<number>();

  //non-reactive vars
  const mobileBreakpoint = 768;
  const logoSize = 50;

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
        <nav className={`bg-light dark:bg-dark text-light-text dark:text-dark-text flex flex-col md:flex-row md:items-center md:justify-between h-full px-4 py-4`}>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <Link href={"/"}>
                <a>
                  <Image className="cursor-pointer" src="/seed.png" width={logoSize} height={logoSize} />
                </a>
              </Link>
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
