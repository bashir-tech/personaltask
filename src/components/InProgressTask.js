import React, { useState } from 'react';
import { useTask, } from '../Contexts/TasksProvider';
function InProgressTasks({ format }) {

    const { tasks, isLoading, order, UpdastTaskState, DeleteTask } = useTask();

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


    const formatdate = (function (dateString) {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            console.error('Invalid date:', dateString);
            return;
        }

        const calcDayPassed = (date1, date2) =>
            Math.round((date1 - date2) / (1000 * 60 * 60 * 24));


        const currentDate = new Date();
        const daysPassed = calcDayPassed(currentDate, date);

        if (daysPassed === 0) {

            const hour = `${ date.getHours() === 0 ? "00" : `${ date.getHours() }` }`;
            const minute = `${ date.getMinutes() }`;
            const second = `${ date.getSeconds() }`;

            return ` Today ${ hour }:${ minute }:${ second } `;
        }

        if (daysPassed === -1) return "Tomorrow";

        else {

            const day = `${ date.getDate() }`;
            const month = `${ date.getMonth() + 1 }`;
            const year = `${ date.getFullYear() }`;
            const hour = `${ date.getHours() }`;
            const minute = `${ date.getMinutes() }`;
            const second = `${ date.getSeconds() }`;

            return `${ year }-${ month }-${ day } ${ hour }:${ minute }:${ second } `;
        }

    })
    const calcDuration = function (dateString) {

        const date = new Date(dateString)
        if (isNaN(date.getTime())) {
            console.log("invalid", dateString)
            return
        }

        const calcDays = (date1, date2) => Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));
        const currentDate = new Date();
        const days = calcDays(currentDate, date)
        console.log(days);
        const hours = Math.round(Math.abs((currentDate - date) / (1000 * 60 * 60)));


        if (days < 1) {
            return `${ hours === 1 ? `${ hours } Hour` : `${ hours } Hours` } `;
        }



        else if (days === 7)
            return "1 Week"
        else if (days >= 7 && days <= 30) {
            const week = Math.floor(days / 7);
            return `${ week } ${ week === 1 ? "Week" : "Weeks" }`
        }
        else if (days >= 30 && days <= 365) {
            const month = Math.floor(days / 30);
            return `${ month } ${ month === 1 ? "Month" : "Months" }`
        }
        else {
            const year = Math.floor(days / 365);
            return `${ year } ${ year === 1 ? "Year" : "Years" }`
        }

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

export default InProgressTasks;
