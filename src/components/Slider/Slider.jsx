import {createContext, useContext, useState} from "react";

export const Slider = () => {
    const themes = {
        light: {
            foreground: "#000000",
            background: "#eeeeee",
            status: "light",
        },
        dark: {
            foreground: "#ffffff",
            background: "#222222",
            status: "dark",

        }
    };

    const [currentTheme, setTheme] = useState(themes.light);

    const ThemeContext = createContext(currentTheme);

    return (
            <ThemeContext.Provider value={currentTheme}>
                <ThemedButton />
            </ThemeContext.Provider>
        );

    function ThemedButton() {
        const theme = useContext(ThemeContext);
        const newTheme = theme.status === themes.light.status? themes.dark : themes.light;
        return (
            <button onClick={()=> setTheme(newTheme)}
                    style={{ background: theme.background, color: theme.foreground }}
            >
                Toggle
            </button>
        );
    }
}