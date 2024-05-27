import { Outlet } from "react-router-dom"
import {Header, Container} from "./components/components"
import {ThemeProvider} from "./contexts/theme.context"
import {UserProvider} from "./contexts/user.context"
import {TodoProvider} from "./contexts/todo.context"
import { useState, useCallback, useEffect } from "react"
import authService from "./services/auth.service"
import { useNavigate } from "react-router-dom"

const Layout = () => {
  const [darkTheme, setDarkTheme] = useState(false)
  const [userData, setUserData] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchContent, setSearchContent] = useState("")
  const navigate = useNavigate()

  const toggleTheme = useCallback(()=>{
    setDarkTheme(prev => !prev)
  },[])

  const login = useCallback(()=>{
    setLoggedIn(true)
  },[])

  const logout = useCallback(()=>{
    setLoggedIn(false)
  },[])

  const addTodo = useCallback((todo={})=>{
    setTodos(prev => {
      let alreadyPresent = false
      prev.forEach(obj => {
        if (todo.id == obj.id)
          alreadyPresent = true
      })
      if (!alreadyPresent)
          return [...prev, todo]
      return prev
    })
  },[])

  const editTodo = useCallback((id="", changes={})=>{
    setTodos(prev => (
      prev.map(todo => {
        if (id == todo.id)
          return {...todo, ...changes}
        return todo
      })
    ))
  },[])

  const deleteTodo = useCallback((id="")=>{
    setTodos(prev => (
      prev.filter(todo => id != todo.id)
    ))
  },[])

  useEffect(()=>{
    const html = document.querySelector("html")
    if (darkTheme){
      html.classList.remove("light")
      html.classList.add("dark")
    }
    else{
      html.classList.remove("dark")
      html.classList.add("light")
    }
  },[darkTheme])

  return (
    <ThemeProvider value={{darkTheme, toggleTheme}}>
      <UserProvider value={{
        data: userData,
        setData: setUserData,
        loggedIn,
        login,
        logout
      }}>
        <TodoProvider value={{todos, setTodos, addTodo, editTodo, deleteTodo, searchContent, setSearchContent}}>
          <Container className="dark:bg-slate-900 dark:text-white flex flex-col gap-5">
            <Header/>
            <Outlet/>
          </Container>
        </TodoProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default Layout