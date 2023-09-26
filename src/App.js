import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './Query.css';
import AddTaskPage from './pages/AddTaskPage';
import DoneTaskPage from './pages/DoneTaskPage';
import HomePage from './pages/HomePage';
import InProgressTaskPage from './pages/InProgressTaskPage';
import RemainingTaskPage from './pages/RemainTaskPage';
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


function App() {
  const [isOpen, setOpen] = useState(true)
  const [order, setOrder] = useState("name");
  const [task, setTask] = useState(function () {
    const stored = localStorage.getItem("added");
    return JSON.parse(stored);
  });


  useEffect(function () {
    localStorage.setItem("added", JSON.stringify(task))

  }, [task])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage task={task} setTask={setTask} isOpen={isOpen} setOpen={setOpen} order={order} setOrder={setOrder} />} />
          <Route path='donetask' element={<DoneTaskPage
            task={task} setTask={setTask}
            isOpen={isOpen} setOpen={setOpen}
            order={order} setOrder={setOrder} />} />
          <Route path='/progresstask' element={<InProgressTaskPage
            task={task} setTask={setTask}
            isOpen={isOpen} setOpen={setOpen}
            order={order} setOrder={setOrder} />} />
          <Route path='/remaintask' element={<RemainingTaskPage
            task={task} setTask={setTask}
            isOpen={isOpen} setOpen={setOpen}
            order={order} setOrder={setOrder} />} />
          <Route path='/addtask' element={<AddTaskPage
            task={task} setTask={setTask}
            isOpen={isOpen} setOpen={setOpen}
            order={order} setOrder={setOrder} />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;




