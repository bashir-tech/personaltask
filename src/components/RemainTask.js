import React, { useState } from 'react';
import { useTask } from '../Contexts/TasksProvider';
function RemainTask() {
    const { tasks, dispatch, isLoading, order, DeleteTask, UpdastTaskState, formatdate, calcDuration } = useTask();
    const remainingTasks = tasks.filter((t) => t.state === "Remaining Tasks");

    const [currenPage, SetCurrentPage] = useState(1);
    const pages = 3

    let OrderedTasks;
    if (order === "name") {
        OrderedTasks = remainingTasks.slice()
            .sort((a, b) => a.name.localeCompare(b.name));
    }
    if (order === "duration") {
        OrderedTasks = remainingTasks.slice()
            .sort((a, b) => Number(a.duration - b.duration));
    }
    else {
        OrderedTasks = remainingTasks.slice();
    }
    const LastPage = currenPage * pages;


    const firtPage = LastPage - pages;
    const currentTask = remainingTasks.slice(firtPage, LastPage);
    const TotalPages = Math.ceil(remainingTasks.length / pages)
    function UpdastTask(id) {

        UpdastTaskState(id)
        console.log(id)
    }

    function Delete(id) {
        DeleteTask(id)
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
            {
                OrderedTasks.length > 0 && (
                    <table>
                        <thead>

                            <tr className='for-th'>

                                <th>Task</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Priority</th>
                                <th>Duration</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTask.map((doneTask, index) => (
                                <tr className='for-tr' key={index}>



                                    <td>{doneTask.name}</td>
                                    <td className='state'>{doneTask.state}</td>
                                    <td>{formatdate(doneTask.due_date)}</td>
                                    <td style={{ color: doneTask.priority === "High" ? "red" : doneTask.priority === "Medium" ? "green" : "yellow" }}>{doneTask.priority}</td>
                                    <td> {calcDuration(doneTask.due_date)}  </td>

                                    <td className='btn'>

                                        <button onClick={() => UpdastTask(doneTask.id)} style={{ color: "#CA4A4A" }}>
                                            Start


                                        </button >
                                        <button>✏️</button>
                                        <button style={{ right: "0" }} onClick={() => Delete(doneTask.id)}>❌</button>
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

export default RemainTask;
