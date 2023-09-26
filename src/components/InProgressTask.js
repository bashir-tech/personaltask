import React, { useState } from 'react';
function InProgressTasks({ task, setTask, order, setOrder }) {



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
            {inProgress.length > 0 && (
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
                        {currentTask.map((DoneTask, index) => (
                            <tr className='for-tr' key={index}>

                                <td>{DoneTask.name}</td>
                                <td className='state'>{DoneTask.state}</td>
                                <td>{DoneTask.due_date}</td>
                                <td className='priority'>{DoneTask.priority}</td>
                                <td>{DoneTask.duration}</td>
                                <td className='btn'>
                                    <button onClick={() => UpdastTask(DoneTask.id)} style={{ color: "yellow" }}>Complete</button>
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
                                    className={`num ${ currenPage === index + 1 ? "active" : "" }`}
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
