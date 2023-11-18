import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const taskContext = createContext();

const initialState = {
    tasks: [],
    isLoading: false,
    isOpen: true,
    error: ""

    ,
    order: ""

}


function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true,
            };
        case "open":
            return {
                ...state,
                isOpen: action.payload,
            };
        case "order":
            return {
                ...state,
                order: action.payload
            };

        case "tasksloading":
            return {
                ...state,
                tasks: action.payload,
                isLoading: false
            };
        case "rejected":
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case 'update/task':
            return {
                ...state,
                isLoading: false,
                tasks: state.tasks.map(task =>
                    task.id === action.payload
                        ? {
                            ...task,
                            state: task.state === 'Remaining Tasks'
                                ? 'In Progress Tasks'
                                : task.state === 'In Progress Tasks'
                                    ? 'Done Tasks'
                                    : 'Remaining Tasks',
                        }
                        : task
                ),
            };


        case "setOrder":
            return {
                ...state,
                order: action.payload
            }


        case "create/task":
            return {
                ...state,
                isLoading: false,
                tasks: [...state.tasks, action.payload]
            }

        case "delete/task":
            return {
                ...state,
                isLoading: false,
                tasks: state.tasks.filter((task) => task.id !== action.payload)
            }

        default:
            throw new Error("Unknown Error");
    }
}


const TasksProvider = function TasksProvider({ children }) {

    const [{ tasks, isLoading, isOpen, error, order }, dispatch] = useReducer(reducer, initialState);
    const url = "https://tasks-mybc.onrender.com"

    useEffect(function () {
        async function fetchTasks() {


            dispatch({ type: "loading" })

            try {
                const res = await fetch(`${ url }/tasks`);
                const data = await res.json();
                console.log(data);
                dispatch({ type: "tasksloading", payload: data })

            } catch (error) {
                dispatch({ type: "rejected", payload: "error acccured" })
            }
        }
        fetchTasks();
    }, [])

    async function UpdastTaskState(id) {
        dispatch({ type: "loading" });

        try {
            const task = tasks.find(task => task.id === id);
            const newTaskState =

                task.state === 'Remaining Tasks'
                    ? 'In Progress Tasks'
                    : task.state === 'In Progress Tasks'
                        ? 'Done Tasks'
                        : 'Remaining Tasks';
            const updatedTask = { ...task, state: newTaskState };

            const res = await fetch(`${ url }/tasks/${ id }`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),


            });
            const data = await res.json();
            console.log(data);
            dispatch({ type: "update/task", payload: id });

        } catch (error) {
            dispatch({ type: "rejected", payload: " failed to update" });
        }
    }
    async function CreateTask(newTask) {
        dispatch({ type: "loading" });

        try {


            const res = await fetch(`${ url }/tasks`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),


            });
            const data = await res.json();
            console.log(data);
            dispatch({ type: "create/task", payload: data });

        } catch (error) {
            dispatch({ type: "rejected", payload: "API request failed" });
        }
    }
    async function DeleteTask(id) {
        dispatch({ type: "loading" });

        try {


            const res = await fetch(`${ url }/tasks/${ id }`, {
                method: "DELETE",



            });
            const data = await res.json();
            console.log(data);
            dispatch({
                type: "delete/task", payload: id
            });

        } catch (error) {
            dispatch({ type: "rejected", payload: "API request failed" });
        }
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
        const month = Math.floor(days / 30);
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

            return `${ month } ${ month === 1 ? "Month" : "Months" }`
        }
        else {
            const year = Math.floor(days / 365);
            if (!year || !month || !days) return "Passed"
            return `${ year } ${ year === 1 ? "Year" : "Years" }`
        }

    }
    const value = useMemo(
        () => ({
            isLoading,
            isOpen,
            dispatch,
            error,
            CreateTask,
            order,
            DeleteTask,
            tasks,
            UpdastTaskState,
            formatdate,
            calcDuration
        }),
        [isLoading, isOpen, dispatch, error, order, tasks, UpdastTaskState]
    );
    return (
        <taskContext.Provider
            value={
                value
            }
        >
            {children}
        </taskContext.Provider>
    )
}



function useTask() {
    const context = useContext(taskContext);
    if (context === undefined)
        throw new Error("outside of the task provider")
    return context;
}



export { TasksProvider, useTask };
