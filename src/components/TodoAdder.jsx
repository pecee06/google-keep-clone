import { useForm } from "react-hook-form"
import {Input, Button} from "./components"
import dbService from "../services/db.service"
import { useUserContext } from "../contexts/user.context"
import {useTodoContext} from "../contexts/todo.context"

const TodoAdder = ({label="add", className="", style={}, todo={}, setShowModal=()=>{}}) => {
    const {register, handleSubmit, formState, setValue, watch} = useForm({
        defaultValues:{
            title: todo.title || "",
            note: todo.note || "",
            color: todo.color || "#FFBA00"
        }
    })
    const {errors} = formState
    const {data} = useUserContext()
    const {addTodo, editTodo} = useTodoContext()
    const watchColor = watch("color")

  return (
    <div className={`shadow-lg rounded lg:w-1/2 ${!todo.title && "w-3/4"} p-10 ${className}`} style={{backgroundColor: watchColor, ...style}}>
        <form noValidate className="flex flex-col">
            <div className="flex flex-col gap-1">
                <Input placeholder="Title" className="text-lg bg-transparent p-2 focus:outline-0" {...register("title",{
                    required: "This is a required field"
                })} />
                <p className="text-red-600">{errors.title?.message}</p>
            </div>

            <div className="flex flex-col gap-1">
                <Input placeholder="Take a note..." className=" bg-transparent p-2 focus:outline-0" {...register("note",{
                    required: "This is a required field"
                })} />
                <p className="text-red-600">{errors.title?.message}</p>
            </div>
            <div className="flex justify-around">
                <div className="flex flex-col gap-1 items-center">
                    <Input label="Color Picker" type="color" {...register("color")} />
                </div>
                <Button label={label} className="font-bold uppercase text-gray-700 dark:text-white shadow-lg py-2 px-4" onClick={handleSubmit(formData => {
                    if (label == "add"){
                        dbService.insert({
                            collectionName: "Todo",
                            data: {
                                ...formData,
                                completed: false,
                                userId: data.uid
                            }
                        })
                        .then(doc => {
                            addTodo({
                                id: doc.id,
                                title: formData.title,
                                note: formData.note,
                                completed: false,
                                color: formData.color
                            })
                        })
                        .catch(err => {
                            alert(err.message)
                            console.error(err)
                        })
                        .finally(()=>{
                            setValue("title","")
                            setValue("note","")
                            setValue("color", todo.color || "#FFBA00")
                        })
                    }
                    else{
                        dbService.update({
                            collectionName: "Todo",
                            id: todo.id,
                            changes: {
                                title: formData.title,
                                note: formData.note,
                                color: formData.color
                            }
                        })
                        .then(()=>{
                            editTodo(
                                todo.id,
                                {
                                    title: formData.title,
                                    note: formData.note,
                                    color: formData.color
                                }
                            )
                        })
                        .catch(err => {
                            alert(err.message)
                            console.error(err)
                        })
                        .finally(()=>{
                            setShowModal(false)
                        })
                    }
                })} />
            </div>
        </form>
    </div>
  )
}

export default TodoAdder