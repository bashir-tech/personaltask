import Header from "../components/Header";
import NavBar from "../components/NavBar";

import InProgressTasks from "../components/InProgressTask";
import prof from '../img/drak.png';
function InProgressTaskPage({ task, setTask, isOpen, setOpen, order, setOrder }) {


    return (
        <main className="maincontainer">
            <NavBar isOpen={isOpen} setOpen={setOpen} />
            <div className="container">
                <Header title="In Progress Tasks"
                    filterOptions={["name", "duration"]}
                    profileImageSrc={prof} color="green"
                    isOpen={isOpen} setOpen={setOpen}
                    order={order} setOrder={setOrder} />
                <InProgressTasks task={task} setTask={setTask} order={order} setOrder={setOrder} />


            </div>

        </main>
    )
}

export default InProgressTaskPage
