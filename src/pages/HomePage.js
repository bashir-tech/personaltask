
import Dashboard from "../components/DashBoard"
import NavBar from "../components/NavBar"


function HomePage({ task, setTask, isOpen, setOpen, order, setOrder }) {

    return (

        <div className='maincontainer'>
            <NavBar isOpen={isOpen} setOpen={setOpen} />

            <Dashboard task={task} setTask={setTask} isOpen
                ={isOpen} setOpen={setOpen} order={order} setOrder={setOrder} />


        </div>
    )
}

export default HomePage
