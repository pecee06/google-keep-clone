import { createContext, useContext } from "react"

const ThemeContext = createContext({
    darkTheme: false,
    toggleTheme: ()=>{}
})

const ThemeProvider = ThemeContext.Provider

const useThemeContext = ()=>{
    return useContext(ThemeContext)
}

export {ThemeProvider, useThemeContext}