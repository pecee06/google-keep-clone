import { useNavigate } from "react-router-dom"
import {keepIcon, searchIcon, themeIcon} from "../assets/assets"
import { useUserContext } from "../contexts/user.context"
import {useThemeContext} from "../contexts/theme.context"
import { useTodoContext } from "../contexts/todo.context"
import {Input, Button} from "./components"
import authService from "../services/auth.service"

const Header = () => {
  const {loggedIn, logout, data} = useUserContext()
  const {toggleTheme} = useThemeContext()
  const navigate = useNavigate()
  const {searchContent, setSearchContent} = useTodoContext()

  return (
    <nav className="flex justify-between">
      <div className="flex gap-1 items-center cursor-pointer" onClick={()=>{
        navigate("/")
      }}>
        <img src={keepIcon} width={55} height={55} />
        <h3 className="text-lg font-bold">Keep</h3>
      </div>

      {loggedIn &&
        <div className="flex items-center px-4 gap-3 w-[40vw] bg-gray-100 rounded">
          <img src={searchIcon} width={30} height={30} />
          <Input placeholder="Search" value={searchContent} className="w-full py-2 text-black px-3 bg-gray-100 focus:outline-0 focus:bg-gray-200 transition-all rounded" onChange={e => {
            setSearchContent(e.target.value)
          }} />
        </div>
      }

      <div className="flex items-center gap-4">
        <img src={themeIcon} width={30} height={30} onClick={toggleTheme} className="cursor-pointer" />
        {loggedIn &&
        <>
          <span className="bg-gray-50 text-lg rounded p-2 text-black">{data.name || "User"}</span>
          <Button label="Logout" className="bg-[#ffba00] text-white text-lg p-2 rounded" onClick={()=>{
            authService.logout()
            .then(()=>{
              logout()
              navigate("/signup")
            })
            .catch(err => {
              alert(err.message)
            })
          }}/>
        </>
        }
      </div>
    </nav>
  )
}

export default Header