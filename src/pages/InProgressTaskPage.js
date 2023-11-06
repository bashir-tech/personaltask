import Header from "../components/Header";
import NavBar from "../components/NavBar";

import InProgressTasks from "../components/InProgressTask";
import prof from '../img/drak.png';
function InProgressTaskPage() {


    return (
        <main className="maincontainer">
            <NavBar />
            <div className="container">
                <Header title="In Progress Tasks"
                    filterOptions={["name", "duration"]}
                    profileImageSrc={prof} color="green"
                />
                <InProgressTasks />


            </div>

        </main>
    )
}

export default InProgressTaskPage
