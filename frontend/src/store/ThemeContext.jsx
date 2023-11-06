"use client";
import React, { useState, createContext, useEffect } from "react";

const ThemeContext = createContext({
    setTheme: () => {},
    theme: String,
});

export function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState();

    useEffect(() => {
        if (!theme) return setTheme(localStorage.getItem('theme') === "dark" ? "dark" : "light");

        document.querySelector(':root').dataset.theme = theme
        localStorage.setItem('theme', theme)

        const useSetTheme = (e) => { setTheme(e.matches ? 'dark' : 'light') }
        const watchSysTheme = window.matchMedia('(prefers-color-scheme: dark)')

        watchSysTheme.addEventListener('change', useSetTheme);

        function changeTheme() {
            setTheme(localStorage.getItem('theme') === "dark" ? "dark" : "light");
        }
        window.addEventListener("storage", changeTheme);

        return () => {
            watchSysTheme.removeEventListener('change', useSetTheme);
            removeEventListener("storage", changeTheme);
        }
    }, [theme])

    return (
        <ThemeContext.Provider
            value={{
                setTheme,
                theme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;