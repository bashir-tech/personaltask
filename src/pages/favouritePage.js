import React, { useState } from 'react';
import { useTask, } from '../Contexts/TasksProvider';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

import prof from "../img/img 1.png";

function favouritePage() {

    return (
        <main className="maincontainer">
            <NavBar />
            <div className="container">
                <Header title="♥️" showFilter={false} profileImageSrc={prof} />


                <Favourite />
            </div>

        </main>
    )

}

export default favouritePage



function Favourite({ format }) {

    const { tasks, isLoading, order, UpdastTaskState, DeleteTask, formatdate, calcDuration } = useTask();

    const inProgress = tasks.filter((t) => t.state === "In Progress Tasks");
    let OrderedTasks;
    if (order === "name") {
        OrderedTasks = inProgress.slice()
            .sort((a, b) => a.name.localeCompare(b.name));
    }
    if (order === "duration") {
        OrderedTasks = inProgress.slice()
            .sort((a, b) => Number(a.duration - b.duration));
    }
    else {
        OrderedTasks = inProgress.slice();
    }
    const pages = 3;
    const [currenPage, SetCurrentPage] = useState(1);


    const LastPage = currenPage * pages;
    const firtPage = LastPage - pages;
    const currentTask = OrderedTasks.slice(firtPage, LastPage);
    const TotalPages = Math.ceil(OrderedTasks.length / pages)

    function UpdastTask(id) {

        UpdastTaskState(id)
        console.log(id)
    }

    async function HandleDeleteTask(id) {
        DeleteTask(id)
        console.log(id)
    }
    function prev() {
        if (currenPage > 1)
            SetCurrentPage((prev) => currenPage - 1)
    }
    function next() {
        if (currenPage < TotalPages)
            SetCurrentPage((prev) => currenPage + 1)
    }



    return (
        <>

            {OrderedTasks.length > 0 && (
                <table>
                    <thead>

                        <tr className='for-th done'>

                            <th>Task</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Priority</th>
                            <th>Duration</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTask.map((progress) => (
                            <tr className='for-tr' key={progress.id}>

                                <td>{progress.name}</td>
                                <td className='state'>{progress.state}</td>
                                <td>{formatdate(progress.due_date)}



                                </td>
                                <td style={{ color: progress.priority === "High" ? "red" : progress.priority === "Medium" ? "green" : "yellow" }}>{progress.priority}</td>

                                <td> {calcDuration(progress.due_date)} </td>
                                <td className='btn'>
                                    {
                                        <button onClick={() => UpdastTask(progress.id)} style={{ color: "yellow" }}>Complete</button>}
                                    <button>✏️</button>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        HandleDeleteTask(progress.id
                                        )
                                    }}>❌</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table >
            )
            }
            {currentTask.length ?
                (<div className="Pagination">


                    <ion-icon
                        onClick={prev}
                        disabled={currenPage === 1}
                        name="arrow-back-circle-outline"
                    ></ion-icon>

                    <span>
                        {Array.from({ length: TotalPages }, (_, index) => {
                            return (
                                <span
                                    className={`num ${ currenPage === index + 1 ? "activee" : "" }`}
                                    onClick={() => SetCurrentPage(index + 1)}
                                    key={index}
                                >
                                    {index + 1}
                                </span>
                            );
                        })}
                    </span>

                    <ion-icon
                        onClick={next}
                        disabled={currenPage === TotalPages}
                        name="arrow-forward-circle-outline"
                    ></ion-icon>




                </div >) : ""}
        </>
    );
}


