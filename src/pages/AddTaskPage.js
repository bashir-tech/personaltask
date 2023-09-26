import { useState } from "react";
import DoneTask from "../components/Donetask";
import Header from "../components/Header";
import InProgressTasks from "../components/InProgressTask";
import NavBar from "../components/NavBar";
import RemainTask from "../components/RemainTask";
import prof from '../img/profile.png';
function AddTaskPage({ task, setTask, isOpen, setOpen }) {

    const StyleImage = {
        position: "absolute",
        right: "5rem",
        top: "3rem"
    }


    return (
        <div className='maincontainer'>
            <NavBar isOpen={isOpen} setOpen={setOpen} />

            <div className="container">
                {/* <img style={StyleImage} src={prof} alt="prof" /> */}
                <Header profileImageSrc={prof} filterOptions={["done", "Progress"]} isOpen={isOpen} setOpen={setOpen} showFilter={true} title="Add New Tasks" />

                <AddNewTask task={task} setTask={setTask} />
                <Alltask task={task} setTask={setTask} />

            </div>

        </div>
    )
}

export default AddTaskPage






function AddNewTask({ task, setTask }) {
    const [taskname, setTaskName] = useState("");
    const [state, setState] = useState("");
    const [id, setId] = useState("");
    const [priority, setPriority] = useState("High");
    const [data, setData] = useState("");
    const [duration, setDuration] = useState("");
    function AddTask(task) {
        setTask((tasks) => [...tasks, task]);

    }


    const handleInputChange = (event) => {
        event.preventDefault();
        const newTask = {

            id: task.length + 1,
            name: taskname,
            priority: priority,
            due_date: data,
            state: state,
            duration: duration

        };
        if (!taskname || !priority || !data || !state || !duration) return;
        AddTask(newTask);

    };



    return (
        <>
            <form className="form" onSubmit={handleInputChange}>
                <div className="form-item">
                    <label>ID</label>
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div className="form-item">
                    <label>Task</label>
                    <input type="text" value={taskname} onChange={(e) => setTaskName(e.target.value)} />
                </div>
                <div className="form-item">
                    <label>State</label>
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
                </div>
                <div className="form-item">
                    <label>due_date</label>
                    <input type="text" value={data} onChange={(e) => setData(Number(e.target.value))} />
                </div>
                <div className="form-item">
                    <label>Priority</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>
                <div className="form-item">
                    <label>Duration</label>
                    <input type="text" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
                </div>
                <div className="centered-form-item">
                    <button className="btn-submit">Submit</button>
                </div>
            </form>

        </>
    )
}
function Alltask({ task, setTask }) {

    return (
        <>
            <DoneTask task={task} setTask={setTask} />
            <InProgressTasks task={task} setTask={setTask} />
            <RemainTask task={task} setTask={setTask} />


        </>
    );
}