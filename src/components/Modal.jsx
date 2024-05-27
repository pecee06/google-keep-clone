import { createPortal } from "react-dom"
import { useEffect } from "react"
import {TodoAdder} from "./components"

const Modal = ({setShowModal=()=>{}, todo={}}) => {
    useEffect(()=>{
        // This task is performed when this component is mounted
        const body = document.querySelector("body")
        body.style.overflowY = "hidden"
        return ()=>{
            // This task is performed when this component is unmounted
            body.style.overflowY = "scroll"
        }
    },[])

	return createPortal(
        <>
            <div className="h-screen w-screen bg-[#000000ad] fixed top-0 left-0" onClick={()=>{
                setShowModal(false)
            }}></div>

            <div className="rounded fixed top-1/2 left-1/2 w-[60vw] bg-[#fff9] lg:p-10 p-4" style={{transform: "translate(-50%, -50%)"}}>
                <TodoAdder todo={todo} label="save" setShowModal={setShowModal} className="lg:w-full w-full" />
            </div>
        </>,
        document.querySelector("#popup-window")
	)
}

export default Modal;
