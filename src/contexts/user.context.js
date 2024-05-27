import { createContext, useContext } from "react"

const UserContext = createContext({
    data: {},
    setData: (data={})=>{},
    loggedIn: false,
    login: ()=>{},
    logout: ()=>{}
})

const useUserContext = ()=>{
    return useContext(UserContext)
}

const UserProvider = UserContext.Provider

export {UserProvider, useUserContext}