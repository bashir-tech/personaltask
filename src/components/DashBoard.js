
import 'aos/dist/aos.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTask } from '../Contexts/TasksProvider';
import prof from '../img/drak.png';
import Chart from './Chart';
import DoneTask from './Donetask';
import Header from './Header';
import InProgressTask from './InProgressTask';
import RemainTask from './RemainTask';
import Spinner from './Spinner';

export default function Dashboard() {



    return (
        <div className="container">

            <Home />



        </div >

    )
}

function Home() {
    const { task, isLoading } = useTask();
    return (

        <>
            <Header profileImageSrc={prof} color='green' filterOptions={["name", "duration"]}
            />
            <Chart task={task} />


            <TaskSummary />
            <Table />


        </>

    )
}




function TaskSummary() {
    const { tasks, setTask, isLoading } = useTask();
    const done = tasks.filter((t) => t.state === "Done Tasks");
    const inProgress = tasks.filter((t) => t.state === "In Progress Tasks");
    const Remaining = tasks.filter((t) => t.state === "Remaining Tasks");

    const categories = [
        {
            category: "Done Tasks", tasks: done, className: "box done", route: "/donetask", icon: <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
        },
        { category: "In Progress Tasks", tasks: inProgress, className: "box progress", route: "/progresstask", icon: <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80ZM253-253l227-227v-320q-134 0-227 93t-93 227q0 64 24 123t69 104Z" /></svg> },
        { category: "Remaining Tasks", tasks: Remaining, className: "box remain", route: "/remaintask", icon: <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M424-320q0-81 14.5-116.5T500-514q41-36 62.5-62.5T584-637q0-41-27.5-68T480-732q-51 0-77.5 31T365-638l-103-44q21-64 77-111t141-47q105 0 161.5 58.5T698-641q0 50-21.5 85.5T609-475q-49 47-59.5 71.5T539-320H424Zm56 240q-33 0-56.5-23.5T400-160q0-33 23.5-56.5T480-240q33 0 56.5 23.5T560-160q0 33-23.5 56.5T480-80Z" /></svg> },
    ];

    if (isLoading)
        return <Spinner />
    return (
        <div className="summaryContainer">
            {categories.map((category) => (
                <div className={category.className} key={category.category}>
                    {category.icon}
                    <span className='title'>{category.category}</span>
                    <span className='no'>{category.tasks.length}</span>
                    <Link className='seemore' to={category.route}><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M176 262.62L256 342l80-79.38M256 330.97V170" /><path d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" /></svg></Link>

                </div>
            ))}
        </div>
    );
}

function Table() {

    return (


        <div className='table'>

            <Hero />

            <DoneTask />
            <InProgressTask />
            <RemainTask />




        </div>
    )
}








function Hero() {
    const { tasks } = useTask();
    return (
        <>
            {tasks.length > 0 ? <div className='table-title'>
                <thead className="tableList">
                    <h1>All Tasks</h1>
                    <li>
                        <a href='#'> UI Design  </a>

                    </li>
                    <li>
                        <a href='#'> Test and Maintenance </a>

                    </li>
                    <li>
                        <a href='#'> Algorithm   </a>

                    </li>
                    <li>
                        <a href='#'> Development   </a>

                    </li>

                </thead>

                <select className='filter'>
                    <option> Date</option>
                    <option> Duration</option>
                </select>



            </div> : ""}
        </>


    )
}




