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






function AddNewTask() {
    const { CreateTask } = useTask();
    const { tasks, setTask } = useTask();
    const [taskname, setTaskName] = useState("");
    const [state, setState] = useState("");
    const [priority, setPriority] = useState("High");

    const [duration, setDuration] = useState("");
    const [format, setFormat] = useState("year");




    const formattedDueDate = () => {
        const currentDate = new Date();
        const dueDate = new Date(currentDate);

        switch (format) {
            case "year":
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

        const year = dueDate.getFullYear().toString(); // Get last 2 digits of the year
        const month = (dueDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month and pad with leading zero if necessary
        const day = dueDate.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zero if necessary
        const hour = dueDate.getHours().toString().padStart(2, '0'); // Get the hour and pad with leading zero if necessary
        const minute = dueDate.getMinutes().toString().padStart(2, '0'); // Get the minute and pad with leading zero if necessary
        const second = dueDate.getSeconds().toString().padStart(2, '0'); // Get the second and pad with leading zero if necessary

        return `${ year }-${ month }-${ day } ${ hour }:${ minute }:${ second }`;
    };





    // const formattedDueDate = () => {
    //     const currentDate = new Date();
    //     const dueDate = new Date(currentDate);

    //     switch (format) {
    //         case "year":
    //             dueDate.setFullYear(currentDate.getFullYear() + Number(duration)).toLocaleString();
    //             break;
    //         case "month":
    //             dueDate.setMonth(currentDate.getMonth() + Number(duration));
    //             break;
    //         case "day":
    //             dueDate.setDate(currentDate.getDate() + Number(duration));
    //             break;
    //         case "hour":
    //             dueDate.setTime(currentDate.getTime() + Number(duration) * 60 * 60 * 1000);
    //             break;
    //         case "minute":
    //             dueDate.setMinutes(currentDate.getMinutes() + Number(duration));
    //             break;
    //         default:
    //             break;
    //     }




    //     return dueDate.toLocaleTimeString(undefined, {
    //         year: format === "year" ? "numeric" : undefined,
    //         month: format === "month" ? "long" : undefined,
    //         day: format === "day" ? "numeric" : undefined,
    //         hour: format === "hour" ? "numeric" : undefined,
    //         minute: format === "minute" ? "numeric" : undefined,
    //         second: format === "second" ? "numeric" : undefined,

    //     });
    // };



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
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                    />
                </div>
                <div className="form-item">

                    <label>format</label>
                    <select value={format} onChange={(e) => setFormat(e.target.value)}>
                        <option>year</option>
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
function Alltask({ task, setTask }) {

    return (
        <>
            <DoneTask />
            <InProgressTasks />
            <RemainTask />


        </>
    );
}