import {Input, Button} from "./components"
import { useForm } from "react-hook-form"
import authService from "../services/auth.service"
import { useUserContext } from "../contexts/user.context"
import { useNavigate, Link } from "react-router-dom"
import { useCallback } from "react"
import { googleIcon } from "../assets/assets"

const Auth = ({label="signup"}) => {
  const {register, handleSubmit, setValue, formState} = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })
  const {errors} = formState
  const {login, setData} = useUserContext()
  const navigate = useNavigate()

  const authenticate = useCallback((formData={}, f=()=>{})=>{
    f({
      email: formData.email,
      password: formData.password
    })
    .then(res => {
      if (res){
        setData({...authService.getCurrentUser(), name: formData.name})
        login()
        navigate("/")
      }
    })
    .catch(err => {
      alert(err.message)
      console.error(err)
    })
    .finally(()=>{
      setValue("name","")
      setValue("email","")
      setValue("password","")
    })
  },[])

  return (
    <div className="h-[75vh] flex flex-col items-center justify-center py-4 bg-gray-100 dark:bg-slate-600 rounded gap-5">
      <div className="flex gap-3 items-center">
        <img src={googleIcon} className="h-[6vh]" />
        <h2 className="font-bold uppercase" style={{fontSize: "3vmax"}}>{label}</h2>
      </div>
        <form noValidate className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Input className="w-[40vw] p-2 rounded dark:focus:outline-0 text-black" label="Name" {...register("name",{
              required: {
                value: true,
                message: "This is a required field"
              }
            })} />
            <p className="text-red-600">{errors.name?.message}</p>
          </div>

          <div className="flex flex-col gap-1">
            <Input className="w-[40vw] p-2 rounded dark:focus:outline-0 text-black" label="Email" type="email" {...register("email",{
              required: {
                value: true,
                message: "This is a required field"
              },
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                message: "Enter a valid email"
              }
            })} />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>

          <div className="flex flex-col gap-1">
            <Input className="w-[40vw] p-2 rounded dark:focus:outline-0 text-black" label="Password" type="password" {...register("password",{
              required: {
                value: true,
                message: "This is a required field"
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[!@#$%^&*()_+-=:;'<>,.?/\|])[^\s]{10,}$/,
                message: "Password should atleast be 10 characters long and should contain numbers and special characters"
              }
            })} />
            <p className="text-red-600">{errors.password?.message}</p>
          </div>

          <Button label={label} className="text-lg uppercase bg-[#ffba00] hover:bg-yellow-500 transition-all p-2 text-white rounded" onClick={handleSubmit(formData => {
            if (label == "signup")
              authenticate(formData, authService.signup)
            else authenticate(formData, authService.login)
          })} />
        </form>
        <Link className="text-sm text-blue-500" to={label == "signup" ? "/login":"/"} >{label == "signup" ? "Already having an account? Sign In from here":"Not having an account? Signup from here"}</Link>
    </div>
  )
}

export default Auth