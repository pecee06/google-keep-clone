import {TodoAdder, Todo} from "../components/components"
import { Navigate } from "react-router-dom"
import { useUserContext } from "../contexts/user.context"
import { useTodoContext } from "../contexts/todo.context"
import { useEffect, useState } from "react"
import dbService from "../services/db.service"

const Home = () => {
  const {data} = useUserContext()
  const {todos, setTodos, searchContent} = useTodoContext()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    dbService.fetchData({
      collectionName: "Todo",
      userId: data.uid
    })
    .then(res => {
      if (res) setTodos(res)
    })
    .catch(err => {
      console.error(err)
    })
    .finally(()=>{
      setLoading(false)
    })
  },[data.uid])

  if (Object.keys(data) == 0) return <Navigate to="/signup" />
  if (loading) return (
    <div className="h-[50vh] flex justify-center items-center dark:bg-slate-900 dark:text-white">
      <h1 className="font-bold" style={{fontSize: "4vmax"}}>Loading...</h1>
    </div>
  )
  return (
    <div className="flex flex-col items-center gap-16 p-8">
      <TodoAdder/>
      <div className="grid grid-cols-2 lg:grid-cols-3 justify-items-center w-[80vw] gap-3">
        {
          todos.filter(todo => todo.title.toLowerCase().includes(searchContent) || todo.note.toLowerCase().includes(searchContent))
          .map((todo, index)=>(
            <Todo key={index} todo={todo}/>
          ))
        }
      </div>
    </div>
  )
}

export default Home