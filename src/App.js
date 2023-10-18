import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { TasksProvider } from './Contexts/TasksProvider';
import './Query.css';
import AddTaskPage from './pages/AddTaskPage';
import CalendarPage from './pages/CalendarPage';
import DoneTaskPage from './pages/DoneTaskPage';
import HomePage from './pages/HomePage';
import InProgressTaskPage from './pages/InProgressTaskPage';
import RemainingTaskPage from './pages/RemainTaskPage';

function App() {

  return (
    <div className="App">

      <TasksProvider>


        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='donetask' element={<DoneTaskPage
            />} />
            <Route path='/progresstask' element={<InProgressTaskPage
            />} />
            <Route path='/remaintask' element={<RemainingTaskPage
            />} />
            <Route path='/addtask' element={<AddTaskPage
            />} />
            <Route path='/calendar' element={<CalendarPage


            />} />

          </Routes>

        </BrowserRouter>
      </TasksProvider>

    </div>
  );
}

export default App;




