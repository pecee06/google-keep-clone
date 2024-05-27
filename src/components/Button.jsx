import { forwardRef } from "react"

const Button = forwardRef(({label="", className="", onClick=()=>{}, children, ...props}, ref) => {
  return (
    <button ref={ref} className={`${className}`} onClick={onClick} {...props} >
        {children}
        {label}
    </button>
  )
})

export default Button