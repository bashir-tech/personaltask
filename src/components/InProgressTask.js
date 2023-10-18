import React, { useState } from 'react';
import { useTask } from '../Contexts/TasksProvider';
function InProgressTasks() {

    const { task, setTask, order, setOrdre } = useTask();

    const inProgress = task.filter((t) => t.state === "In Progress Tasks");
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
        setTask((tasks) => tasks.map((task) => task.id === id ? { ...task, state: "Done Tasks" } : task))
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
                        {currentTask.map((progress, index) => (
                            <tr className='for-tr' key={index}>

                                <td>{progress.name}</td>
                                <td className='state'>{progress.state}</td>
                                <td>{progress.due_date}</td>
                                <td style={{ color: progress.priority === "High" ? "red" : progress.priority === "Medium" ? "green" : "yellow" }}>{progress.priority}</td>

                                <td> {progress.duration > 1 ? `${ progress.duration } Days` : `${ progress.duration } Day`} </td>
                                <td className='btn'>
                                    <button onClick={() => UpdastTask(progress.id)} style={{ color: "yellow" }}>Complete</button>
                                    <button>✏️</button>
                                    <button>❌</button>
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

export default InProgressTasks;
