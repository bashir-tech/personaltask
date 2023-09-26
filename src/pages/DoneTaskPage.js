


import DoneTask from "../components/Donetask";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

import prof from '../img/profile.png';
function DoneTaskPage({ task, setTask, isOpen, setOpen, order, setOrder }) {
    return (
        <main className="maincontainer">
            <NavBar isOpen={isOpen} setOpen={setOpen} />
            <div className="container">
                <Header title="Done Tasks" filterOptions={["name", "duration"]} order={order} setOrder={setOrder} profileImageSrc={prof} isOpen={isOpen} setOpen={setOpen} />
                <DoneTask task={task} setTask={setTask} order={order} setOrder={setOrder} />


            </div>

        </main>
    )
}

export default DoneTaskPage
