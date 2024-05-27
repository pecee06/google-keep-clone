import { forwardRef } from "react"
import { useId } from "react"

const Input = forwardRef(({label="", type="text", className="", ...props}, ref) => {
  const id = useId()
  return (
    <>
        {label &&
            <label htmlFor={id}>{label}</label>
        }
        <input id={id} ref={ref} type={type} className={`${className}`} {...props} />
    </>
  )
})

export default Input