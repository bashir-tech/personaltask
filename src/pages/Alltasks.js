function Alltasks({ task, setTask, order, setOrder }) {
    function UpdastTask(id) {
        setTask((tasks) => tasks.map((task) => task.id === id ? { ...task, state: "Done Tasks" } : task))
    }
    const done = task.filter((t) => t.state === "Done Tasks");
    const inProgress = task.filter((t) => t.state === "In Progress Tasks");
    const Remaining = task.filter((t) => t.state === "Remaining Tasks");
    let OrderedTasks;
    if (order === "name")
        OrderedTasks = inProgress.slice()
            .sort((a, b) => a.name.localeCompare(b.name));
    if (order === "duration")
        OrderedTasks = inProgress.slice()
            .sort((a, b) => a.name.localeCompare(b.name));
    return (
        <>
            {OrderedTasks.length > 0 && (
                <table>
                    <thead>
                        <h1 style={{ color: "yellow" }}>  AllTasks</h1>
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
                        {task.map((DoneTask, index) => (
                            <tr className='for-tr' key={index}>

                                <td>{DoneTask.name}</td>
                                <td className='state'>{DoneTask.state}</td>
                                <td>{DoneTask.due_date}</td>
                                <td className='priority'>{DoneTask.priority}</td>
                                <td>{DoneTask.duration}</td>
                                <td className='btn'>
                                    <button onClick={() => UpdastTask(DoneTask.id)} > {done ? "Done" : Remaining ? "Start" : inProgress ? "Complete" : ""}</button>
                                    <button>✏️</button>
                                    <button>❌</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table >
            )
            }
        </>
    );
}

export default Alltasks;