import Header from "../components/Header";
import NavBar from "../components/NavBar";
import RemainTask from "../components/RemainTask";

import prof from '../img/drak.png';
function RemainingTaskPage({ task, setTask, isOpen, setOpen, order, setOrder }) {
    return (
        <main className="maincontainer">
            <NavBar isOpen={isOpen} setOpen={setOpen} />
            <div className="container">
                <Header title="Remaining  Tasks" filterOptions={["name", "duration"]}
                    order={order}
                    setOrder={setOrder}
                    profileImageSrc={prof} color="red" isOpen={isOpen} setOpen={setOpen} />
                <RemainTask task={task} setTask={setTask} order={order} setOrder={setOrder} />


            </div>

        </main>
    )
}

export default RemainingTaskPage
