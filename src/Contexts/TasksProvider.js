import { createContext, memo, useContext, useEffect, useReducer } from "react";

const taskContext = createContext();

const initialState = {
    tasks: [],
    isLoading: false,
    isOpen: true,
    error: ""

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


const TasksProvider = memo(function TasksProvider({ children }) {

    const [{ tasks, isLoading, isOpen, error }, dispatch] = useReducer(reducer, initialState);
    const url = "http://localhost:8000"
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
            const updatedTask = { ...task, state: newTaskState }; // Create an updated task object

            const res = await fetch(`${ url }/tasks/${ id }`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask), // Construct the body with the new state


            });
            const data = await res.json();
            console.log(data);
            dispatch({ type: "update/task", payload: id }); // Pass taskId instead of payload

        } catch (error) {
            dispatch({ type: "rejected", payload: "API request failed" });
        }
    }
    async function CreateTask(newTask) {
        dispatch({ type: "loading" });

        try {
            // Create an updated task object

            const res = await fetch(`${ url }/tasks`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask), // Construct the body with the new state


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
    return (
        <taskContext.Provider
            value={{
                isLoading,
                isOpen,
                dispatch,
                error,
                CreateTask,

                DeleteTask,
                tasks,
                UpdastTaskState
            }}
        >
            {children}
        </taskContext.Provider>
    )
})



function useTask() {
    const context = useContext(taskContext);
    if (context === undefined)
        throw new Error("outside of the task provider")
    return context;
}

export { TasksProvider, useTask };




