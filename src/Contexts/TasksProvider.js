import { createContext, useContext, useEffect, useState } from "react";

const taskContext = createContext();
function TasksProvider({ children }) {
    const tasks = [
        {
            "id": 1,
            "name": "Complete Project Proposal",
            "state": "Remaining Tasks",
            "priority": "high",
            "due_date": "2023-09-30",
            "duration": 5
        },

    ];
    const [isOpen, setOpen] = useState(true)
    const [order, setOrder] = useState("name");
    const [task, setTask] = useState(function () {
        const stored = localStorage.getItem("added");
        return JSON.parse(stored) || tasks;
    });


    useEffect(function () {
        localStorage.setItem("added", JSON.stringify(task))

    }, [task])

    return (
        <taskContext.Provider
            value={{
                isOpen,
                setOpen,
                order,
                setOrder,
                task,
                setTask,
            }}
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




