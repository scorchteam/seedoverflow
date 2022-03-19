import { useState, useEffect, useContext } from "react";
import { ThemeStoreContext } from "../../../pages/_app";

export const ThemeButton = () => {
    const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);
    const { invertDarkMode } = useContext(ThemeStoreContext);

    useEffect(() => {
        setDarkMode(localStorage.getItem("darkmode") === "true");
    }, [])

    useEffect(() => {
        if (darkMode === undefined)
            return
        invertDarkMode();
        if (darkMode) {
            window.document.documentElement.classList.add('dark')
            localStorage.setItem("darkmode", "true")
        } else {
            window.document.documentElement.classList.remove('dark')
            localStorage.setItem("darkmode", "false")
        }
    }, [darkMode])

    const onClick = () => {
        setDarkMode(!darkMode);
    }
    
    return (
        <button onClick={() => onClick()} className="text-2xl">{darkMode === true ? "☀️" : "🌙"}</button>
    );
}