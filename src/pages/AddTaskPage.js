import { useState } from "react";
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";
import { useTask } from "../Contexts/TasksProvider";
import DoneTask from "../components/Donetask";
import Header from "../components/Header";
import InProgressTasks from "../components/InProgressTask";
import NavBar from "../components/NavBar";
import RemainTask from "../components/RemainTask";
import prof from '../img/profile.png';

function AddTaskPage() {

    const StyleImage = {
        position: "absolute",
        right: "5rem",
        top: "3rem"
    }


    return (
        <div className='maincontainer'>
            <NavBar />

            <div className="container">
                {/* <img style={StyleImage} src={prof} alt="prof" /> */}
                <Header profileImageSrc={prof} filterOptions={["done", "Progress"]} showFilter={true} title="Add New Tasks" />

                <AddNewTask />


            </div>

        </div>
    )
}

export default AddTaskPage






function AddNewTask() {
    const { CreateTask } = useTask();
    const { tasks, setTask } = useTask();
    const [taskname, setTaskName] = useState("");
    const [state, setState] = useState("Remaining Tasks");
    const [priority, setPriority] = useState("High");

    const [duration, setDuration] = useState("");
    const [format, setFormat] = useState("Year");




    const formattedDueDate = () => {
        const currentDate = new Date();
        const dueDate = new Date(currentDate);

        switch (format) {
            case "Year":
                dueDate.setFullYear(currentDate.getFullYear() + duration);
                break;
            case "month":
                dueDate.setMonth(currentDate.getMonth() + duration);
                break;
            case "day":
                dueDate.setDate(currentDate.getDate() + duration);
                break;
            case "hour":
                dueDate.setTime(currentDate.getTime() + duration * 3600000); // Add 1 hour
                break;
            case "minute":
                dueDate.setMinutes(currentDate.getMinutes() + duration);
                break;
            default:
                break;
        }

        const year = dueDate.getFullYear().toString();
        const month = (dueDate.getMonth() + 1).toString().padStart(2, '0');
        const day = dueDate.getDate().toString().padStart(2, '0');
        const hour = dueDate.getHours().toString().padStart(2, '0');
        const minute = dueDate.getMinutes().toString().padStart(2, '0');
        const second = dueDate.getSeconds().toString().padStart(2, '0');

        return `${ year }-${ month }-${ day } ${ hour }:${ minute }:${ second }`;
    };






    const navigate = useNavigate();

    const handleInputChange = async (event) => {
        event.preventDefault();


        const newTask = {

            id: new Date(),
            name: taskname,
            priority: priority,
            due_date: formattedDueDate(),

            state: state,
            duration: duration

        };
        if (!taskname || !priority || !state || !duration) return;
        await CreateTask(newTask)
        navigate("/")

    };


    return (
        <>
            <form className="form" onSubmit={handleInputChange}>

                <div className="form-item">
                    <label>Task</label>
                    <input type="text" value={taskname} onChange={(e) => setTaskName(e.target.value)} />
                </div>
                <div className="form-item">

                    <label>state</label>
                    <select value={state} onChange={(e) => setState(e.target.value)}>
                        <option>Remaining Tasks</option>
                        <option>In Progress Tasks</option>
                        <option>Done Tasks</option>
                    </select>
                </div>
                <div className="form-item">
                    <label>due_date</label>
                    <input type="text"

                        value={
                            formattedDueDate()
                        }
                        readOnly
                    />



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
                    <input
                        type="Number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                    />
                </div>
                <div className="form-item">

                    <label>format</label>
                    <select value={format} onChange={(e) => setFormat(e.target.value)}>
                        <option>Year</option>
                        <option>month</option>
                        <option>day</option>
                        <option>hour</option>
                        <option>minute</option>
                    </select>
                </div>
                <div className="centered-form-item">
                    <button className="btn-submit">Submit</button>
                </div>
            </form>

        </>
    )
}
function Alltask() {

    return (
        <>
            <DoneTask />
            <InProgressTasks />
            <RemainTask />


        </>
    );
}