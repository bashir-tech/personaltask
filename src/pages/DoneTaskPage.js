


import DoneTask from "../components/Donetask";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

import prof from '../img/drak.png';
function DoneTaskPage() {
    return (
        <main className="maincontainer">
            <NavBar />
            <div className="container">
                <Header title="Done Tasks" filterOptions={["name", "duration"]} profileImageSrc={prof} />
                <DoneTask />


            </div>

        </main>
    )
}

export default DoneTaskPage
