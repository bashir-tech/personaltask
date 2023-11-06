


import { useTask } from "../Contexts/TasksProvider";
import DoneTask from "../components/Donetask";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import SpinnerFullPage from "../components/SpinnerFullPage";

import prof from '../img/drak.png';
function DoneTaskPage() {
    const { isLoading } = useTask();

    return (
        <main className="maincontainer">
            <NavBar />
            <div className="container">
                <Header title="Done Tasks" filterOptions={["name", "duration"]} profileImageSrc={prof} />
                {isLoading ? <SpinnerFullPage /> :
                    <DoneTask />}


            </div>

        </main>
    )
}

export default DoneTaskPage
