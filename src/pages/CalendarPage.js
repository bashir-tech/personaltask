import { useEffect, useState } from "react";
import { useTask } from "../Contexts/TasksProvider";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import prof from '../img/img 1.png';
function CalendarPage() {


    return (
        <main className="maincontainer">
            <NavBar />
            <div className="container">
                <Header title="Today's Plan" showFilter={false} profileImageSrc={prof} />


                <Calendar />
            </div>

        </main>
    )

}

export default CalendarPage

function Calendar() {




    const [countdowns, setCountdowns] = useState({});
    const { tasks, DeleteTask, UpdastTaskState } = useTask();
    const upcomingProgress = tasks.filter((t) => t.state === "In Progress Tasks");
    const upcoming = upcomingProgress.filter((t) => t.duration <= 10);


    useEffect(() => {
        const initialCountdowns = {};
        upcoming.forEach((task) => {
            const dueDate = new Date(task.due_date);
            const now = new Date();
            const timeDifference = dueDate - now;
            const secondsRemaining = Math.floor(timeDifference / 1000);

            initialCountdowns[task.id] = secondsRemaining;
        });
        setCountdowns(initialCountdowns);

        // Update gare e countdopwn daqiqad kasta
        const intervalId = setInterval(() => {
            const updatedCountdowns = {};
            upcoming.forEach((task) => {
                if (countdowns[task.id] > 0) {
                    updatedCountdowns[task.id] = countdowns[task.id] - 1;
                } else {
                    updatedCountdowns[task.id] = 0;
                }
            });
            setCountdowns(updatedCountdowns);

        }, 1000);

        // clean up
        return () => {
            clearInterval(intervalId);
        };
    }, [upcoming, countdowns]);

    function formatCountdown(timeInSeconds) {
        if (timeInSeconds <= 0) {
            return 'Missed';
        }

        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${ hours < 9 ? `0 ${ hours }` : hours } : ${ minutes } : ${ seconds } `;
    }




    function del(id) {
        DeleteTask(id)
    }
    function UpdastTasks(id) {
        UpdastTaskState(id)
    }
    const trStyle = {
        width: "10rem",
        borderRadius: "9px"

    }
    return (
        <>


            <table>

                <tbody>

                    {upcoming.map((task) => (

                        <tr className='for-tr' key={task.id}>
                            <tbody className="hour">
                                <tr style={trStyle}>
                                    <td style={{ color: "yellow" }}>{formatCountdown(countdowns[task.id])}</td>
                                </tr>
                            </tbody>
                            <td>{task.name}</td>
                            <td className='state'>{task.state}</td>
                            <td>{task.due_date}</td>
                            <td style={{ color: task.priority === "High" ? "red" : task.priority === "Medium" ? "green" : "yellow" }}>
                                {task.priority}
                            </td>
                            <td>{task.duration > 1 ? `${ task.duration } Days` : `Today`}</td>
                            <td className='btn'>
                                <button onClick={() => UpdastTasks(task.id)} style={{ color: "red" }}>
                                    Complete
                                </button>
                                <button>✏️</button>
                                <button style={{ right: "0" }} onClick={() => del(task.id)}>
                                    ❌
                                </button>

                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>



        </>
    );
}