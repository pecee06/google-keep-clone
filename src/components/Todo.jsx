import {Button, Modal} from "./components"
import { checkIcon, deleteIcon } from "../assets/assets"
import { useState } from "react"
import dbService from "../services/db.service"
import { useTodoContext } from "../contexts/todo.context"

const Todo = ({todo={}}) => {
  const [completed, setCompleted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const {deleteTodo} = useTodoContext()

  return (
    <>
      <div className="rounded p-4 lg:w-[22vw] w-[40vw] flex flex-col gap-5" style={{backgroundColor: todo.color}}>
        <div className="flex justify-between">
          <h3 className="font-bold shadow-sm lg:w-[15vw] w-[30vw] cursor-default px-2 rounded" onClick={()=>{setShowModal(true)}}>{todo.title}</h3>
          <Button className="bg-white p-1" style={{borderRadius: "50%"}} onClick={()=>{
            dbService.delete({
              collectionName: "Todo",
              id: todo.id
            })
            .then(()=>{
              deleteTodo(todo.id)
            })
            .catch(err => {
              alert(err.message)
              console.error(err)
            })
          }}>
            <img src={deleteIcon} />
          </Button>
        </div>
          <div className={`flex gap-5 items-center ${completed && "line-through"}`}>
            <Button className="border border-black w-7 h-7" onClick={()=>{
              dbService.update({
                collectionName: "Todo",
                id: todo.id,
                changes: {completed: !completed}
              })
              .then(() => {
                setCompleted(prev => !prev)
              })
              .catch(err => {
                console.error(err)
              })
            }}>
              {completed &&
                <img src={checkIcon} />
              }
            </Button>
            <p className="lg:w-[18vw] w-[30vw] overflow-x-hidden whitespace-nowrap overflow-ellipsis shadow-sm cursor-default p-2 rounded" onClick={()=>{setShowModal(true)}}>{todo.note}</p>
          </div>
      </div>
      {
      showModal &&
        <Modal setShowModal={setShowModal} todo={todo}/>
      }
    </>
  )
}

export default Todo