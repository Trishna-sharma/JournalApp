import { Link } from "react-router-dom"
import { Avatar } from "./blogCard"

export const AppBar = () => {
    return <div className="py-1 border-b flex justify-between px-6 items-center">
        <Link to={'/blogs'}>
            <div className="font-bold font-serif text-lg text-center">
            Mou Portfolio Journal App
            </div>
        </Link>

        <div className="flex items-center space-x-4">
            <Link to={'/publish'}>
                <button type="button" className="text-white
             bg-green-700 hover:bg-green-800 focus:outline-none
              focus:ring-4 focus:ring-green-300 font-medium 
              rounded-full text-sm px-5 py-2.5 text-center
               me-5" >PUBLISH</button>
            </Link>

            <Avatar className="flex items-center space-x-4 uppercase" name={localStorage.getItem("Username")}/>
                
            
        </div>
    </div>
}
