
import { useState } from "react"
import Dashboard from "../components/DashBoard"
import NavBar from "../components/NavBar"


function HomePage() {
    const [isOpen, setOpen] = useState(false)

    return (

        <div className='maincontainer'>
            <NavBar isOpen={isOpen} setOpen={setOpen} />

            <Dashboard isOpen={isOpen} setOpen={setOpen}
            />


        </div>
    )
}

export default HomePage
