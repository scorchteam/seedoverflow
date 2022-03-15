import { useState, useEffect } from "react";

export const ThemeButton = () => {
    const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        setDarkMode(localStorage.getItem("darkmode") === "true");
    }, [])

    useEffect(() => {
        if (darkMode === undefined)
            return
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