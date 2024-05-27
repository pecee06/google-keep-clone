import { createContext, useContext } from "react"

const TodoContext = createContext({
    todos: [
        // {
        //     id: "",
        //     title: "",
        //     note: "",
        //     completed: false,
        //     color: ""
        // }
    ],
    searchContent: "",
    setSearchContent: (content="")=>{},
    setTodos: (todos=[])=>{},
    addTodo: (todo={})=>{},
    editTodo: (id="", changes={})=>{},
    deleteTodo: (id="")=>{}
})

const TodoProvider = TodoContext.Provider

const useTodoContext = ()=>{
    return useContext(TodoContext)
}

export {TodoProvider, useTodoContext}